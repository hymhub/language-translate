import { loadConfig } from 'unconfig'
import type { ExportConfig, TargetConfig, Lang, SourceLanguageCode, TargetLanguageCode } from './types'
import { IncrementalMode } from './types.js'
import { Command } from 'commander'
import { translate } from './translate.js'
import { consoleError, getOutPath, getRootPath } from './utils.js'
import { ls } from './locales.js'
import inquirer from 'inquirer'
import path from 'path'
import fg from 'fast-glob'

const program = new Command()

program.description('Translate a single js/ts/json file')
  .option('-i, --input <string>', 'source file path')
  .option('-o, --output <string>', 'target file path')
  .option('-f, --fromlang <Lang>', 'source file language')
  .option('-t, --targetlang <Lang>', 'target file language')
  .option('-h, --host <string>', 'proxy host')
  .option('-p, --port <string>', 'proxy port')
  .action(async (options: {
    input?: string
    output?: string
    fromlang?: Lang | SourceLanguageCode
    targetlang?: Lang | TargetLanguageCode
    host?: string
    port?: number
  }) => {
    if (
      Object.keys(options).length > 0
    ) {
      if (
        options.input !== undefined &&
        options.output !== undefined &&
        options.fromlang &&
        options.targetlang
      ) {
        // a file run
        void translate({
          input: options.input,
          output: options.output,
          fromLang: options.fromlang,
          targetLang: options.targetlang,
          toolsLang: 'en',
          incrementalMode: IncrementalMode.cover,
          proxy: options.host !== undefined && options.port !== undefined
            ? {
                host: options.host,
                port: Number(options.port)
              }
            : undefined
        })
      } else {
        consoleError('Missing required parameters, you can execute `translate --help` to get help')
      }
    } else {
      const { config } = await loadConfig<ExportConfig>({
        sources: [
          {
            files: 'translate.config',
            extensions: ['ts', 'js']
          }
        ]
      })
      config.toolsLang = config.toolsLang ?? 'zh-CN'
      const incrementalMode = config.incrementalMode ?? IncrementalMode.cover
      config.fromPath = config.fromPath !== undefined
        ? config.fromPath
        : 'translate.entry.json'
      const entries = fg.sync(config.fromPath, { dot: true, cwd: getRootPath() })
      let duplicateRemovalEntries: string[] = []
      const tmpEntries = entries.map(v => v.split('/'))
      duplicateRemovalEntries = tmpEntries.map(
        (v) => v.filter((childV, childIdx) => {
          if (childIdx === v.length - 1) {
            return true
          }
          let repeat = true
          for (let i = 0; i < tmpEntries.length; i++) {
            if (tmpEntries[i][childIdx] !== childV) {
              repeat = false
              break
            }
          }
          return !repeat
        }).join('/')
      )
      const checkCustomKey = [{
        type: 'list',
        message: ls[config.toolsLang].customOutConfig,
        name: 'targetConfig',
        choices: config.translate.map(it => ({
          name: it.label,
          value: it.targetConfig
        }))
      }]
      if (config.translate.length > 1) {
        void inquirer
          .prompt(checkCustomKey)
          .then(({ targetConfig }: { targetConfig: TargetConfig[] }) => {
            targetConfig.forEach(it => {
              entries.forEach((entryPath, idx) => {
                const outPath = getOutPath(it, duplicateRemovalEntries, idx, entryPath)
                void translate({
                  input: path.join(getRootPath(), entryPath),
                  output: outPath,
                  fromLang: config.fromLang,
                  targetLang: it.targetLang,
                  toolsLang: config.toolsLang,
                  proxy: config.proxy,
                  apiKeyConfig: config.apiKeyConfig,
                  incrementalMode,
                  translateRuntimeDelay: config.translateRuntimeDelay,
                  translateRuntimeChunkSize: config.translateRuntimeChunkSize,
                  ignoreValuesAndCopyToTarget: config.ignoreValuesAndCopyToTarget,
                  translateRuntimeMergeEnabled: config.translateRuntimeMergeEnabled,
                  mergeEnabledChunkValuesLength: config.mergeEnabledChunkValuesLength
                })
              })
            })
          })
      } else if (config.translate.length === 1) {
        config.translate[0].targetConfig.forEach(it => {
          entries.forEach((entryPath, idx) => {
            const outPath = getOutPath(it, duplicateRemovalEntries, idx, entryPath)
            void translate({
              input: path.join(getRootPath(), entryPath),
              output: outPath,
              fromLang: config.fromLang,
              targetLang: it.targetLang,
              toolsLang: config.toolsLang,
              proxy: config.proxy,
              apiKeyConfig: config.apiKeyConfig,
              incrementalMode,
              translateRuntimeDelay: config.translateRuntimeDelay,
              translateRuntimeChunkSize: config.translateRuntimeChunkSize,
              ignoreValuesAndCopyToTarget: config.ignoreValuesAndCopyToTarget,
              translateRuntimeMergeEnabled: config.translateRuntimeMergeEnabled,
              mergeEnabledChunkValuesLength: config.mergeEnabledChunkValuesLength
            })
          })
        })
      } else {
        consoleError(ls[config.toolsLang].checkConfig)
      }
    }
  })

program.parse()
