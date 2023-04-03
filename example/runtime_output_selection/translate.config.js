import { Lang } from 'language-translate/types'
import { defineConfig } from 'language-translate/utils'

export default defineConfig({
  // toolsLang: 'en', // The translation tool opens this line of comments in English
  proxy: {
    host: '127.0.0.1',
    port: 7890
  },
  fromLang: Lang.en,
  fromPath: 'translate.entry.json',
  translate: [
    {
      label: '将结果翻译到locales/error文件夹下/Translate the results to the locales/error folder',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/error/de.json'
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/error/zh.json'
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/error/ko.json'
        }
      ]
    },
    {
      label: '将结果翻译到locales/label文件夹下/Translate the results to the locales/label folder',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/label/de.json'
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/label/zh.json'
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/label/ko.json'
        }
      ]
    }
  ]
})
