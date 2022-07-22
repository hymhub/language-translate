const translate = require("@vitalets/google-translate-api");
const tunnel = require("tunnel");
let opts = { from: "", to: "" };
const fs = require("fs");
let agent = {};
let optionsCopy: { [x: string]: any } = {};
let failedNum = 0;
const translator = (key: string, value: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    function go() {
      translate(value, opts, agent)
        // @ts-ignore
        .then((res) => {
          console.log(`${value} -----------> ${res.text}`);
          resolve({ key, newValue: res.text });
        })
        // @ts-ignore
        .catch((err) => {
          console.log("Translation failed, trying again...");
          if (++failedNum > 10) {
            console.log("You can check whether the agent is normal");
          }
          agent = {
            agent: tunnel.httpsOverHttp({
              proxy: {
                host: optionsCopy.exportIp,
                port: optionsCopy.exportPort,
                headers: {
                  "User-Agent": "Node",
                },
              },
            } as any),
          };
          setTimeout(() => {
            go();
          }, 1000);
        });
    }
    go();
  });
};

export const more = async (options: {
  src: string;
  from: string;
  to: string;
  out: string;
  exportIp: string;
  exportPort: string;
}) => {
  opts = { from: options.from, to: options.to };
  optionsCopy = options;
  failedNum = 0;
  agent = {
    agent: tunnel.httpsOverHttp({
      proxy: {
        host: options.exportIp,
        port: options.exportPort,
        headers: {
          "User-Agent": "Node",
        },
      },
    } as any),
  };
  // @ts-ignore
  let tot = fs.readFileSync(options.src, "utf8");
  tot = tot.slice(tot.indexOf('{'), tot.lastIndexOf('}')+1);
  let toText: { [x: string]: any } = {};
  tot = "toText = " + tot;
  try {
    eval(`(${tot})`);
  } catch (error) {
    throw new Error("翻译异常: 请检查待翻译文件内容是否正常\n" + error);
  }
  if (Object.keys(toText).length === 0) {
    console.log("待翻译文件没有内容，请添加您需要翻译的内容后重试");
    return 'notkey';
  }
  // let toText = require(options.out)
  // @ts-ignore
  const keys = Object.keys(toText);
  for (let i = 0; i < keys.length; i++) {
    let itemText = toText[keys[i]];
    if (typeof itemText !== "string") {
      throw new Error("翻译异常: 暂不支持翻译 string 以外的类型!");
    }
    const data = await translator(keys[i], itemText.toString());
    // @ts-ignore
    toText[data.key] = data.newValue;
    opts = { from: options.from, to: options.to };
    agent = {
      agent: tunnel.httpsOverHttp({
        proxy: {
          host: options.exportIp,
          port: options.exportPort,
          headers: {
            "User-Agent": "Node",
          },
        },
      } as any),
    };
  }

  let startStr = '';
  const funValues: string[] = [];
  let outFile = fs.readFileSync(options.out, "utf8");
  startStr = outFile.slice(0, outFile.indexOf('export'));
  outFile = outFile.slice(outFile.indexOf('export'));
  startStr += outFile.slice(0, outFile.indexOf('{'));
  outFile = outFile.slice(outFile.indexOf('{'), outFile.lastIndexOf('}')+1);
  outFile = outFile.replace(/['"`a-zA-Z0-9_]+:.*(\(.+\).*=>|function[\s\S]+?return)[\s\S]+?,\n/g, (v: string) => {
    funValues.push(v);
    return '';
  });
  let outText: { [x: string]: any } = {};
  outFile = "outText = " + outFile;
  try {
    eval(`(${outFile})`);
  } catch (error) {
    throw new Error("翻译异常: 检查目标文件内是否有错误\n SRC ==> " +options.src+ error);
  }

  outText = {
    ...outText,
    ...toText
  };

  let resultString = startStr + '{\n';
  funValues.forEach(item => {
    resultString += `\t${item}`;
  });
  for (const key in outText) {
    resultString += `\t${JSON.stringify({[key]: outText[key]}).slice(1, -1)},\n`
  }
  resultString += '}';
  fs.writeFile(
    options.out,
    resultString,
    // @ts-ignore
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`已将翻译结果成功插入到: ${options.out}`);
    }
  );
  return Promise.resolve();
};
