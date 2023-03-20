import { Lang } from '../src/types';
import { defineConfig } from '../src/utils';

export default defineConfig({
  toolsLang: 'zh-CN',
  proxy: {
    host: '127.0.0.1',
    port: 7890,
  },
  fromLang: Lang.en,
  translate: [
    {
      label: '翻译到label',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/label/de',
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/label/zh',
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/label/ko',
        },
      ]
    },
    {
      label: '翻译到error',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/error/de',
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/error/zh',
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/error/ko',
        },
      ]
    }
  ]
})