export declare enum Lang {
    /** Chinese(Simplified)/中文(简体) */
    'zh-CN' = "zh-CN",
    /** Chinese(Traditional)/中文(繁体) */
    'zh-TW' = "zh-TW",
    /** English/英语 */
    'en' = "en",
    /** Vietnamese/越南语 */
    'vi' = "vi",
    /** Albanian/阿尔巴尼亚语 */
    'sq' = "sq",
    /** Arabic/阿拉伯语 */
    'ar' = "ar",
    /** Azerbaijani/阿塞拜疆语 */
    'az' = "az",
    /** Irish/爱尔兰语 */
    'ga' = "ga",
    /** Estonian/爱沙尼亚语 */
    'et' = "et",
    /** Belarusian/白俄罗斯语 */
    'be' = "be",
    /** Bulgarian/保加利亚语 */
    'bg' = "bg",
    /** Icelandic/冰岛语 */
    'is' = "is",
    /** Polish/波兰语 */
    'pl' = "pl",
    /** Persian/波斯语 */
    'fa' = "fa",
    /** Afrikaans/布尔文(南非荷兰语) */
    'af' = "af",
    /** Danish/丹麦语 */
    'da' = "da",
    /** German/德语 */
    'de' = "de",
    /** Russian/俄语 */
    'ru' = "ru",
    /** French/法语 */
    'fr' = "fr",
    /** Filipino/菲律宾语 */
    'tl' = "tl",
    /** Finnish/芬兰语 */
    'fi' = "fi",
    /** Georgian/格鲁吉亚语 */
    'ka' = "ka",
    /** Haitian Creole/海地克里奥尔语 */
    'ht' = "ht",
    /** Korean/韩语 */
    'ko' = "ko",
    /** Dutch/荷兰语 */
    'nl' = "nl",
    /** Galician/加利西亚语 */
    'gl' = "gl",
    /** Catalan/加泰罗尼亚语 */
    'ca' = "ca",
    /** Czech/捷克语 */
    'cs' = "cs",
    /** Croatian/克罗地亚语 */
    'hr' = "hr",
    /** Latvian/拉脱维亚语 */
    'lv' = "lv",
    /** Lithuanian/立陶宛语 */
    'lt' = "lt",
    /** Romanian/罗马尼亚语 */
    'ro' = "ro",
    /** Maltese/马耳他语 */
    'mt' = "mt",
    /** Malay/马来语 */
    'ms' = "ms",
    /** Macedonian/马其顿语 */
    'mk' = "mk",
    /** Norwegian/挪威语 */
    'no' = "no",
    /** Portuguese/葡萄牙语 */
    'pt' = "pt",
    /** Japanese/日语 */
    'ja' = "ja",
    'sv' = "sv",
    'sr' = "sr",
    'sk' = "sk",
    'sl' = "sl",
    'sw' = "sw",
    'th' = "th",
    'tr' = "tr",
    'cy' = "cy",
    'uk' = "uk",
    'eu' = "eu",
    'es' = "es",
    'iw' = "iw",
    'el' = "el",
    'hu' = "hu",
    'hy' = "hy",
    'it' = "it",
    'yi' = "yi",
    'hi' = "hi",
    'ur' = "ur",
    'id' = "id"
}
export declare enum TranslateService {
    baidu = "baidu",
    google = "google"
}
export interface Proxy {
    host: string;
    port: number;
}
export interface BaiduApiKeyConfig {
    appId: string;
    appKey: string;
}
export interface ApiKeyConfig {
    type: TranslateService;
    [TranslateService.baidu]?: BaiduApiKeyConfig;
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
export declare enum IncrementalMode {
    cover = "cover",
    fast = "fast"
}
export interface ExportConfig {
    /**
     * @default 'zh-CN'
     */
    toolsLang?: 'en' | 'zh-CN';
    proxy?: Proxy;
    fromLang: Lang;
    /**
     * @default 'translate.entry.json'
     */
    fromPath?: string;
    apiKeyConfig?: ApiKeyConfig;
    /**
     * @default IncrementalMode.cover
     */
    incrementalMode?: IncrementalMode;
    /**
     * @default 0
     */
    translateRuntimeDelay?: number;
    /**
     * @default 5
     */
    translateRuntimeChunkSize?: number;
    translate: Translate[];
}
