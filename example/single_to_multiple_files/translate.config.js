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
      label: '单文件翻译到多文件/Single to multiple files',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/de.json'
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/zh.json'
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/ko.json'
        }
      ]
    }
  ]
})
