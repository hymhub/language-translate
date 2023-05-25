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
  incrementalMode: IncrementalMode.fast,
  translate: [
    {
      label: '压力速度测试/Stress speed test',
      targetConfig: [
        {
          label: '快速翻译模式 - Afrikaans',
          targetLang: 'af',
          outPath: 'locales/af.json'
        },

        {
          label: '快速翻译模式 - Albanian',
          targetLang: 'sq',
          outPath: 'locales/sq.json'
        },

        {
          label: '快速翻译模式 - Amharic',
          targetLang: 'am',
          outPath: 'locales/am.json'
        },

        {
          label: '快速翻译模式 - Arabic',
          targetLang: 'ar',
          outPath: 'locales/ar.json'
        },

        {
          label: '快速翻译模式 - Armenian',
          targetLang: 'hy',
          outPath: 'locales/hy.json'
        },

        {
          label: '快速翻译模式 - Azerbaijani',
          targetLang: 'az',
          outPath: 'locales/az.json'
        },

        {
          label: '快速翻译模式 - Basque',
          targetLang: 'eu',
          outPath: 'locales/eu.json'
        },

        {
          label: '快速翻译模式 - Belarusian',
          targetLang: 'be',
          outPath: 'locales/be.json'
        },

        {
          label: '快速翻译模式 - Bengali',
          targetLang: 'bn',
          outPath: 'locales/bn.json'
        },

        {
          label: '快速翻译模式 - Bosnian',
          targetLang: 'bs',
          outPath: 'locales/bs.json'
        },

        {
          label: '快速翻译模式 - Bulgarian',
          targetLang: 'bg',
          outPath: 'locales/bg.json'
        },

        {
          label: '快速翻译模式 - Catalan',
          targetLang: 'ca',
          outPath: 'locales/ca.json'
        },

        {
          label: '快速翻译模式 - Cebuano',
          targetLang: 'ceb',
          outPath: 'locales/ceb.json'
        },

        {
          label: '快速翻译模式 - Chichewa',
          targetLang: 'ny',
          outPath: 'locales/ny.json'
        },

        {
          label: '快速翻译模式 - Corsican',
          targetLang: 'co',
          outPath: 'locales/co.json'
        },

        {
          label: '快速翻译模式 - Croatian',
          targetLang: 'hr',
          outPath: 'locales/hr.json'
        },

        {
          label: '快速翻译模式 - Czech',
          targetLang: 'cs',
          outPath: 'locales/cs.json'
        },

        {
          label: '快速翻译模式 - Danish',
          targetLang: 'da',
          outPath: 'locales/da.json'
        },

        {
          label: '快速翻译模式 - Dutch',
          targetLang: 'nl',
          outPath: 'locales/nl.json'
        },

        {
          label: '快速翻译模式 - Esperanto',
          targetLang: 'eo',
          outPath: 'locales/eo.json'
        },

        {
          label: '快速翻译模式 - Estonian',
          targetLang: 'et',
          outPath: 'locales/et.json'
        },

        {
          label: '快速翻译模式 - Filipino',
          targetLang: 'tl',
          outPath: 'locales/tl.json'
        },

        {
          label: '快速翻译模式 - Finnish',
          targetLang: 'fi',
          outPath: 'locales/fi.json'
        },

        {
          label: '快速翻译模式 - French',
          targetLang: 'fr',
          outPath: 'locales/fr.json'
        },

        {
          label: '快速翻译模式 - Frisian',
          targetLang: 'fy',
          outPath: 'locales/fy.json'
        },

        {
          label: '快速翻译模式 - Galician',
          targetLang: 'gl',
          outPath: 'locales/gl.json'
        },

        {
          label: '快速翻译模式 - Georgian',
          targetLang: 'ka',
          outPath: 'locales/ka.json'
        },

        {
          label: '快速翻译模式 - German',
          targetLang: 'de',
          outPath: 'locales/de.json'
        },

        {
          label: '快速翻译模式 - Greek',
          targetLang: 'el',
          outPath: 'locales/el.json'
        },

        {
          label: '快速翻译模式 - Gujarati',
          targetLang: 'gu',
          outPath: 'locales/gu.json'
        },

        {
          label: '快速翻译模式 - Haitian Creole',
          targetLang: 'ht',
          outPath: 'locales/ht.json'
        },

        {
          label: '快速翻译模式 - Hausa',
          targetLang: 'ha',
          outPath: 'locales/ha.json'
        },

        {
          label: '快速翻译模式 - Hawaiian',
          targetLang: 'haw',
          outPath: 'locales/haw.json'
        },

        {
          label: '快速翻译模式 - Hebrew',
          targetLang: 'iw',
          outPath: 'locales/iw.json'
        },

        {
          label: '快速翻译模式 - Hindi',
          targetLang: 'hi',
          outPath: 'locales/hi.json'
        },

        {
          label: '快速翻译模式 - Hmong',
          targetLang: 'hmn',
          outPath: 'locales/hmn.json'
        },

        {
          label: '快速翻译模式 - Hungarian',
          targetLang: 'hu',
          outPath: 'locales/hu.json'
        },

        {
          label: '快速翻译模式 - Icelandic',
          targetLang: 'is',
          outPath: 'locales/is.json'
        },

        {
          label: '快速翻译模式 - Igbo',
          targetLang: 'ig',
          outPath: 'locales/ig.json'
        },

        {
          label: '快速翻译模式 - Indonesian',
          targetLang: 'id',
          outPath: 'locales/id.json'
        },

        {
          label: '快速翻译模式 - Irish',
          targetLang: 'ga',
          outPath: 'locales/ga.json'
        },

        {
          label: '快速翻译模式 - Italian',
          targetLang: 'it',
          outPath: 'locales/it.json'
        },

        {
          label: '快速翻译模式 - Japanese',
          targetLang: 'ja',
          outPath: 'locales/ja.json'
        },

        {
          label: '快速翻译模式 - Javanese',
          targetLang: 'jw',
          outPath: 'locales/jw.json'
        },

        {
          label: '快速翻译模式 - Kannada',
          targetLang: 'kn',
          outPath: 'locales/kn.json'
        },

        {
          label: '快速翻译模式 - Kazakh',
          targetLang: 'kk',
          outPath: 'locales/kk.json'
        },

        {
          label: '快速翻译模式 - Khmer',
          targetLang: 'km',
          outPath: 'locales/km.json'
        },

        {
          label: '快速翻译模式 - Korean',
          targetLang: 'ko',
          outPath: 'locales/ko.json'
        },

        {
          label: '快速翻译模式 - Kurdish (Kurmanji)',
          targetLang: 'ku',
          outPath: 'locales/ku.json'
        },

        {
          label: '快速翻译模式 - Kyrgyz',
          targetLang: 'ky',
          outPath: 'locales/ky.json'
        },

        {
          label: '快速翻译模式 - Lao',
          targetLang: 'lo',
          outPath: 'locales/lo.json'
        },

        {
          label: '快速翻译模式 - Latin',
          targetLang: 'la',
          outPath: 'locales/la.json'
        },

        {
          label: '快速翻译模式 - Latvian',
          targetLang: 'lv',
          outPath: 'locales/lv.json'
        },

        {
          label: '快速翻译模式 - Lithuanian',
          targetLang: 'lt',
          outPath: 'locales/lt.json'
        },

        {
          label: '快速翻译模式 - Luxembourgish',
          targetLang: 'lb',
          outPath: 'locales/lb.json'
        },

        {
          label: '快速翻译模式 - Macedonian',
          targetLang: 'mk',
          outPath: 'locales/mk.json'
        },

        {
          label: '快速翻译模式 - Malagasy',
          targetLang: 'mg',
          outPath: 'locales/mg.json'
        },

        {
          label: '快速翻译模式 - Malay',
          targetLang: 'ms',
          outPath: 'locales/ms.json'
        },

        {
          label: '快速翻译模式 - Malayalam',
          targetLang: 'ml',
          outPath: 'locales/ml.json'
        },

        {
          label: '快速翻译模式 - Maltese',
          targetLang: 'mt',
          outPath: 'locales/mt.json'
        },

        {
          label: '快速翻译模式 - Maori',
          targetLang: 'mi',
          outPath: 'locales/mi.json'
        },

        {
          label: '快速翻译模式 - Marathi',
          targetLang: 'mr',
          outPath: 'locales/mr.json'
        },

        {
          label: '快速翻译模式 - Mongolian',
          targetLang: 'mn',
          outPath: 'locales/mn.json'
        },

        {
          label: '快速翻译模式 - Myanmar (Burmese)',
          targetLang: 'my',
          outPath: 'locales/my.json'
        },

        {
          label: '快速翻译模式 - Nepali',
          targetLang: 'ne',
          outPath: 'locales/ne.json'
        },

        {
          label: '快速翻译模式 - Norwegian',
          targetLang: 'no',
          outPath: 'locales/no.json'
        },

        {
          label: '快速翻译模式 - Pashto',
          targetLang: 'ps',
          outPath: 'locales/ps.json'
        },

        {
          label: '快速翻译模式 - Persian',
          targetLang: 'fa',
          outPath: 'locales/fa.json'
        },

        {
          label: '快速翻译模式 - Polish',
          targetLang: 'pl',
          outPath: 'locales/pl.json'
        },

        {
          label: '快速翻译模式 - Portuguese',
          targetLang: 'pt',
          outPath: 'locales/pt.json'
        },

        {
          label: '快速翻译模式 - Punjabi',
          targetLang: 'pa',
          outPath: 'locales/pa.json'
        },

        {
          label: '快速翻译模式 - Romanian',
          targetLang: 'ro',
          outPath: 'locales/ro.json'
        },

        {
          label: '快速翻译模式 - Russian',
          targetLang: 'ru',
          outPath: 'locales/ru.json'
        },

        {
          label: '快速翻译模式 - Samoan',
          targetLang: 'sm',
          outPath: 'locales/sm.json'
        },

        {
          label: '快速翻译模式 - Scots Gaelic',
          targetLang: 'gd',
          outPath: 'locales/gd.json'
        },

        {
          label: '快速翻译模式 - Serbian',
          targetLang: 'sr',
          outPath: 'locales/sr.json'
        },

        {
          label: '快速翻译模式 - Sesotho',
          targetLang: 'st',
          outPath: 'locales/st.json'
        },

        {
          label: '快速翻译模式 - Shona',
          targetLang: 'sn',
          outPath: 'locales/sn.json'
        },

        {
          label: '快速翻译模式 - Sindhi',
          targetLang: 'sd',
          outPath: 'locales/sd.json'
        },

        {
          label: '快速翻译模式 - Sinhala',
          targetLang: 'si',
          outPath: 'locales/si.json'
        },

        {
          label: '快速翻译模式 - Slovak',
          targetLang: 'sk',
          outPath: 'locales/sk.json'
        },

        {
          label: '快速翻译模式 - Slovenian',
          targetLang: 'sl',
          outPath: 'locales/sl.json'
        },

        {
          label: '快速翻译模式 - Somali',
          targetLang: 'so',
          outPath: 'locales/so.json'
        },

        {
          label: '快速翻译模式 - Spanish',
          targetLang: 'es',
          outPath: 'locales/es.json'
        },

        {
          label: '快速翻译模式 - Sundanese',
          targetLang: 'su',
          outPath: 'locales/su.json'
        },

        {
          label: '快速翻译模式 - Swahili',
          targetLang: 'sw',
          outPath: 'locales/sw.json'
        },

        {
          label: '快速翻译模式 - Swedish',
          targetLang: 'sv',
          outPath: 'locales/sv.json'
        },

        {
          label: '快速翻译模式 - Tajik',
          targetLang: 'tg',
          outPath: 'locales/tg.json'
        },

        {
          label: '快速翻译模式 - Tamil',
          targetLang: 'ta',
          outPath: 'locales/ta.json'
        },

        {
          label: '快速翻译模式 - Telugu',
          targetLang: 'te',
          outPath: 'locales/te.json'
        },

        {
          label: '快速翻译模式 - Thai',
          targetLang: 'th',
          outPath: 'locales/th.json'
        },

        {
          label: '快速翻译模式 - Turkish',
          targetLang: 'tr',
          outPath: 'locales/tr.json'
        },

        {
          label: '快速翻译模式 - Ukrainian',
          targetLang: 'uk',
          outPath: 'locales/uk.json'
        },

        {
          label: '快速翻译模式 - Urdu',
          targetLang: 'ur',
          outPath: 'locales/ur.json'
        },

        {
          label: '快速翻译模式 - Uzbek',
          targetLang: 'uz',
          outPath: 'locales/uz.json'
        },

        {
          label: '快速翻译模式 - Vietnamese',
          targetLang: 'vi',
          outPath: 'locales/vi.json'
        },

        {
          label: '快速翻译模式 - Welsh',
          targetLang: 'cy',
          outPath: 'locales/cy.json'
        },

        {
          label: '快速翻译模式 - Xhosa',
          targetLang: 'xh',
          outPath: 'locales/xh.json'
        },

        {
          label: '快速翻译模式 - Yiddish',
          targetLang: 'yi',
          outPath: 'locales/yi.json'
        },

        {
          label: '快速翻译模式 - Yoruba',
          targetLang: 'yo',
          outPath: 'locales/yo.json'
        },

        {
          label: '快速翻译模式 - Zulu',
          targetLang: 'zu',
          outPath: 'locales/zu.json'
        }
      ]
    }
  ]
})
