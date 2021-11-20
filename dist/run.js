"use strict";
var shell = require('shelljs');
var path = require('path');
module.exports = (base, config) => {
    let { fromLang, fromFileName, baseFromPath, baseToPath, ip, port, mode, } = base;
    config.forEach(item => {
        if (shell.exec(`node ${path.join(__dirname, 'index.js')} ${mode} -s ${baseFromPath}${fromFileName} -from ${fromLang} -o ${baseToPath}${item.toFileName} -to ${item.lang} -ei ${ip} -ep ${port}`).code !== 0) {
            shell.echo('Error');
            shell.exit(1);
        }
    });
};
