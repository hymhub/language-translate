import { ls } from './locales.js'
import {
  consoleError,
  consoleLog,
  consoleSuccess,
  createJsonBuffer,
  filterJson,
  isFilePath,
  mergeJson
} from './utils.js'
import type { Proxy, Lang, ApiKeyConfig } from './types'
import { IncrementalMode } from './types.js'
import { getTranslator } from './translators.js'
import fs from 'fs'
import path from 'path'
export const translate = async ({
  input,
  output,
  fromLang,
  targetLang,
  toolsLang = 'zh-CN',
  proxy,
  apiKeyConfig,
  incrementalMode
}: {
  input: string
  output: string
  fromLang: Lang
  targetLang: Lang
  toolsLang?: 'en' | 'zh-CN'
  proxy?: Proxy
  apiKeyConfig?: ApiKeyConfig
  incrementalMode: IncrementalMode
}): Promise<undefined> => {
  if (!isFilePath(input)) {
    return
  }
  const translator = getTranslator({
    fromLang,
    targetLang,
    proxy,
    toolsLang,
    apiKeyConfig
  })

  let inputStartStr = ''
  // ------readSourceJson start-------
  let sourceText
  try {
    sourceText = fs.readFileSync(input, 'utf8')
    if (sourceText.includes('export') && !input.endsWith('.json')) {
      inputStartStr = sourceText.slice(0, sourceText.indexOf('export'))
      sourceText = sourceText.slice(sourceText.indexOf('export'))
    }
    inputStartStr += sourceText.slice(0, sourceText.indexOf('{'))
  } catch (error) {
    consoleError(
      `${ls[toolsLang].checkFromPath}\n path ---> ${input}\n${String(error)}`
    )
    return
  }
  sourceText = sourceText.slice(
    sourceText.indexOf('{'),
    sourceText.lastIndexOf('}') + 1
  )
  // eslint-disable-next-line prefer-const
  let sourceJson: Record<string, any> = {}
  sourceText = 'sourceJson = ' + sourceText
  try {
    // eslint-disable-next-line no-eval
    eval(`(${sourceText})`)
  } catch (error) {
    consoleError(
      `${ls[toolsLang].sourceErr}\npath ---> ${input}\n${String(error)}`
    )
    return
  }
  if (Object.keys(sourceJson).length === 0) {
    consoleError(ls[toolsLang].sourceNull)
    return
  }
  // ------readSourceJson end-------
  const translateRun = async (jsonObj: Record<string, any>): Promise<Record<string, any>> => {
    const resJsonObj: Record<string, any> = {}
    for (const key in jsonObj) {
      const text = jsonObj[key]
      if (typeof text === 'string') {
        let resText = ''
        if (/\{\{.+?\}\}/.test(text)) {
          const texts = text.split(/\{\{.+?\}\}/g)
          const slots: string[] = []
          text.replace(/\{\{.+?\}\}/g, (v) => {
            slots.push(v)
            return ''
          })
          for (let i = 0; i < texts.length; i++) {
            const text = texts[i]
            if (text.length > 0) {
              const resFragment = await translator(text)
              texts[i] = resFragment
            }
          }
          for (let j = 0; j < texts.length; j++) {
            const str = texts[j]
            resText += str
            if (j < texts.length - 1) {
              resText += slots[j]
            }
          }
        } else {
          resText = await translator(text)
        }
        consoleSuccess(`${fromLang}: ${text} ---> ${targetLang}: ${resText}`)
        resJsonObj[key] = resText
      } else {
        resJsonObj[key] = await translateRun(text)
      }
    }
    return resJsonObj
  }
  // ------read out json start-----
  let startStr = ''
  let funValues: string[] = []
  let outFile
  let outTextJson: Record<string, any> = {}
  const readOutFile = (): boolean => {
    try {
      outFile = fs.readFileSync(output, 'utf8')
      try {
        if (outFile.includes('export')) {
          startStr = outFile.slice(0, outFile.indexOf('export'))
          outFile = outFile.slice(outFile.indexOf('export'))
        }
        startStr += outFile.slice(0, outFile.indexOf('{'))
        outFile = outFile.slice(
          outFile.indexOf('{'),
          outFile.lastIndexOf('}') + 1
        )
        outFile = outFile.replace(
          /['"`a-zA-Z0-9_]+:.*(\(.+\).*=>|function[\s\S]+?return)[\s\S]+?,\n/g,
          (v: string) => {
            funValues.push(v)
            return ''
          }
        )
        outFile = 'outTextJson = ' + outFile
        // eslint-disable-next-line no-eval
        eval(`(${outFile})`)
      } catch (error) {
        consoleError(
          `${ls[toolsLang].targetErr}\n path ---> ${output}\n${String(error)}`
        )
        return true
      }
    } catch (error) {
      // readFileSync error
    }
    return false
  }
  if (incrementalMode === IncrementalMode.fast) {
    if (readOutFile()) {
      return
    }
  }
  const transJson = incrementalMode === IncrementalMode.fast
    ? filterJson(sourceJson, outTextJson)
    : sourceJson
  if (incrementalMode === IncrementalMode.fast && Object.keys(transJson).length === 0) {
    // no new key
    return
  }
  // ------read out json end-----
  const resJson = await translateRun(transJson)
  startStr = ''
  funValues = []
  outFile = null
  outTextJson = {}
  if (readOutFile()) {
    return
  }
  let outPutBuffer = ((outFile != null) ? startStr : inputStartStr) + '{\n'
  funValues.forEach((item) => {
    outPutBuffer += `\t${item}`
  })
  if (outFile != null) {
    outPutBuffer += createJsonBuffer(mergeJson(outTextJson, resJson)).slice(2)
    fs.writeFileSync(output, outPutBuffer)
    consoleLog(`${ls[toolsLang].patchSuccess} --> ${output}`)
  } else {
    outPutBuffer += createJsonBuffer(resJson).slice(2)
    const outDirname = path.dirname(output)
    fs.existsSync(outDirname) || fs.mkdirSync(outDirname, { recursive: true })
    fs.writeFileSync(output, outPutBuffer)
    consoleLog(`${ls[toolsLang].createSuccess} --> ${output}`)
  }
}
