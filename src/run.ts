// @ts-ignore
const path = require('path')
const { createModeFun, insertModeFun } = require('./index')

interface Base {
    fromLang: String
    fromFileName: String
    baseFromPath: String
    baseToPath: String
    ip: String
    port: String
    mode: 'create' | 'insert'
}
type Config = Array<{lang: String, toFileName: String}>
module.exports = (
    base: Base,
    config: Config
) => {
    let {
        fromLang,
        fromFileName,
        baseFromPath,
        baseToPath,
        ip,
        port,
        mode,
    }: Base = base
    config.forEach(item => {
        if (mode == 'create') {
            createModeFun({
                src: `${baseFromPath}${fromFileName}`,
                from: fromLang,
                out: `${baseToPath}${item.toFileName}`,
                to: item.lang,
                exportIp: ip,
                exportPort: port,
            })
        } else if (mode == 'insert') {
            insertModeFun({
                src: `${baseFromPath}${fromFileName}`,
                from: fromLang,
                out: `${baseToPath}${item.toFileName}`,
                to: item.lang,
                exportIp: ip,
                exportPort: port,
            })
        } else {
            throw new Error("mode must enter 'create' or 'insert'");
        }
    })
}