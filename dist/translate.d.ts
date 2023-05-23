import type { Proxy, Lang, ApiKeyConfig } from './types';
import { IncrementalMode } from './types.js';
export declare const translate: ({ input, output, fromLang, targetLang, toolsLang, proxy, apiKeyConfig, incrementalMode, translateRuntimeDelay, translateRuntimeChunkSize, translateRuntimeMergeEnabled, mergeEnabledChunkValuesLength, ignoreValuesAndCopyToTarget }: {
    input: string;
    output: string;
    fromLang: Lang;
    targetLang: Lang;
    toolsLang?: "zh-CN" | "en" | undefined;
    proxy?: Proxy | undefined;
    apiKeyConfig?: ApiKeyConfig | undefined;
    incrementalMode: IncrementalMode;
    translateRuntimeDelay?: number | undefined;
    translateRuntimeChunkSize?: number | undefined;
    translateRuntimeMergeEnabled?: boolean | undefined;
    mergeEnabledChunkValuesLength?: number | undefined;
    ignoreValuesAndCopyToTarget?: string[] | undefined;
}) => Promise<undefined>;
