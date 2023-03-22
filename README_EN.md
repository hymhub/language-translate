# language-translate

A plug-in that translates ts/js/json multilingual files online and generates or inserts specified files in batches, supports incremental updates, can use bash to translate a single file, and can also be integrated in the project for continuous batch translation

[中文](./README.md) ｜ [English](./README_EN.md)
<p align="center">
  <a href="https://github.com/hymhub/language-translate" target="_blank">
    <img src="./md/logo.png" alt="heimdall-ts" width="250"/>
  </a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/language-translate" target="__blank">
    <img src="https://img.shields.io/npm/v/language-translate" alt="NPM version">
  </a>
  <a href="https://www.npmjs.com/package/language-translate" target="__blank">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/language-translate">
  </a>
  <a href="https://github.com/hymhub/language-translate/blob/main/LICENSE" target="__blank">
    <img src="https://img.shields.io/github/license/hymhub/language-translate.svg" alt="LICENSE">
  </a>
</p>
<p align="center">
  <a href="https://github.com/hymhub/language-translate" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/hymhub/language-translate?style=social">
  </a>
<p>

## Install

```bash
  npm i language-translate
```

## Usage

Create `translate.config.(js|ts|json)` in your project root directory for configuration

js|ts Configuration example:
```js
// translate.config.js
import { Lang } from 'language-translate/types';
import { defineConfig } from 'language-translate/utils';

export default defineConfig({
  toolsLang: 'en',
  proxy: {
    host: '127.0.0.1',
    port: 7890,
  },
  fromLang: Lang.en,
  fromPath: 'translate.entry.json',
  translate: [
    {
      label: 'Translate the results to the locales folder',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales/de.json',
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales/zh.json',
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales/ko.json',
        },
      ]
    }
  ]
})
```
Create `translate.entry.(js|ts|json)` in the root directory of your project. The file name is optional, but it needs to correspond to `fromPath` in the configuration. Fill in the content you need to translate, the language used in the content and the configuration `fromLang` corresponds to

For example, in the root directory create `translate.entry.json`
```json
{
  "hello": "Hello {{{name}}}, how are you today?",
  "button": {
    "confirm": "confirm",
    "cancel": "cancel"
  },
  "header": {
    "login": "login"
  }
}
```

Add scripts command to `package.json`

```json
"scripts": {
  "translate": "translate"
}
```

Make sure that the `locales` folder exists in the project root directory and execute it in the terminal

```bash
npm run translate
```

Not surprisingly, you can already see `de.json`, `ko.json`, `zh.json` in `locales` in the root directory

```
|-- Your Project Name
  |-- locales
    |-- de.json
    |-- ko.json
    |-- zh.json
  |-- package.json
  |-- translate.config.js
  |-- translate.entry.json
```

Afterwards, when there is a new copy that needs to be translated, you only need to modify the content of the `fromPath` file (that is, `translate.entry.json` in the example), and then execute `npm run translate` to achieve incremental updates

## Config API

### `translate.config.(js|ts|json)`

| Attribute | Description | Type | Default | Required |
| :-: | :-- | :-: | :-: | :-: |
| `toolsLang` | The prompt language output by the terminal during the use of the translation tool | `en` \| `zh-CN` | `zh-CN` | No |
| `proxy` | To use Google Translate, a network proxy is required. If your country can directly use Google, you don’t need to fill in the proxy configuration item | [Proxy](#proxy) | undefined | No |
| `fromLang` | The language of the document to be translated | [Lang](#lang) | - | Yes |
| `fromPath` | The path of the file to be translated, the suffix can be js\|ts\|json | string | `translate.entry.json` | No |
| `translate` | Translation output configuration, multiple options can be configured when starting translation | [Translate](#translate)[] | - | Yes |

### `Proxy`

| Attribute | Description | Type |
| :-: | :--: | :-: |
| `host` | proxy host address | string |
| `port` | proxy host port | number |

### `Translate`

| Attribute | Description | Type |
| :-: | :--: | :-: |
| `label` | Customize the name. When there are multiple `translate` configuration items, when the translation is started, the terminal will prompt you to make a choice to make the translation more engineering. The specific demonstration: [FAQ](#faq) | string |
| `targetConfig` | Translation output configuration | [TargetConfig](#targetconfig) |

### `TargetConfig`

| Attribute | Description | Type |
| :-: | :--: | :-: |
| `targetLang` | Target language for translation output | [Lang](#lang) |
| `outPath` |  The output path of the translated file, the suffix can be js\|ts\|json, if there is no target file, it will be automatically generated, if there is, it will be incrementally updated | string |

### `Lang`

| Language | Translation Code |
| :-: | :-: |
| Chinese (Simplified) | zh-CN |
| Chinese (Traditional) | zh-TW |
| English | en |
| Vietnamese | vi |
| Albanian | sq |
| Arabic | ar |
| Azerbaijani | az |
| Irish | ga |
| Estonian | et |
| Belarusian | be |
| Bulgarian | bg |
| Icelandic | is |
| Polish | pl |
| Persian | fa |
| Afrikaans | af |
| Danish | da |
| German | de |
| Russian | ru |
| French | fr |
| Filipino | tl |
| Finnish | fi |
| Georgian | ka |
| Haitian Creole | ht |
| Korean | ko |
| Dutch | nl |
| Galician | gl |
| Catalan | ca |
| Czech | cs |
| Croatian | hr |
| Latvian | lv |
| Lithuanian | lt |
| Romanian | ro |
| Maltese | mt |
| Malay | ms |
| Macedonian | mk |
| Norwegian | no |
| Portuguese | pt |
| Japanese | ja |
| Swedish | sv |
| Serbian | sr |
| Slovak | sk |
| Slovenian | sl |
| Swahili | sw |
| Thai | th |
| Turkish | tr |
| Welsh | cy |
| Ukrainian | uk |
| Basque | eu |
| Spanish | es |
| Hebrew | iw |
| Greek | el |
| Hungarian | hu |
| Armenian | hy |
| Italian | it |
| Yiddish | yi |
| Hindi | hi |
| Urdu | ur |
| Indonesian | id |

## FAQ

Applicable scenarios for configuring multiple `translate` configuration items
During development, there may be folders dedicated to storing error codes, business copywriting, and even various modules under the `locales` folder, such as:
```
|-- Your Project Name
  |-- locales
    |-- error
      |-- de.json
      |-- ko.json
      |-- zh.json
    |-- label
      |-- de.json
      |-- ko.json
      |-- zh.json
```
At this time, fill in the content of the error code copy in the file to be translated, for example `translate.entry.json`
```json
{
  "0": "service error",
  "4": "client error",
}
```
Now we only want to insert the translated results into the `locales/error` directory, just add multiple options to the `translate` configuration item and then start the translation, then the terminal will prompt you to choose:
```js
// translate.config.js
import { Lang } from 'language-translate/types';
import { defineConfig } from 'language-translate/utils';

export default defineConfig({
  toolsLang: 'en',
  proxy: {
    host: '127.0.0.1',
    port: 7890,
  },
  fromLang: Lang.en,
  fromPath: 'translate.entry.json',
  translate: [
    {
      label: 'Translate the results to the locales/error folder',
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
      label: 'Translate the results to the locales/label folder',
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
  ]
})
```
terminal execution
```bash
npm run translate
```
<p><img width="398px" src="./md/useCustomKey_en.png" /></p>

The translation output optional function has been realized at this time

## In bash use

language-translate also supports translation of individual files in bash
```bash
npm i language-translate -g
```
Execute directly in bash
```bash
translate -i /User/xxx/source.json -o /User/xxx/target.json -f en -t zh-CN -h 127.0.0.1 -p 7890
```
You can also type `translate --help` for help
```bash
translate --help
# terminal output
Usage: translate [options]

Translate a single js/ts/json file

Options:
  -i, --input <string>     source file path
  -o, --output <string>    target file path
  -f, --fromlang <Lang>    source file language
  -t, --targetlang <Lang>  target file language
  -h, --host <string>      proxy host
  -p, --port <string>      proxy port
  --help                   display help for command
```

## Question

If you have any questions, you can contact me by

- Email : 1749207188@qq.com


## Author

- [@hymhub](https://github.com/hymhub)



