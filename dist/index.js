import { loadConfig } from "unconfig";
import { Command } from 'commander';
import { translate } from "./translate.js";
import { consoleError, getRootPath } from './utils.js';
import { ls } from "./locales.js";
import inquirer from 'inquirer';
import path from 'path';
const program = new Command();
program.description('Translate a single js/ts/json file')
    .option('-i, --input <string>', 'source file path')
    .option('-o, --output <string>', 'target file path')
    .option('-f, --fromlang <Lang>', 'source file language')
    .option('-t, --targetlang <Lang>', 'target file language')
    .option('-h, --host <string>', 'proxy host')
    .option('-p, --port <string>', 'proxy port')
    .action(async (options) => {
    if (Object.keys(options).length > 0) {
        if (options.input
            && options.output
            && options.fromlang
            && options.targetlang) {
            // a file run
            translate({
                input: options.input,
                output: options.output,
                fromLang: options.fromlang,
                targetLang: options.targetlang,
                toolsLang: 'en',
                proxy: options.host && options.port
                    ? {
                        host: options.host,
                        port: Number(options.port),
                    }
                    : undefined,
            });
        }
        else {
            consoleError('Missing required parameters, you can execute `translate --help` to get help');
        }
    }
    else {
        const { config } = await loadConfig({
            sources: [
                {
                    files: "translate.config",
                    extensions: ["ts", "js", "json", ""],
                },
            ],
        });
        config.toolsLang = config.toolsLang || 'zh-CN';
        config.fromPath = config.fromPath
            ? path.join(getRootPath(), config.fromPath)
            : path.join(getRootPath(), 'translate.entry.json');
        const checkCustomKey = [{
                type: "list",
                message: ls[config.toolsLang].customOutConfig,
                name: "targetConfig",
                choices: config.translate.map(it => ({
                    name: it.label,
                    value: it.targetConfig,
                })),
            }];
        if (config.translate.length > 1) {
            inquirer
                .prompt(checkCustomKey)
                .then(({ targetConfig }) => {
                targetConfig.forEach(it => {
                    translate({
                        input: config.fromPath,
                        output: it.outPath,
                        fromLang: config.fromLang,
                        targetLang: it.targetLang,
                        toolsLang: config.toolsLang,
                        proxy: config.proxy,
                    });
                });
            });
        }
        else if (config.translate.length === 1) {
            config.translate[0].targetConfig.forEach(it => {
                translate({
                    input: config.fromPath,
                    output: it.outPath,
                    fromLang: config.fromLang,
                    targetLang: it.targetLang,
                    toolsLang: config.toolsLang,
                    proxy: config.proxy,
                });
            });
        }
        else {
            consoleError(ls[config.toolsLang].checkConfig);
        }
    }
});
program.parse();
