import { loadNuxt, buildNuxt } from "@nuxt/kit";
// import { renderToString } from 'vue/server-renderer';
import http from 'http';

(async ()=> {
    const nuxt = await loadNuxt({
        config: {
            ssr: true,
        },
    })

    if (nuxt) {
        console.log('nuxt.options.nitro', nuxt.options.nitro)
        await nuxt.ready()
        console.log('buildNuxt',  await buildNuxt(nuxt))
        // @ts-ignore
        const _ = await import('../.output/server/index.mjs')
        // @ts-ignore
        const nitro = await import('../.output/server/chunks/nitro/nitro.mjs')
        // @ts-ignore
        const renderer = await import('../.output/server/chunks/routes/renderer.mjs')
        
        console.log(
            await renderer.r.default({
                path: '/',
                context: { nuxt, nitro: nitro.f() },
                node: {
                    // @ts-ignore
                    res: new http.ServerResponse(new http.IncomingMessage({}))
                }
            })
        );
    }
})()