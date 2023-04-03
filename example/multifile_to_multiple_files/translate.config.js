import { Lang } from 'language-translate/types'
import { defineConfig } from 'language-translate/utils'

export default defineConfig({
  // toolsLang: 'en', // The translation tool opens this line of comments in English
  proxy: {
    host: '127.0.0.1',
    port: 7890
  },
  fromLang: Lang.en,
  fromPath: 'locales/en/**/*.json',
  translate: [
    {
      label: '多文件翻译到多文件/Multifile to multiple files',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/de'
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/zh'
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/ko'
        }
      ]
    }
  ]
})
