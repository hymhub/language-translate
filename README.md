# language-translate

一款在线翻译ts/js/json多语言文件并批量生成或插入指定文件的插件，支持增量更新，可使用 bash 翻译单个文件，也能集成在项目中持续批量翻译

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

## 安装

```bash
  npm i language-translate
```

## 使用

在您的项目根目录下创建 `translate.config.(js|ts|json)` 进行配置

js|ts 配置示例:
```js
// translate.config.js
import { Lang } from 'language-translate/types';
import { defineConfig } from 'language-translate/utils';

export default defineConfig({
  proxy: {
    host: '127.0.0.1',
    port: 7890,
  },
  fromLang: Lang.en,
  fromPath: 'translate.entry.json',
  translate: [
    {
      label: '将结果翻译到locales文件夹下',
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
在您的项目根目录下创建 `translate.entry.(js|ts|json)` 文件名随意，但需要和配置中 `fromPath` 对应，里面填写您需要翻译的内容，内容所使用语言与配置中 `fromLang` 对应

例如在根目录创建 `translate.entry.json`
```json
{
  "hello": "Hello {{{name}}}, how are you today?",
  "button": {
    "confirm": "data",
    "cancel": "cancel"
  },
  "header": {
    "login": "login"
  }
}
```

在 `package.json` 中加入 scripts 命令

```json
"scripts": {
  "translate": "translate"
}
```

确保项目根目录下 `locales` 文件夹存在后在终端执行

```bash
npm run translate
```

不出意外已经可以在根目录下 `locales` 内看到 `de.json`、`ko.json`、`zh.json`

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

## 配置API

### `translate.config.(js|ts|json)`

| 属性 | 描述 | 类型 | 默认值 | 是否必填 |
| :-: | :-- | :-: | :-: | :-: |
| `toolsLang` | 翻译工具在使用过程中终端输出的提示语言 | `en` \| `zh-CN` | `zh-CN` | &emsp;&emsp;否&emsp;&emsp; |
| `proxy` | 使用 Google 翻译，需要网络代理，如果您所在的国家能直接使用 Google 就可以不填 proxy 配置项 | [Proxy](#proxy) | undefined | &emsp;&emsp;否&emsp;&emsp; |
| `fromLang` | 待翻译文件所使用语言 | [Lang](#lang) | - | 是 |
| `fromPath` | 待翻译文件路径，后缀名可以是 js\|ts\|json | string | `translate.entry.json` | 否 |
| `translate` | 翻译输出配置，可配置多项在开始翻译时进行选择 | [Translate](#translate)[] | - | 是 |

### `Proxy`

| 属性 | 描述 | 类型 |
| :-: | :--: | :-: |
| `host` | 代理主机地址 | string |
| `port` | 代理主机端口 | number |

### `Translate`

| 属性 | 描述 | 类型 |
| :-: | :--: | :-: |
| `label` | 自定义名称，当 `translate` 配置项有多项的时候，启动翻译时会在终端提示进行选择让翻译更加工程化，具体演示: [FAQ](#faq) | string |
| `targetConfig` | 翻译输出配置 | [TargetConfig](#targetconfig) |

### `TargetConfig`

| 属性 | 描述 | 类型 |
| :-: | :--: | :-: |
| `targetLang` | 翻译输出的目标语言 | [Lang](#lang) |
| `outPath` |  翻译后文件输出路径，后缀名可以是js\|ts\|json，如果没有目标文件则自动生成，如果有则增量更新 | string |

### `Lang`

| Language/语言 | Translation Code/翻译代码 |
| :-: | :-: |
| Chinese (Simplified)/中文(简体) | zh-CN |
| Chinese (Traditional)/中文(繁体) | zh-TW |
| English/英语 | en |
| Vietnamese/越南语 | vi |
| Albanian/阿尔巴尼亚语 | sq |
| Arabic/阿拉伯语 | ar |
| Azerbaijani/阿塞拜疆语 | az |
| Irish/爱尔兰语 | ga |
| Estonian/爱沙尼亚语 | et |
| Belarusian/白俄罗斯语 | be |
| Bulgarian/保加利亚语 | bg |
| Icelandic/冰岛语 | is |
| Polish/波兰语 | pl |
| Persian/波斯语 | fa |
| Afrikaans/布尔文(南非荷兰语) | af |
| Danish/丹麦语 | da |
| German/德语 | de |
| Russian/俄语 | ru |
| French/法语 | fr |
| Filipino/菲律宾语 | tl |
| Finnish/芬兰语 | fi |
| Georgian/格鲁吉亚语 | ka |
| Haitian Creole/海地克里奥尔语 | ht |
| Korean/韩语 | ko |
| Dutch/荷兰语 | nl |
| Galician/加利西亚语 | gl |
| Catalan/加泰罗尼亚语 | ca |
| Czech/捷克语 | cs |
| Croatian/克罗地亚语 | hr |
| Latvian/拉脱维亚语 | lv |
| Lithuanian/立陶宛语 | lt |
| Romanian/罗马尼亚语 | ro |
| Maltese/马耳他语 | mt |
| Malay/马来语 | ms |
| Macedonian/马其顿语 | mk |
| Norwegian/挪威语 | no |
| Portuguese/葡萄牙语 | pt |
| Japanese/日语 | ja |
| Swedish/瑞典语 | sv |
| Serbian/塞尔维亚语 | sr |
| Slovak/斯洛伐克语 | sk |
| Slovenian/斯洛文尼亚语 | sl |
| Swahili/斯瓦希里语 | sw |
| Thai/泰语 | th |
| Turkish/土耳其语 | tr |
| Welsh/威尔士语 | cy |
| Ukrainian/乌克兰语 | uk |
| Basque/西班牙的巴斯克语 | eu |
| Spanish/西班牙语 | es |
| Hebrew/希伯来语 | iw |
| Greek/希腊语 | el |
| Hungarian/匈牙利语 | hu |
| Armenian/亚美尼亚语 | hy |
| Italian/意大利语 | it |
| Yiddish/意第绪语 | yi |
| Hindi/印地语 | hi |
| Urdu/印度乌尔都语 | ur |
| Indonesian/印尼语 | id |

## FAQ

在具有


## 问题

如果您有任何问题，您可以通过以下方式与我联系

- Email : 1749207188@qq.com


## 作者

- [@hymhub](https://github.com/hymhub)



