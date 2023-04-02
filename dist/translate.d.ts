import { Proxy, Lang, ApiKeyConfig } from "./types";
export declare const translate: ({ input, output, fromLang, targetLang, toolsLang, proxy, apiKeyConfig, }: {
    input: string;
    output: string;
    fromLang: Lang;
    targetLang: Lang;
    toolsLang?: "en" | "zh-CN" | undefined;
    proxy?: Proxy | undefined;
    apiKeyConfig?: ApiKeyConfig | undefined;
}) => Promise<void>;
