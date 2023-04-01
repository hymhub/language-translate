import { Lang } from 'language-translate/types';
import { defineConfig } from 'language-translate/utils';

export default defineConfig({
  // toolsLang: 'en', // The translation tool opens this line of comments in English
  proxy: {
    host: '127.0.0.1',
    port: 7890,
  },
  fromLang: Lang.en,
  fromPath: 'locales/en/**/*.json',
  translate: [
    {
      label: '多文件翻译到单文件/Multifile to single file',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/dist/de.bundle.json',
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/dist/zh.bundle.json',
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/dist/ko.bundle.json',
        },
      ]
    },
  ]
})