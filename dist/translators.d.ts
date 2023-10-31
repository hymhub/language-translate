import type { Lang, Proxy, ApiKeyConfig, SourceLanguageCode, TargetLanguageCode } from './types';
export declare const getTranslator: ({ fromLang, targetLang, proxy, toolsLang, apiKeyConfig }: {
    fromLang: Lang | SourceLanguageCode;
    targetLang: Lang | TargetLanguageCode;
    proxy?: Proxy | undefined;
    toolsLang: 'en' | 'zh-CN';
    apiKeyConfig?: ApiKeyConfig | undefined;
}) => (key: string) => Promise<string>;
