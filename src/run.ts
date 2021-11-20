var shell = require('shelljs')
var path = require('path')

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
declare function translate(base: Base, config: Config): void
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
        if (shell.exec(`node ${path.join(__dirname, 'index.js')} ${mode} -s ${baseFromPath}${fromFileName} -from ${fromLang} -o ${baseToPath}${item.toFileName} -to ${item.lang} -ei ${ip} -ep ${port}`).code !== 0) {
            shell.echo('Error');
            shell.exit(1);
        }
    })
}