import { loadConfig } from "unconfig";
import type { ExportConfig } from "./types";
import { Command } from 'commander';
import { translate } from "./translate.js";

const program = new Command();

program.description('Translate a single js/ts/json file')
  .option('-i, --input <string>', 'source file path')
  .option('-o, --output <string>', 'target file path')
  .option('-f, --fromlang <string>', 'source file language')
  .option('-t, --targetlang <string>', 'target file language')
  .action(async (options: {
    input?: string;
    output?: string;
    fromlang?: string;
    targetlang?: string;
  }) => {
    if (
      options.input
      && options.output
      && options.fromlang
      && options.targetlang
    ) {
      // a file run
    } else {
      const { config } = await loadConfig<ExportConfig>({
        sources: [
          {
            files: "translate.config",
            extensions: ["ts", "js", "json", ""],
          },
        ],
      });
      config.translate.forEach(item => {
        item.targetConfig.forEach(it => {
          translate({
            input: config.fromPath,
            output: it.outPath,
            fromLang: config.fromLang,
            targetLang: it.targetLang,
            toolsLang: config.toolsLang,
            proxy: config.proxy,
          });
        })
      })
    }
  });

program.parse();