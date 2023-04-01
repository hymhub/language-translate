export enum Lang {
  /** Chinese(Simplified)/中文(简体) */
  "zh-CN" = "zh-CN",
  /** Chinese(Traditional)/中文(繁体) */
  "zh-TW" = "zh-TW",
  /** English/英语 */
  "en" = "en",
  /** Vietnamese/越南语 */
  "vi" = "vi",
  /** Albanian/阿尔巴尼亚语 */
  "sq" = "sq",
  /** Arabic/阿拉伯语 */
  "ar" = "ar",
  /** Azerbaijani/阿塞拜疆语 */
  "az" = "az",
  /** Irish/爱尔兰语 */
  "ga" = "ga",
  /** Estonian/爱沙尼亚语 */
  "et" = "et",
  /** Belarusian/白俄罗斯语 */
  "be" = "be",
  /** Bulgarian/保加利亚语 */
  "bg" = "bg",
  /** Icelandic/冰岛语 */
  "is" = "is",
  /** Polish/波兰语 */
  "pl" = "pl",
  /** Persian/波斯语 */
  "fa" = "fa",
  /** Afrikaans/布尔文(南非荷兰语) */
  "af" = "af",
  /** Danish/丹麦语 */
  "da" = "da",
  /** German/德语 */
  "de" = "de",
  /** Russian/俄语 */
  "ru" = "ru",
  /** French/法语 */
  "fr" = "fr",
  /** Filipino/菲律宾语 */
  "tl" = "tl",
  /** Finnish/芬兰语 */
  "fi" = "fi",
  /** Georgian/格鲁吉亚语 */
  "ka" = "ka",
  /** Haitian Creole/海地克里奥尔语 */
  "ht" = "ht",
  /** Korean/韩语 */
  "ko" = "ko",
  /** Dutch/荷兰语 */
  "nl" = "nl",
  /** Galician/加利西亚语 */
  "gl" = "gl",
  /** Catalan/加泰罗尼亚语 */
  "ca" = "ca",
  /** Czech/捷克语 */
  "cs" = "cs",
  /** Croatian/克罗地亚语 */
  "hr" = "hr",
  /** Latvian/拉脱维亚语 */
  "lv" = "lv",
  /** Lithuanian/立陶宛语 */
  "lt" = "lt",
  /** Romanian/罗马尼亚语 */
  "ro" = "ro",
  /** Maltese/马耳他语 */
  "mt" = "mt",
  /** Malay/马来语 */
  "ms" = "ms",
  /** Macedonian/马其顿语 */
  "mk" = "mk",
  /** Norwegian/挪威语 */
  "no" = "no",
  /** Portuguese/葡萄牙语 */
  "pt" = "pt",
  /** Japanese/日语 */
  "ja" = "ja",
  /* Swedish/瑞典语 */
  "sv" = "sv",
  /* Serbian/塞尔维亚语 */
  "sr" = "sr",
  /* Slovak/斯洛伐克语 */
  "sk" = "sk",
  /* Slovenian/斯洛文尼亚语 */
  "sl" = "sl",
  /* Swahili/斯瓦希里语 */
  "sw" = "sw",
  /* Thai/泰语 */
  "th" = "th",
  /* Turkish/土耳其语 */
  "tr" = "tr",
  /* Welsh/威尔士语 */
  "cy" = "cy",
  /* Ukrainian/乌克兰语 */
  "uk" = "uk",
  /* Basque/西班牙的巴斯克语 */
  "eu" = "eu",
  /* Spanish/西班牙语 */
  "es" = "es",
  /* Hebrew/希伯来语 */
  "iw" = "iw",
  /* Greek/希腊语 */
  "el" = "el",
  /* Hungarian/匈牙利语 */
  "hu" = "hu",
  /* Armenian/亚美尼亚语 */
  "hy" = "hy",
  /* Italian/意大利语 */
  "it" = "it",
  /* Yiddish/意第绪语 */
  "yi" = "yi",
  /* Hindi/印地语 */
  "hi" = "hi",
  /* Urdu/印度乌尔都语 */
  "ur" = "ur",
  /* Indonesian/印尼语 */
  "id" = "id",
}

export interface Proxy {
  host: string;
  port: number;
}

export interface TargetConfig {
  targetLang: Lang;
  outPath: string;
  rewrite?: (fileName: string) => string;
}

export interface Translate {
  label: string;
  targetConfig: TargetConfig[];
}

export interface ExportConfig {
  /**
   * @default en
   */
  toolsLang?: 'en' | 'zh-CN';
  proxy?: Proxy;
  fromLang: Lang;
  fromPath?: string;
  translate: Translate[];
}