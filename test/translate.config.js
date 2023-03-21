import { Lang } from '../src/types';
import { defineConfig } from '../src/utils';

export default defineConfig({
  // toolsLang: 'zh-CN',
  proxy: {
    host: '127.0.0.1',
    port: 7890,
  },
  fromLang: Lang.en,
  // fromPath: 'translate.entry.js',
  translate: [
    {
      label: '翻译到label',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/label/de.json',
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/label/zh.json',
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/label/ko.json',
        },
      ]
    },
    {
      label: '翻译到error',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/error/de.json',
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/error/zh.json',
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/error/ko.json',
        },
      ]
    },
    {
      label: '翻译到js',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/js/de.js',
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/js/zh.js',
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/js/ko.js',
        },
      ]
    }
  ]
})