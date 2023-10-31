import tunnel from 'tunnel';
import google from '@vitalets/google-translate-api';
import Baidu from './baidufanyi.js';
import * as deepl from 'deepl-node';
import { TranslateService } from './types.js';
import { consoleError, consoleWarn, getBaiduLangCode } from './utils.js';
import { ls } from './locales.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const _dirname = path.dirname(fileURLToPath(import.meta.url));
const { name: appName, version: appVersion } = JSON.parse(fs.readFileSync(path.join(_dirname, '../package.json')).toString());
export const getTranslator = ({ fromLang, targetLang, proxy, toolsLang, apiKeyConfig }) => {
    const googleTranslator = async (key) => await new Promise((resolve, reject) => {
        let failedNum = 0;
        const run = () => {
            google(key, { from: fromLang, to: targetLang }, (proxy != null)
                ? {
                    agent: tunnel.httpsOverHttp({
                        proxy: {
                            host: proxy.host,
                            port: proxy.port,
                            headers: {
                                'User-Agent': 'Node'
                            }
                        }
                    })
                }
                : undefined)
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
    const baiduTranslator = async (key) => await new Promise((resolve, reject) => {
        var _a, _b;
        if (apiKeyConfig === undefined ||
            ((_a = apiKeyConfig[TranslateService.baidu]) === null || _a === void 0 ? void 0 : _a.appId) === undefined ||
            ((_b = apiKeyConfig[TranslateService.baidu]) === null || _b === void 0 ? void 0 : _b.appKey) === undefined) {
            consoleError(ls[toolsLang].notHasBaiduKey);
            return;
        }
        const baidu = new Baidu(apiKeyConfig[TranslateService.baidu].appId, apiKeyConfig[TranslateService.baidu].appKey);
        let failedNum = 0;
        const run = () => {
            baidu.translate(key, {
                from: getBaiduLangCode(fromLang),
                to: getBaiduLangCode(targetLang)
            })
                .then((text) => {
                resolve(text);
            })
                .catch((err) => {
                if (++failedNum > 10) {
                    consoleError(ls[toolsLang].checkNetwork);
                    consoleError(err);
                    reject(err);
                }
                else {
                    consoleWarn(ls[toolsLang].retry);
                    consoleError(err);
                    setTimeout(() => {
                        run();
                    }, 1000);
                }
            });
        };
        run();
    });
    const deepLTranslator = async (key) => await new Promise((resolve, reject) => {
        var _a, _b;
        if (apiKeyConfig === undefined ||
            ((_a = apiKeyConfig[TranslateService.deepl]) === null || _a === void 0 ? void 0 : _a.authKey) === undefined) {
            consoleError(ls[toolsLang].notHasBaiduKey);
            return;
        }
        const appInfo = { appName, appVersion };
        const translator = new deepl.Translator((_b = apiKeyConfig[TranslateService.deepl]) === null || _b === void 0 ? void 0 : _b.authKey, Object.assign(Object.assign({}, ((proxy != null)
            ? {
                proxy: {
                    host: proxy.host,
                    port: proxy.port
                }
            }
            : null)), { appInfo }));
        let failedNum = 0;
        const run = () => {
            translator.translateText(key, fromLang, targetLang, { preserveFormatting: true })
                .then(({ text }) => {
                resolve(text);
            })
                .catch((err) => {
                if (++failedNum > 10) {
                    consoleError(ls[toolsLang].checkNetwork);
                    consoleError(err);
                    reject(err);
                }
                else {
                    consoleWarn(ls[toolsLang].retry);
                    consoleError(err);
                    setTimeout(() => {
                        run();
                    }, 1000);
                }
            });
        };
        run();
    });
    return async (key) => {
        if (apiKeyConfig != null) {
            switch (apiKeyConfig.type) {
                case TranslateService.google:
                    return await googleTranslator(key);
                case TranslateService.baidu:
                    return await baiduTranslator(key);
                case TranslateService.deepl:
                    return await deepLTranslator(key);
                default:
                    break;
            }
        }
        return await googleTranslator(key);
    };
};
