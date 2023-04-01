import fs from "fs";
import path from "path";
import chalk from "chalk";
import { DataTypes, typeis } from "typeof-plus";
const cwd = process.cwd();
export const getRootPath = () => cwd;
export const defineConfig = (config) => {
    return config;
};
export const getFile = (filePath) => {
    return fs.readFileSync(filePath, "utf8");
};
export const getFiles = (entry, deep) => {
    const result = [];
    const readDir = (entry) => {
        const dirInfo = fs.readdirSync(entry);
        for (let j = 0; j < dirInfo.length; j++) {
            const item = dirInfo[j];
            const location = path.join(entry, item);
            const info = fs.statSync(location);
            if (info.isDirectory()) {
                deep && readDir(location);
            }
            else {
                result.push(getFile(location));
            }
        }
    };
    readDir(entry);
    return result;
};
export const createJsonBuffer = (val, tN) => {
    tN = tN || 1;
    let outputBuffer = "{\n";
    let t = '';
    for (let index = 0; index < tN; index++) {
        t += '\t';
    }
    for (const textKey in val) {
        if (typeof val[textKey] === 'string') {
            outputBuffer += `${t}${JSON.stringify({ [textKey]: val[textKey] }).slice(1, -1)},\n`;
        }
        else {
            outputBuffer += `${t}"${textKey}":${createJsonBuffer(val[textKey], tN + 1)},\n`;
        }
    }
    outputBuffer = outputBuffer.slice(0, -2);
    outputBuffer += `\n${t.slice(1)}}`;
    return outputBuffer;
};
export const mergeJson = (json1, json2) => {
    for (const key in json2) {
        const val = json2[key];
        if (typeis(val) === DataTypes.object) {
            json1[key] = mergeJson(json1[key] || {}, val);
        }
        else {
            json1[key] = val;
        }
    }
    return json1;
};
export const isFilePath = (path) => {
    return /(\.json|\.js|\.ts)$/.test(path);
};
export const getOutPath = (it, duplicateRemovalEntries, idx, entryPath) => {
    return isFilePath(it.outPath)
        ? typeis(it.rewrite) === DataTypes.function
            ? path.join(getRootPath(), path.dirname(it.outPath), it.rewrite(path.basename(entryPath)))
            : path.join(getRootPath(), it.outPath)
        : typeis(it.rewrite) === DataTypes.function
            ? path.join(getRootPath(), it.outPath, duplicateRemovalEntries[idx].includes('/') ? path.dirname(duplicateRemovalEntries[idx]) : '', it.rewrite(path.basename(entryPath)))
            : path.join(getRootPath(), it.outPath, duplicateRemovalEntries[idx]);
};
export const consoleSuccess = (...msg) => console.log(chalk.green(...msg));
export const consoleLog = (...msg) => console.log(chalk.blue(...msg));
export const consoleWarn = (...msg) => console.log(chalk.yellow(...msg));
export const consoleError = (...msg) => console.log(chalk.red(...msg));
