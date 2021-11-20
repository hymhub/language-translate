# language-translate

一个可以把ts多语言文件在线翻译并批量生成或插入指定文件的插件

# 1.安装  
```npm install language-translate```  

# 2.功能  
将现有.ts文件中定义的语言批量翻译成指定语言并生成或插入指定文件

# 3.使用
翻译前配置
```js
// 在您的项目下创建待翻译文件 translateFrom.ts（名字随意）
// 以 export default 导出所有您需要翻译的内容
export default {
    hello: 'hello language translate!'
}
```
```js
// 在您的项目下创建翻译配置文件 translateConfig.ts
const translate = require('language-translate')
const path = require('path')

const base: {
    fromLang: String // 待翻译文件所属语言
    fromFileName: String // 待翻译文件名
    baseFromPath: String // 待翻译文件所在路径
    baseToPath: String // 翻译后创建或插入文件的存放路径
    ip: String // 代理ip（因为使用Google翻译，需要进行代理）
    port: String // 代理端口
    // 翻译模式
    // create 将翻译结果以创建新文件方式输出到指定路径
    // insert 在指定现有文件尾部插入翻译结果方式进行
    mode: 'create' | 'insert'
} = {
    fromLang: 'en',
    fromFileName: 'translateFrom.ts',
    baseFromPath: __dirname + '/',
    baseToPath: path.join(__dirname, 'src/assets/locales/Label_'),
    ip: '127.0.0.1',
    port: '7890',
    mode: 'insert',
}

const config: Array<{
    lang: String, // 目标语言
    toFileName: String // 目标文件名（会和 baseToPath 进行拼接）
}> = [
    {
        lang: 'es',
        toFileName: 'es.ts',
    },
    {
        lang: 'fr',
        toFileName: 'fr.ts',
    },
    {
        lang: 'de',
        toFileName: 'gm.ts',
    },
    {
        lang: 'id',
        toFileName: 'id.ts',
    },
    {
        lang: 'ja',
        toFileName: 'ja.ts',
    },
    {
        lang: 'ko',
        toFileName: 'kr.ts',
    },
    {
        lang: 'pt',
        toFileName: 'pt.ts',
    },
    {
        lang: 'ru',
        toFileName: 'rs.ts',
    },
    {
        lang: 'th',
        toFileName: 'th.ts',
    },
    {
        lang: 'tr',
        toFileName: 'tk.ts',
    },
    {
        lang: 'vi',
        toFileName: 'vn.ts',
    },
]

translate(base, config)
```  
在您的项目 package.json 中配置翻译命令开始翻译
```json
"scripts": {
    "translate": "ts-node translateConfig.ts"
}
```
安装 ts-node 
```
npm i ts-node
```
终端运行
```
npm run translate
```
此后您只需要更改上述待翻译文件 translateFrom.ts 中的内容再次运行```npm run translate```即可
# 4.帮助  
语言简称汇总
* 中文:zh-CN
* 英语:en
* 中文(繁体):zh-TW
* 越南语:vi
* 阿尔巴尼亚语:sq
* 阿拉伯语:ar
* 阿塞拜疆语:az
* 爱尔兰语:ga
* 爱沙尼亚语:et
* 白俄罗斯语:be
* 保加利亚语:bg
* 冰岛语:is
* 波兰语:pl
* 波斯语:fa
* 布尔文(南非荷兰语):af
* 丹麦语:da
* 德语:de
* 俄语:ru
* 法语:fr
* 菲律宾语:tl
* 芬兰语:fi
* 格鲁吉亚语:ka
* 海地克里奥尔语:ht
* 韩语:ko
* 荷兰语:nl
* 加利西亚语:gl
* 加泰罗尼亚语:ca
* 捷克语:cs
* 克罗地亚语:hr
* 拉脱维亚语:lv
* 立陶宛语:lt
* 罗马尼亚语:ro
* 马耳他语:mt
* 马来语:ms
* 马其顿语:mk
* 挪威语:no
* 葡萄牙语:pt
* 日语:ja
* 瑞典语:sv
* 塞尔维亚语:sr
* 斯洛伐克语:sk
* 斯洛文尼亚语:sl
* 斯瓦希里语:sw
* 泰语:th
* 土耳其语:tr
* 威尔士语:cy
* 乌克兰语:uk
* 西班牙的巴斯克语:eu
* 西班牙语:es
* 希伯来语:iw
* 希腊语:el
* 匈牙利语:hu
* 亚美尼亚语:hy
* 意大利语:it
* 意第绪语:yi
* 印地语:hi
* 印度乌尔都语:ur
* 印尼语:id
* 越南语:vi