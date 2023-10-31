import { Lang, TranslateService } from 'language-translate/types'
import { defineConfig } from 'language-translate/utils'

export default defineConfig({
  // toolsLang: 'en', // The translation tool opens this line of comments in English
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 7890
  // },
  fromLang: Lang.en,
  fromPath: 'locales/en/**/*.json',
  apiKeyConfig: {
    type: TranslateService.deepl,
    [TranslateService.deepl]: {
      authKey: 'f63c02c5-f056-...' // Replace with your key
    }
  },
  translate: [
    {
      label: '测试 DeepL 翻译/Test DeepL Translation',
      targetConfig: [
        {
          targetLang: 'de',
          outPath: 'locales/de'
        },
        {
          targetLang: 'zh',
          outPath: 'locales/zh'
        },
        {
          targetLang: 'ko',
          outPath: 'locales/ko'
        }
      ]
    }
  ]
})
