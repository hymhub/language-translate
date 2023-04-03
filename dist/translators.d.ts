import type { Lang, Proxy, ApiKeyConfig } from './types';
export declare const getTranslator: ({ fromLang, targetLang, proxy, toolsLang, apiKeyConfig }: {
    fromLang: Lang;
    targetLang: Lang;
    proxy?: Proxy | undefined;
    toolsLang: 'en' | 'zh-CN';
    apiKeyConfig?: ApiKeyConfig | undefined;
}) => (key: string) => Promise<string>;
