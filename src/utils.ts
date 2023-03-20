import type { ExportConfig } from "./types";
import fs from "fs";
import path from "path";
import chalk from "chalk";

const cwd = process.cwd();
export const getRootPath = () => cwd;

export const defineConfig = (config: ExportConfig): ExportConfig => {
  return config;
};

export const getFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf8");
};

export const getFiles = (entry: string, deep: boolean) => {
  const result: string[] = [];
  const readDir = (entry: string) => {
    const dirInfo = fs.readdirSync(entry);
    for (let j = 0; j < dirInfo.length; j++) {
      const item = dirInfo[j];
      const location = path.join(entry, item);
      const info = fs.statSync(location);
      if (info.isDirectory()) {
        deep && readDir(location);
      } else {
        result.push(getFile(location));
      }
    }
  };
  readDir(entry);
  return result;
};

export const createJsonBuffer = (val: { [key: string]: any }) => {
  let outputBuffer = "{\n";
  for (const textKey in val) {
    if (typeof val[textKey] === 'string') {
      outputBuffer += `\t${JSON.stringify({ [textKey]: val[textKey] }).slice(
        1,
        -1
      )},\n`;
    } else {
      outputBuffer += createJsonBuffer(val[textKey]);
    }
  }
  outputBuffer = outputBuffer.slice(0, -2);
  outputBuffer += "\n}";
  return outputBuffer;
};

export const consoleSuccess = (...msg: string[]) =>
  console.log(chalk.bgGreen(...msg));

export const consoleLog = (...msg: string[]) =>
  console.log(chalk.blue(...msg));

export const consoleWarn = (...msg: string[]) =>
  console.log(chalk.bgYellow(...msg));

export const consoleError = (...msg: string[]) =>
  console.log(chalk.bgRed(...msg));
