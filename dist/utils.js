import fs from "fs";
import path from "path";
import chalk from "chalk";
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
export const createJsonBuffer = (val) => {
    let outputBuffer = "{\n";
    for (const textKey in val) {
        if (typeof val[textKey] === 'string') {
            outputBuffer += `\t${JSON.stringify({ [textKey]: val[textKey] }).slice(1, -1)},\n`;
        }
        else {
            outputBuffer += createJsonBuffer(val[textKey]);
        }
    }
    outputBuffer = outputBuffer.slice(0, -2);
    outputBuffer += "\n}";
    return outputBuffer;
};
export const consoleSuccess = (...msg) => console.log(chalk.bgGreen(...msg));
export const consoleLog = (...msg) => console.log(chalk.blue(...msg));
export const consoleWarn = (...msg) => console.log(chalk.bgYellow(...msg));
export const consoleError = (...msg) => console.log(chalk.bgRed(...msg));
