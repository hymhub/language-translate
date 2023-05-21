import { ls } from './locales.js';
import { consoleError, consoleLog, consoleSuccess, createJsonBuffer, filterJson, isFilePath, mergeJson, splitJson } from './utils.js';
import { IncrementalMode } from './types.js';
import { getTranslator } from './translators.js';
import fs from 'fs';
import path from 'path';
export const translate = async ({ input, output, fromLang, targetLang, toolsLang = 'zh-CN', proxy, apiKeyConfig, incrementalMode, translateRuntimeDelay = 0, translateRuntimeChunkSize = 5, ignoreValuesAndCopyToTarget = [] }) => {
    if (!isFilePath(input)) {
        return;
    }
    const translator = getTranslator({
        fromLang,
        targetLang,
        proxy,
        toolsLang,
        apiKeyConfig
    });
    let inputStartStr = '';
    // ------readSourceJson start-------
    let sourceText;
    try {
        sourceText = fs.readFileSync(input, 'utf8');
        if (sourceText.includes('export') && !input.endsWith('.json')) {
            inputStartStr = sourceText.slice(0, sourceText.indexOf('export'));
            sourceText = sourceText.slice(sourceText.indexOf('export'));
        }
        inputStartStr += sourceText.slice(0, sourceText.indexOf('{'));
    }
    catch (error) {
        consoleError(`${ls[toolsLang].checkFromPath}\n path ---> ${input}\n${String(error)}`);
        return;
    }
    sourceText = sourceText.slice(sourceText.indexOf('{'), sourceText.lastIndexOf('}') + 1);
    // eslint-disable-next-line prefer-const
    let sourceJson = {};
    sourceText = 'sourceJson = ' + sourceText;
    try {
        // eslint-disable-next-line no-eval
        eval(`(${sourceText})`);
    }
    catch (error) {
        consoleError(`${ls[toolsLang].sourceErr}\npath ---> ${input}\n${String(error)}`);
        return;
    }
    if (Object.keys(sourceJson).length === 0) {
        consoleError(ls[toolsLang].sourceNull);
        return;
    }
    // ------readSourceJson end-------
    const translateRun = async (jsonObj) => {
        const resJsonObj = {};
        for (const key in jsonObj) {
            const text = jsonObj[key];
            if (typeof text === 'string') {
                let resText = '';
                const ignore = ignoreValuesAndCopyToTarget.includes(text);
                if (ignore) {
                    resText = text;
                }
                else if (/\{\{.+?\}\}/.test(text)) {
                    const texts = text.split(/\{\{.+?\}\}/g);
                    const slots = [];
                    text.replace(/\{\{.+?\}\}/g, (v) => {
                        slots.push(v);
                        return '';
                    });
                    for (let i = 0; i < texts.length; i++) {
                        const text = texts[i];
                        if (text.length > 0) {
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
                if (translateRuntimeDelay > 0 && !ignore) {
                    consoleLog(`delay ${translateRuntimeDelay}ms`);
                    await new Promise((resolve) => setTimeout(resolve, translateRuntimeDelay));
                }
                consoleSuccess(`${fromLang}: ${text} --${ignore ? '(with ignore copy)-' : ''}-> ${targetLang}: ${resText}`);
                resJsonObj[key] = resText;
            }
            else {
                resJsonObj[key] = await translateRun(text);
            }
        }
        return resJsonObj;
    };
    // ------read out json start-----
    let startStr = '';
    let funValues = [];
    let outFile;
    let outTextJson = {};
    const readOutFile = () => {
        try {
            outFile = fs.readFileSync(output, 'utf8');
            try {
                if (outFile.includes('export') && !output.endsWith('.json')) {
                    startStr = outFile.slice(0, outFile.indexOf('export'));
                    outFile = outFile.slice(outFile.indexOf('export'));
                }
                startStr += outFile.slice(0, outFile.indexOf('{'));
                outFile = outFile.slice(outFile.indexOf('{'), outFile.lastIndexOf('}') + 1);
                outFile = outFile.replace(/['"`a-zA-Z0-9_]+:.*(\(.+\).*=>|function[\s\S]+?return)[\s\S]+?,\n/g, (v) => {
                    funValues.push(v);
                    return '';
                });
                outFile = 'outTextJson = ' + outFile;
                // eslint-disable-next-line no-eval
                eval(`(${outFile})`);
            }
            catch (error) {
                consoleError(`${ls[toolsLang].targetErr}\n path ---> ${output}\n${String(error)}`);
                return true;
            }
        }
        catch (error) {
            // readFileSync error
        }
        return false;
    };
    if (incrementalMode === IncrementalMode.fast) {
        if (readOutFile()) {
            return;
        }
    }
    const transJson = incrementalMode === IncrementalMode.fast
        ? filterJson(sourceJson, outTextJson)
        : sourceJson;
    if (incrementalMode === IncrementalMode.fast && Object.keys(transJson).length === 0) {
        // no new key
        return;
    }
    // ------read out json end-----
    let outTipMsg = '';
    const outJsonToFile = (resJson) => {
        startStr = '';
        funValues = [];
        outFile = null;
        outTextJson = {};
        if (readOutFile()) {
            return;
        }
        let outPutBuffer = ((outFile != null) ? startStr : inputStartStr) + '{\n';
        funValues.forEach((item) => {
            outPutBuffer += `\t${item}`;
        });
        if (outFile != null) {
            outPutBuffer += createJsonBuffer(mergeJson(outTextJson, resJson)).slice(2);
            fs.writeFileSync(output, outPutBuffer);
            if (outTipMsg.length === 0) {
                outTipMsg = `${ls[toolsLang].patchSuccess} --> ${output}`;
            }
        }
        else {
            outPutBuffer += createJsonBuffer(resJson).slice(2);
            const outDirname = path.dirname(output);
            fs.existsSync(outDirname) || fs.mkdirSync(outDirname, { recursive: true });
            fs.writeFileSync(output, outPutBuffer);
            if (outTipMsg.length === 0) {
                outTipMsg = `${ls[toolsLang].createSuccess} --> ${output}`;
            }
        }
    };
    const fragments = splitJson(transJson);
    let chunkJson = null;
    const chunks = [];
    fragments.forEach((it, idx) => {
        if (idx % translateRuntimeChunkSize === 0) {
            chunkJson !== null && chunks.push(chunkJson);
            chunkJson = it;
        }
        else if (chunkJson !== null) {
            chunkJson = mergeJson(chunkJson, it);
        }
    });
    if (chunkJson !== null && Object.keys(chunkJson).length > 0) {
        chunks.push(chunkJson);
        chunkJson = null;
    }
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const resJson = await translateRun(chunk);
        outJsonToFile(resJson);
    }
    consoleLog(outTipMsg);
};
