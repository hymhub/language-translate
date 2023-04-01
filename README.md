# language-translate

language-translate 是一款基于 Google 翻译在线转换 ts/js/json 多语言文件并批量生成或插入指定文件的插件，支持增量更新，可使用 bash 翻译单个文件，也能集成在项目中持续批量翻译，支持单文件转单文件，单文件转多文件，多文件转多文件，多文件转单文件

[中文](./README.md) ｜ [English](./README_EN.md)
<p align="center">
  <a href="https://github.com/hymhub/language-translate" target="_blank">
    <img src="./md/logo.png" alt="language-translate" width="250"/>
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

<p align="center">
  <img src="./md/demo.gif">
<p>

## 安装

```bash
  npm i language-translate
```

## 使用

在您的项目根目录下创建 `translate.config.(js|ts)` 进行配置

js 配置示例:
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
    "confirm": "confirm",
    "cancel": "cancel"
  },
  "header": {
    "login": "login"
  }
}
```
注意: 翻译后会在结果保留 i18n 中的插值表达式，例如上述 `{{name}}` 但仅支持 `{{}}` 这一种语法

在 `package.json` 中加入 scripts 命令

```json
"scripts": {
  "translate": "translate"
}
```

在终端执行命令启动翻译

```bash
npm run translate
```

不出意外已经可以在根目录下 `locales` 内看到 `de.json`、`ko.json`、`zh.json`

```md
|-- Your Project Name
  |-- locales
    |-- de.json
    |-- ko.json
    |-- zh.json
  |-- package.json
  |-- translate.config.js
  |-- translate.entry.json
```

此后有新文案需要翻译时，只需要修改 `fromPath` 文件内容(即示例中`translate.entry.json`)，再执行 `npm run translate` 即可实现增量更新

## 高级用法
配置中的 `fromPath` 是基于 [fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax) 的，所以支持动态解析，例如递归翻译整个文件夹下以 `.en.json` 结尾的文件
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
  fromPath: 'locales/**/*.en.json',
  translate: [
    {
      label: '递归翻译文件夹内json文件并重写文件名',
      targetConfig: [
        {
          targetLang: Lang.de,
          outPath: 'locales',
          rewrite: fileName => fileName.replace('.en.json', '.de.json'),
        },
        {
          targetLang: Lang['zh-CN'],
          outPath: 'locales',
          rewrite: fileName => fileName.replace('.en.json', '.zh.json'),
        },
        {
          targetLang: Lang.ko,
          outPath: 'locales',
          rewrite: fileName => fileName.replace('.en.json', '.ko.json'),
        },
      ]
    },
  ]
})
```
翻译前 `locales` 目录结构
```md
locales
├─com.en.json
├─header.en.json
├─children
|    ├─color.en.json
```
翻译后 `locales` 目录结构
```md
locales
├─com.de.json
├─com.en.json
├─com.ko.json
├─com.zh.json
├─header.de.json
├─header.en.json
├─header.ko.json
├─header.zh.json
├─children
|    ├─color.de.json
|    ├─color.en.json
|    ├─color.ko.json
|    └─color.zh.json
```

也可以将翻译结果输出到另一个文件夹，只需要更改 `outPath` 即可，更多用法等你解锁哦，也可结合[FAQ](#faq)输出可选做出更多花样，项目 [example](https://github.com/hymhub/language-translate/tree/main/example) 目录中也提供了一些简单示例

## 配置API

### `translate.config.(js|ts)`

| 属性 | 描述 | 类型 | 默认值 | 必填 |
| :-: | :-- | :-: | :-: | :-: |
| `toolsLang` | 翻译工具在使用过程中终端输出的提示语言 | `en` \| `zh-CN` | `zh-CN` | 否 |
| `proxy` | 使用 Google 翻译，需要网络代理，如果您所在的国家能直接使用 Google 就可以不填 proxy 配置项 | [Proxy](#proxy) | undefined | 否 |
| `fromLang` | 待翻译文件所使用语言 | [Lang](#lang) | - | 是 |
| `fromPath` | 待翻译文件路径，基于 [fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax)，支持动态解析，后缀名可以是 js\|ts\|json | string | `translate.entry.json` | 否 |
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

| 属性 | 描述 | 类型 | 必填 |
| :-: | :--: | :-: | :-: |
| `targetLang` | 翻译输出的目标语言 | [Lang](#lang) | 是 |
| `outPath` |  翻译后文件输出路径，后缀名可以是js\|ts\|json，也可以是目录，输出时如果没有目标文件则自动生成，如果有则增量更新 | string | 是 |
| `rewrite` | 可选值，传入回调函数可在输出时重写文件名，形参会传入原始文件名，返回值是最终输出文件名 | Callback<br/>`(fileName: string) => string;` | 否 |

### `Lang`

| 语言 | 翻译代码 |
| :-: | :-: |
| 中文(简体) | zh-CN |
| 中文(繁体) | zh-TW |
| 英语 | en |
| 越南语 | vi |
| 阿尔巴尼亚语 | sq |
| 阿拉伯语 | ar |
| 阿塞拜疆语 | az |
| 爱尔兰语 | ga |
| 爱沙尼亚语 | et |
| 白俄罗斯语 | be |
| 保加利亚语 | bg |
| 冰岛语 | is |
| 波兰语 | pl |
| 波斯语 | fa |
| 布尔文(南非荷兰语) | af |
| 丹麦语 | da |
| 德语 | de |
| 俄语 | ru |
| 法语 | fr |
| 菲律宾语 | tl |
| 芬兰语 | fi |
| 格鲁吉亚语 | ka |
| 海地克里奥尔语 | ht |
| 韩语 | ko |
| 荷兰语 | nl |
| 加利西亚语 | gl |
| 加泰罗尼亚语 | ca |
| 捷克语 | cs |
| 克罗地亚语 | hr |
| 拉脱维亚语 | lv |
| 立陶宛语 | lt |
| 罗马尼亚语 | ro |
| 马耳他语 | mt |
| 马来语 | ms |
| 马其顿语 | mk |
| 挪威语 | no |
| 葡萄牙语 | pt |
| 日语 | ja |
| 瑞典语 | sv |
| 塞尔维亚语 | sr |
| 斯洛伐克语 | sk |
| 斯洛文尼亚语 | sl |
| 斯瓦希里语 | sw |
| 泰语 | th |
| 土耳其语 | tr |
| 威尔士语 | cy |
| 乌克兰语 | uk |
| 西班牙的巴斯克语 | eu |
| 西班牙语 | es |
| 希伯来语 | iw |
| 希腊语 | el |
| 匈牙利语 | hu |
| 亚美尼亚语 | hy |
| 意大利语 | it |
| 意第绪语 | yi |
| 印地语 | hi |
| 印度乌尔都语 | ur |
| 印尼语 | id |

如果 `Lang` 配置中没有您需要的语言，您可以直接传入 Google 翻译支持的语言代码

## FAQ

`translate` 配置项配置多项的适用场景
在开发中，`locales` 文件夹下可能会有专门存放错误码、业务文案的文件夹，甚至多种模块，例如:
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
此时在待翻译文件填入错误码文案内容，例如 `translate.entry.json`
```json
{
  "0": "service error",
  "4": "client error",
}
```
现在我们只想让翻译后的结果插入 `locales/error` 目录下，只需在 `translate` 配置项添加多个选项后再启动翻译，这时终端会提示让您进行选择:
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
      label: '将结果翻译到locales/error文件夹下',
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
      label: '将结果翻译到locales/label文件夹下',
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
终端执行
```bash
npm run translate
```
<p><img width="300px" src="./md/useCustomKey.png" /></p>

此时已实现翻译输出可选功能

## 在 bash 中使用

language-translate 也支持在 bash 中翻译单个文件
```bash
npm i language-translate -g
```
直接在 bash 执行
```bash
translate -i /User/xxx/source.json -o /User/xxx/target.json -f en -t zh-CN -h 127.0.0.1 -p 7890
```
您也可以输入 `translate --help` 获取帮助
```bash
translate --help
# 终端输出
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

## 问题

如果您有任何问题，您可以通过以下方式与我联系

- Email : hyminghan@qq.com


## 作者

- [@hymenhan](https://github.com/hymhub)
