"use strict";
// @ts-ignore
const path = require('path');
const { createModeFun, insertModeFun } = require('./index');
module.exports = (base, config) => {
    let { fromLang, fromFileName, baseFromPath, baseToPath, ip, port, mode, } = base;
    config.forEach(item => {
        if (mode == 'create') {
            createModeFun({
                src: path.join(baseFromPath, fromFileName),
                from: fromLang,
                out: path.join(baseToPath, item.toFileName),
                to: item.lang,
                exportIp: ip,
                exportPort: port,
            });
        }
        else if (mode == 'insert') {
            insertModeFun({
                src: path.join(baseFromPath, fromFileName),
                from: fromLang,
                out: path.join(baseToPath, item.toFileName),
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
