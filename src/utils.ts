import type { ExportConfig, TargetConfig, Lang } from './types'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { DataTypes, typeis } from 'typeof-plus'

const cwd = process.cwd()
export const getRootPath = (): string => cwd

export const defineConfig = (config: ExportConfig): ExportConfig => {
  return config
}

export const getFile = (filePath: string): string => {
  return fs.readFileSync(filePath, 'utf8')
}

export const getFiles = (entry: string, deep: boolean): string[] => {
  const result: string[] = []
  const readDir = (entry: string): void => {
    const dirInfo = fs.readdirSync(entry)
    for (let j = 0; j < dirInfo.length; j++) {
      const item = dirInfo[j]
      const location = path.join(entry, item)
      const info = fs.statSync(location)
      if (info.isDirectory()) {
        deep && readDir(location)
      } else {
        result.push(getFile(location))
      }
    }
  }
  readDir(entry)
  return result
}

export const createJsonBuffer = (val: Record<string, any>, tN?: number): string => {
  tN = tN ?? 1
  let outputBuffer = '{\n'
  let t = ''
  for (let index = 0; index < tN; index++) {
    t += '\t'
  }
  for (const textKey in val) {
    if (typeof val[textKey] === 'string') {
      outputBuffer += `${t}${JSON.stringify({ [textKey]: val[textKey] }).slice(
        1,
        -1
      )},\n`
    } else {
      outputBuffer += `${t}"${textKey}":${createJsonBuffer(
        val[textKey],
        tN + 1
      )},\n`
    }
  }
  outputBuffer = outputBuffer.slice(0, -2)
  outputBuffer += `\n${t.slice(1)}}`
  return outputBuffer
}

export const mergeJson = (
  json1: Record<string, any>,
  json2: Record<string, any>
): Record<string, any> => {
  for (const key in json2) {
    const val = json2[key]
    if (typeis(val) === DataTypes.object) {
      json1[key] = mergeJson(json1[key] ?? {}, val)
    } else {
      json1[key] = val
    }
  }
  return json1
}

export const filterJson = (
  json1: Record<string, any>,
  json2: Record<string, any>
): Record<string, any> => {
  const json: Record<string, any> = {}
  for (const key in json1) {
    if (typeis(json1[key]) === DataTypes.object) {
      const res = filterJson(json1[key], typeis(json2[key]) === DataTypes.object ? json2[key] : {})
      if (Object.keys(res).length > 0) {
        json[key] = res
      }
    } else if (json2[key] == null) {
      json[key] = json1[key]
    }
  }
  return json
}

export const isFilePath = (path: string): boolean => {
  return /(\.json|\.js|\.ts)$/.test(path)
}

export const getOutPath = (
  it: TargetConfig,
  duplicateRemovalEntries: string[],
  idx: number,
  entryPath: string
): string => {
  return isFilePath(it.outPath)
    ? typeof it.rewrite === 'function'
      ? path.join(
        getRootPath(),
        path.dirname(it.outPath),
        it.rewrite(path.basename(entryPath))
      )
      : path.join(getRootPath(), it.outPath)
    : typeof it.rewrite === 'function'
      ? path.join(
        getRootPath(),
        it.outPath,
        duplicateRemovalEntries[idx].includes('/')
          ? path.dirname(duplicateRemovalEntries[idx])
          : '',
        it.rewrite(path.basename(entryPath))
      )
      : path.join(getRootPath(), it.outPath, duplicateRemovalEntries[idx])
}

/**
 * @see https://fanyi-api.baidu.com/api/trans/product/apidoc#languageList
 */
const baiduLangConfig = new Map([
  ['auto', 'auto'],
  ['zh-CN', 'zh'],
  ['en', 'en'],
  ['yue', 'yue'],
  ['wyw', 'wyw'],
  ['ja', 'jp'],
  ['ko', 'kor'],
  ['fr', 'fra'],
  ['es', 'spa'],
  ['th', 'th'],
  ['ar', 'ara'],
  ['ru', 'ru'],
  ['pt', 'pt'],
  ['de', 'de'],
  ['it', 'it'],
  ['el', 'el'],
  ['nl', 'nl'],
  ['pl', 'pl'],
  ['bg', 'bul'],
  ['et', 'est'],
  ['da', 'dan'],
  ['fi', 'fin'],
  ['cs', 'cs'],
  ['ro', 'rom'],
  ['sl', 'slo'],
  ['sv', 'swe'],
  ['hu', 'hu'],
  ['zh-TW', 'cht'],
  ['vi', 'vie']
])
export const getBaiduLangCode: (lang: Lang) => Lang = (lang: Lang) => {
  return (baiduLangConfig.get(lang) ?? lang) as Lang
}

export const consoleSuccess = (...msg: string[]): void => { console.log(chalk.green(...msg)) }

export const consoleLog = (...msg: string[]): void => { console.log(chalk.blue(...msg)) }

export const consoleWarn = (...msg: string[]): void => { console.log(chalk.yellow(...msg)) }

export const consoleError = (...msg: string[]): void => { console.log(chalk.red(...msg)) }
