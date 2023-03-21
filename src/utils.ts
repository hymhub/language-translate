import type { ExportConfig } from "./types";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { DataTypes, typeis } from "typeof-plus";

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

export const createJsonBuffer = (val: { [key: string]: any }, tN?: number) => {
  tN = tN || 1;
  let outputBuffer = "{\n";
  let t = '';
  for (let index = 0; index < tN; index++) {
    t += '\t';
  }
  for (const textKey in val) {
    if (typeof val[textKey] === 'string') {
      outputBuffer += `${t}${JSON.stringify({ [textKey]: val[textKey] }).slice(
        1,
        -1
      )},\n`;
    } else {
      outputBuffer += `${t}"${textKey}":${createJsonBuffer(val[textKey], tN + 1)},\n`;
    }
  }
  outputBuffer = outputBuffer.slice(0, -2);
  outputBuffer += `\n${t.slice(1)}}`;
  return outputBuffer;
};

export const mergeJson = (
  json1: { [key: string]: any }, json2: { [key: string]: any }
) => {
  for (const key in json2) {
    const val = json2[key];
    if (typeis(val) === DataTypes.object) {
      json1[key] = mergeJson(json1[key] || {}, val);
    } else {
      json1[key] = val;
    }
  }
  return json1;
}

export const consoleSuccess = (...msg: string[]) =>
  console.log(chalk.green(...msg));

export const consoleLog = (...msg: string[]) =>
  console.log(chalk.blue(...msg));

export const consoleWarn = (...msg: string[]) =>
  console.log(chalk.yellow(...msg));

export const consoleError = (...msg: string[]) =>
  console.log(chalk.red(...msg));
