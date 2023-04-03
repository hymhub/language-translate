import type { Proxy, Lang, ApiKeyConfig } from './types';
export declare const translate: ({ input, output, fromLang, targetLang, toolsLang, proxy, apiKeyConfig }: {
    input: string;
    output: string;
    fromLang: Lang;
    targetLang: Lang;
    toolsLang?: "zh-CN" | "en" | undefined;
    proxy?: Proxy | undefined;
    apiKeyConfig?: ApiKeyConfig | undefined;
}) => Promise<undefined>;
