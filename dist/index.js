"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertModeFun = exports.createModeFun = void 0;
const { google } = require('./google');
const { more } = require('./more');
const createModeFun = (options) => {
    const { src, from, to, out } = options;
    if (!(src && from && to && out))
        throw new Error(`缺少必要参数:${JSON.stringify(options)}`);
    const startTime = new Date().getTime();
    google(options)
        .then(() => {
        console.log(`翻译完成----->耗时：${Number((new Date().getTime() - startTime) / 1000)}s`);
    })
        .catch((e) => {
        throw e;
    });
};
exports.createModeFun = createModeFun;
const insertModeFun = (options) => {
    const { src, from, to, out } = options;
    if (!(src && from && to && out))
        throw new Error(`缺少必要参数:${JSON.stringify(options)}`);
    const startTime = new Date().getTime();
    more(options)
        .then((res) => {
        res !== 'notkey' && console.log(`翻译完成----->耗时：${Number((new Date().getTime() - startTime) / 1000)}s`);
    })
        .catch((e) => {
        throw e;
    });
};
exports.insertModeFun = insertModeFun;
