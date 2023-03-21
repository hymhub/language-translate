import { Proxy, Lang } from './types';
export declare const translate: ({ input, output, fromLang, targetLang, toolsLang, proxy, }: {
    input: string;
    output: string;
    fromLang: Lang;
    targetLang: Lang;
    toolsLang?: "en" | "zh-CN" | undefined;
    proxy?: Proxy | undefined;
}) => Promise<void>;
