/* eslint-disable @typescript-eslint/ban-ts-comment */
import { loadNuxt } from "@nuxt/kit";
import { writeFile } from "fs/promises";
import http from 'http';

(async ()=> {
    const nuxt = await loadNuxt({
        config: {
            ssr: true,
        },
    })

    if (nuxt) {
        await nuxt.ready()
        // @ts-ignore
        const _ = await import('../.output/server/index.mjs')
        // @ts-ignore
        const nitro = await import('../.output/server/chunks/nitro/nitro.mjs')
        // @ts-ignore
        const renderer = await import('../.output/server/chunks/routes/renderer.mjs')
        console.time('/list/subject:IT/')
        const result = await renderer.r.default({
            path: '/list/subject:IT/',
            context: {
                nuxt,
                nitro: nitro.f(),
                // payload: {}
            },
            node: {
                // @ts-ignore
                res: new http.ServerResponse(new http.IncomingMessage({}))
            }
        })
        console.timeEnd('/list/subject:IT/')
        await writeFile('./index.html', result)
        console.log(
            'result.length', result.length
        );
    }
})()