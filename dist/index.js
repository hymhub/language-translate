#!/usr/bin/env node
"use strict";
const program = require('commander');
const pkg = require('../package.json');
const { google } = require('./google');
const { more } = require('./more');
// // 配置command
program
    .command(`create`)
    .option('-s, --src <path>', '源TS文件路径')
    .option('-from, --from <string>', '源文件语言')
    .option('-o, --out <path>', '输出TS文件路径')
    .option('-to, --to <string>', '输出文件语言')
    .option('-ei, --exportIp <ip>', 'HTTP代理IP')
    .option('-ep, --exportPort <port>', 'HTTP代理端口')
    .description('通过google翻译')
    // @ts-ignore
    .action((options) => {
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
});
program
    .command(`insert`)
    .option('-s, --src <path>', '源TS文件路径')
    .option('-from, --from <string>', '源文件语言')
    .option('-o, --out <path>', '输出TS文件路径')
    .option('-to, --to <string>', '输出文件语言')
    .option('-ei, --exportIp <ip>', 'HTTP代理IP')
    .option('-ep, --exportPort <port>', 'HTTP代理端口')
    .description('通过google翻译并往指定文件写入')
    // @ts-ignore
    .action((options) => {
    const { src, from, to, out } = options;
    if (!(src && from && to && out))
        throw new Error(`缺少必要参数:${JSON.stringify(options)}`);
    const startTime = new Date().getTime();
    more(options)
        .then(() => {
        console.log(`翻译完成----->耗时：${Number((new Date().getTime() - startTime) / 1000)}s`);
    })
        .catch((e) => {
        throw e;
    });
});
// 配置options
program
    // @ts-ignore
    .action((options) => {
    console.log('hello translate!');
});
// 配置 cli 信息，版本、cli说明等
program.version(pkg.version);
// 接管命令行输入，参数处理
program.parse(process.argv);
