"use strict";
// @ts-ignore
const path = require('path');
const { createModeFun, insertModeFun } = require('./index');
module.exports = (base, config) => {
    let { fromLang, fromFileName, baseFromPath, baseToPath, ip, port, mode, } = base;
    config.forEach(item => {
        if (mode == 'create') {
            createModeFun({
                src: `${baseFromPath}${fromFileName}`,
                from: fromLang,
                out: `${baseToPath}${item.toFileName}`,
                to: item.lang,
                exportIp: ip,
                exportPort: port,
            });
        }
        else if (mode == 'insert') {
            insertModeFun({
                src: `${baseFromPath}${fromFileName}`,
                from: fromLang,
                out: `${baseToPath}${item.toFileName}`,
                to: item.lang,
                exportIp: ip,
                exportPort: port,
            });
        }
        else {
            throw new Error("mode must enter 'create' or 'insert'");
        }
    });
};
