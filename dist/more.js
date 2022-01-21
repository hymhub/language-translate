"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.more = void 0;
const translate = require("@vitalets/google-translate-api");
const tunnel = require("tunnel");
let opts = { from: "", to: "" };
const fs = require("fs");
let agent = {};
let optionsCopy = {};
let failedNum = 0;
const translator = (key, value) => {
    return new Promise((resolve, reject) => {
        function go() {
            translate(value, opts, agent)
                // @ts-ignore
                .then((res) => {
                console.log(`${value} -----------> ${res.text}`);
                resolve({ key, newValue: res.text });
            })
                // @ts-ignore
                .catch((err) => {
                console.log('Translation failed, trying again...');
                if (++failedNum > 10) {
                    console.log('You can check whether the agent is normal');
                }
                agent = {
                    agent: tunnel.httpsOverHttp({
                        proxy: {
                            host: optionsCopy.exportIp,
                            port: optionsCopy.exportPort,
                            headers: {
                                "User-Agent": "Node",
                            },
                        },
                    }),
                };
                setTimeout(() => {
                    go();
                }, 1000);
            });
        }
        go();
    });
};
const more = async (options) => {
    var _a;
    opts = { from: options.from, to: options.to };
    optionsCopy = options;
    failedNum = 0;
    agent = {
        agent: tunnel.httpsOverHttp({
            proxy: {
                host: options.exportIp,
                port: options.exportPort,
                headers: {
                    "User-Agent": "Node",
                },
            },
        }),
    };
    // @ts-ignore
    let tot = fs.readFileSync(options.src, 'utf8');
    tot = (_a = tot.split('export')) === null || _a === void 0 ? void 0 : _a[1].split('{');
    tot = tot.splice(1).join('{').trimEnd();
    if (tot[tot.length - 1] == ';') {
        tot = tot.slice(0, -1);
    }
    let toText = {};
    tot = 'toText = {' + tot;
    try {
        eval(`(${tot})`);
    }
    catch (error) {
        throw new Error("翻译异常: 请检查待翻译文件内容是否正常\n" + error);
    }
    // let toText = require(options.out)
    // @ts-ignore
    const translators = [];
    const keys = Object.keys(toText);
    for (let i = 0; i < keys.length; i++) {
        let itemText = toText[keys[i]];
        if (typeof itemText !== 'string') {
            throw new Error("翻译异常: 暂不支持翻译 string 以外的类型!");
        }
        const data = await translator(keys[i], itemText.toString());
        // @ts-ignore
        toText[data.key] = data.newValue;
        opts = { from: options.from, to: options.to };
        agent = {
            agent: tunnel.httpsOverHttp({
                proxy: {
                    host: options.exportIp,
                    port: options.exportPort,
                    headers: {
                        "User-Agent": "Node",
                    },
                },
            }),
        };
    }
    let prefix = '';
    let src = fs.readFileSync(options.src, 'utf8');
    src = src.split('export');
    prefix += `${src[0]}export${src[1].split('{')[0]}`;
    let outFile = fs.readFileSync(options.out, 'utf8');
    outFile = outFile.slice(0, outFile.lastIndexOf('}'));
    let res = JSON.stringify(toText);
    res = res.slice(1, res.length - 1);
    res = '\t' + res.split('","').join('",\n\t"');
    fs.writeFile(options.out, outFile + res + ',' + '\n}', 
    // @ts-ignore
    (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`已将翻译结果成功插入到: ${options.out}`);
    });
    return Promise.resolve();
};
exports.more = more;
