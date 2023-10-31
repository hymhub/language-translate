import type { Proxy, ApiKeyConfig, SourceLanguageCode, TargetLanguageCode } from './types';
import { IncrementalMode, Lang } from './types.js';
export declare const translate: ({ input, output, fromLang, targetLang, toolsLang, proxy, apiKeyConfig, incrementalMode, translateRuntimeDelay, translateRuntimeChunkSize, translateRuntimeMergeEnabled, mergeEnabledChunkValuesLength, ignoreValuesAndCopyToTarget }: {
    input: string;
    output: string;
    fromLang: Lang | SourceLanguageCode;
    targetLang: Lang | TargetLanguageCode;
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
