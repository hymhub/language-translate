// @ts-ignore
const translate = require('../run')
// @ts-ignore
const path = require('path')

const base: {
    fromLang: String
    fromFileName: String
    baseFromPath: String
    baseToPath: String
    ip: String
    port: String
    mode: 'create' | 'insert'
} = {
    fromLang: 'en',
    fromFileName: 'translateFrom.ts',
    // @ts-ignore
    baseFromPath: __dirname,
    // @ts-ignore
    baseToPath: path.join(__dirname, 'dist'),
    ip: '127.0.0.1',
    port: '7890',
    mode: 'insert',
}

const config: Array<{ lang: String, toFileName: String }> = [
    {
        lang: 'es',
        toFileName: 'es.ts',
    },
    {
        lang: 'ja',
        toFileName: 'ja.ts',
    },
]

translate(base, config)