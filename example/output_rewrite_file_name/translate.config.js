import { Lang } from 'language-translate/types'
import { defineConfig } from 'language-translate/utils'

export default defineConfig({
  // toolsLang: 'en', // The translation tool opens this line of comments in English
  proxy: {
    host: '127.0.0.1',
    port: 7890
  },
  fromLang: Lang.en,
  fromPath: 'locales/**/*.en.json',
  translate: [
    {
      label: '输出重写文件名/Output rewrite file name',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales',
          rewrite: fileName => fileName.replace('.en.json', '.de.json')
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales',
          rewrite: fileName => fileName.replace('.en.json', '.zh.json')
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales',
          rewrite: fileName => fileName.replace('.en.json', '.ko.json')
        }
      ]
    }
  ]
})
