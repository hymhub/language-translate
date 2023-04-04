import { IncrementalMode, Lang } from 'language-translate/types'
import { defineConfig } from 'language-translate/utils'

export default defineConfig({
  // toolsLang: 'en', // The translation tool opens this line of comments in English
  proxy: {
    host: '127.0.0.1',
    port: 7890
  },
  fromLang: Lang.en,
  fromPath: 'locales/en/**/*.json',
  // 快速模式: 目标文件中已有 key 并且值不为空在翻译时会排除, 在增量更新场景提高翻译速度
  // 例如此例子，翻译后在 locales/en 中已有的 json 文件修改文案再次启动翻译即可查看效果
  // fast mode: If the key already exists in the target file and the value is not empty, it will be excluded during translation, and the translation speed will be improved in the incremental update scenario
  // For example, in this example, after translation, modify the text of the existing json file in locales/en and start the translation again to see the effect
  incrementalMode: IncrementalMode.fast,
  translate: [
    {
      label: '快速翻译模式/Fast translation mode',
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
