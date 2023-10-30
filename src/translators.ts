import tunnel from 'tunnel'
import google from '@vitalets/google-translate-api'
import Baidu from './baidufanyi.js'
import * as deepl from 'deepl-node'
import type { Lang, Proxy, ApiKeyConfig } from './types'
import { TranslateService } from './types.js'
import { consoleError, consoleWarn, getBaiduLangCode } from './utils.js'
import { ls } from './locales.js'
import { name as appName, version as appVersion } from '../package.json'

export const getTranslator = ({
  fromLang,
  targetLang,
  proxy,
  toolsLang,
  apiKeyConfig
}: {
  fromLang: Lang
  targetLang: Lang
  proxy?: Proxy
  toolsLang: 'en' | 'zh-CN'
  apiKeyConfig?: ApiKeyConfig
}): (key: string) => Promise<string> => {
  const googleTranslator = async (key: string): Promise<string> =>
    await new Promise((resolve, reject) => {
      let failedNum = 0
      const run: () => void = () => {
        google(
          key,
          { from: fromLang, to: targetLang },
          (proxy != null)
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
            : undefined
        )
          .then(({ text }) => {
            resolve(text)
          })
          .catch((err) => {
            if (++failedNum > 10) {
              consoleError(ls[toolsLang].checkNetwork)
              reject(err)
            } else {
              consoleWarn(ls[toolsLang].retry)
              setTimeout(() => {
                run()
              }, 1000)
            }
          })
      }
      run()
    })

  const baiduTranslator = async (
    key: string
  ): Promise<string> => await new Promise((resolve, reject) => {
    if (
      apiKeyConfig === undefined ||
      apiKeyConfig[TranslateService.baidu] === undefined ||
      apiKeyConfig[TranslateService.baidu] === undefined
    ) {
      consoleError(ls[toolsLang].notHasBaiduKey)
      return
    }
    const baidu = new Baidu(
      apiKeyConfig[TranslateService.baidu].appId,
      apiKeyConfig[TranslateService.baidu].appKey
    )
    let failedNum = 0
    const run: () => void = () => {
      baidu.translate(key, {
        from: getBaiduLangCode(fromLang),
        to: getBaiduLangCode(targetLang)
      })
        .then((text) => {
          resolve(text)
        })
        .catch((err) => {
          if (++failedNum > 10) {
            consoleError(ls[toolsLang].checkNetwork)
            consoleError(err)
            reject(err)
          } else {
            consoleWarn(ls[toolsLang].retry)
            consoleError(err)
            setTimeout(() => {
              run()
            }, 1000)
          }
        })
    }
    run()
  })

  const deepLTranslator = async (
    key: string
  ): Promise<string> => await new Promise((resolve, reject) => {
    let authKey = apiKeyConfig?.[TranslateService.deepl]?.authKey ?? ''
    if (
      apiKeyConfig === undefined ||
      apiKeyConfig[TranslateService.deepl] === undefined ||
      apiKeyConfig[TranslateService.deepl] === undefined
    ) {
      authKey = ''
      // consoleError(ls[toolsLang].notHasBaiduKey)
      // return
    }
    const appInfo = { appName, appVersion }
    const translator = new deepl.Translator(authKey, {
      ...((proxy != null)
        ? {
            proxy: {
              host: proxy.host,
              port: proxy.port
            }
          }
        : null),
      appInfo
    })
    let failedNum = 0
    const run: () => void = () => {
      translator.translateText(key, fromLang, targetLang, { preserveFormatting: true })
        .then(({ text }) => {
          resolve(text)
        })
        .catch((err) => {
          if (++failedNum > 10) {
            consoleError(ls[toolsLang].checkNetwork)
            consoleError(err)
            reject(err)
          } else {
            consoleWarn(ls[toolsLang].retry)
            consoleError(err)
            setTimeout(() => {
              run()
            }, 1000)
          }
        })
    }
    run()
  })

  return async (key: string): Promise<string> => {
    if (apiKeyConfig != null) {
      switch (apiKeyConfig.type) {
        case TranslateService.google:
          return await googleTranslator(key)
        case TranslateService.baidu:
          return await baiduTranslator(key)
        case TranslateService.deepl:
          return await deepLTranslator(key)
        default:
          break
      }
    }

    return await googleTranslator(key)
  }
}
