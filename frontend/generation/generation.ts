/* eslint-disable @typescript-eslint/ban-ts-comment */
import { loadNuxt } from "@nuxt/kit";
import { Kafka } from "kafkajs";
import { pack } from 'tar-stream';
import fs from "fs";
import http from 'http';
import net from 'net';
import path from "path";

function finalize(tar: ReturnType<typeof pack>) {
    return new Promise((resolve, reject) => {
        try {
            tar.once('end', () => {
                resolve(true);
            });
            tar.finalize();
            setTimeout(() => {
                resolve(true);
            }, 30000);
        } catch (e) {
            reject(e);
        }
    });
}

async function flushPullPages(outputFileNameBase: string, pull: {name: string; data: string;}[]) {
    const outputPath = outputFileNameBase + '.tar';

    const output = fs.createWriteStream(outputPath);
    const tar = pack({});
    tar.pipe(output);
    pull.forEach((item) => {
        tar.entry(
            {
                name: item.name
            },
            item.data
        );
    });
    await finalize(tar);
}

(async () => {
    if (!('KAFKA_URL' in process.env)) {
        throw new Error('KAFKA_URL is not found')
    }
    if (!('KAFKA_TOPIC_NAME' in process.env)) {
        throw new Error('KAFKA_TOPIC_NAME is not found')
    }
    if (!('KAFKA_CLIENT_ID' in process.env)) {
        throw new Error('KAFKA_CLIENT_ID is not found')
    }
    if (!('OUTPUT_DIR' in process.env)) {
        throw new Error('OUTPUT_DIR is not found')
    }
    console.log('Load nuxt');
    const nuxt = await loadNuxt({
        config: {
            ssr: true,
        },
    })

    if (!nuxt) {
        throw new Error('Nuxt not loaded')
    }
    await nuxt.ready()

    console.log('Load nitro');
    // starting server
    const _ = await import('../.output/server/index.mjs')
    const nitro = await import('../.output/server/chunks/nitro/nitro.mjs')
    const renderer = await import('../.output/server/chunks/routes/renderer.mjs')

    console.log('Load kafka');
    const kafka = new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_URL ?? '']
    });
    const consumer = kafka.consumer({
        groupId: `${process.env.KAFKA_CLIENT_ID ?? ''}-consumers-group`
    });

    console.log('Connect and subscribe kafka');
    await consumer.connect();
    await consumer.subscribe({ topic: process.env.KAFKA_TOPIC_NAME ?? '' });

    let lastUpdateTime = new Date();
    let results: {name: string; data: string;}[] = []
    const outputFileNameBase = path.join(
        process.env.OUTPUT_DIR ? process.env.OUTPUT_DIR : nuxt.options.srcDir + '/.output/public/',
        process.env.HOSTNAME ?? 'localhost'
    );
    console.log(`outputFileNameBase: ${outputFileNameBase}`)
    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, heartbeat }) => {
            const url: string = message.key?.toString() ?? ''
            console.log('url: ', url)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const payloads: any[] = JSON.parse(message.value?.toString()??'[]')
            if (url === '') {
                return
            }
            console.log('New path',path.join(nuxt.options.buildDir, url, 'index.html'));
            let totalItems = 0;
            if (message.headers !== undefined && 'total-items' in message.headers) {
                totalItems = Number(message?.headers['total-items'])
            }
            
            for(const [index, payload] of Object.entries(payloads)) {
                console.time(url)
                try {
                    const result = await renderer.r.default({
                        path: url + '/' + (Number(index) + 1),
                        context: {
                            nuxt,
                            nitro: nitro.f(),
                            payload: { books: payload, totalItems }
                        },
                        node: {
                            res: new http.ServerResponse(new http.IncomingMessage(new net.Socket()))
                        }
                    })
                    results.push({
                        name: path.join(url + '/' + (Number(index) + 1), 'index.html'),
                        data: result,
                    })
                } catch (e) {
                    console.error(e)
                }
                console.timeEnd(url)
            }
            
            lastUpdateTime = new Date()
            await flushPullPages(outputFileNameBase + url.replaceAll('/','-') + "-" + Number(new Date()), results)
            results=[];
            console.log('heartbeat')
            await heartbeat()
        }
    })

    async function checkEndOfWork() {
        if (Number(new Date()) - Number(lastUpdateTime) > 120000) {
            console.log('checkEndOfWork');
            await consumer.disconnect();
            process.exit(0);
        }
        setTimeout(() => checkEndOfWork(), 30000);
    }
    checkEndOfWork();

})()