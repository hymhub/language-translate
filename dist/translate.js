import googleTranslate from "@vitalets/google-translate-api";
import tunnel from "tunnel";
import { ls } from "./locales.js";
import { consoleError, consoleSuccess, consoleWarn, createJsonBuffer } from './utils.js';
import { loadConfig } from "unconfig";
export const translate = async ({ input = 'translate.entry.json', output, fromLang, targetLang, toolsLang = 'en', proxy, }) => {
    const translator = (key) => new Promise((resolve, reject) => {
        let failedNum = 0;
        const run = () => {
            googleTranslate(key, { from: fromLang, to: targetLang }, {
                agent: tunnel.httpsOverHttp({
                    proxy: proxy ? {
                        host: proxy.host,
                        port: proxy.port,
                        headers: {
                            "User-Agent": "Node",
                        },
                    } : undefined,
                }),
            })
                .then(({ text }) => {
                resolve(text);
            })
                .catch((err) => {
                if (++failedNum > 10) {
                    consoleError(ls[toolsLang].checkNetwork);
                    reject(err);
                }
                else {
                    consoleWarn(ls[toolsLang].retry);
                    setTimeout(() => {
                        run();
                    }, 1000);
                }
            });
        };
        run();
    });
    const { config: sourceJson } = await loadConfig({
        sources: [
            {
                files: input.slice(0, input.lastIndexOf('.')),
                extensions: [input.slice(input.lastIndexOf('.') + 1)],
            },
        ],
    });
    const translateRun = async (jsonObj) => {
        const resJsonObj = {};
        for (const key in jsonObj) {
            const text = jsonObj[key];
            if (typeof text === 'string') {
                let resText = "";
                if (/\{\{.+?\}\}/.test(text)) {
                    const texts = text.split(/\{\{.+?\}\}/g);
                    const slots = [];
                    text.replace(/\{\{.+?\}\}/g, (v) => {
                        slots.push(v);
                        return "";
                    });
                    for (let i = 0; i < texts.length; i++) {
                        const text = texts[i];
                        if (text) {
                            const resFragment = await translator(text);
                            texts[i] = resFragment;
                        }
                    }
                    for (let j = 0; j < texts.length; j++) {
                        const str = texts[j];
                        resText += str;
                        if (j < texts.length - 1) {
                            resText += slots[j];
                        }
                    }
                }
                else {
                    resText = await translator(text);
                }
                consoleSuccess(`${fromLang}: ${text} ---> ${targetLang}: ${resText}`);
                resJsonObj[key] = resText;
            }
            else {
                resJsonObj[key] = await translateRun(text);
            }
        }
        return resJsonObj;
    };
    const resJson = await translateRun(sourceJson);
    console.log('====================================');
    console.log(resJson);
    console.log(createJsonBuffer(resJson));
    console.log('====================================');
};
