const translate = require("@vitalets/google-translate-api");
const tunnel = require("tunnel");
let opts = {from: "", to: ""};
const fs = require("fs");
let agent = {}
let options1 = { src: '', from: '', to: '', out: '', exportIp: '', exportPort: '' }
const translator = (key: string, value: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        translate(value, opts, agent)
            // @ts-ignore
            .then((res) => {
                console.log(`${value} -----------> ${res.text}`)
                resolve({key, newValue: res.text});
            })
            // @ts-ignore
            .catch((err) => {
                reject(err);
            });
    });
};

export const google = async (options: { src: string, from: string, to: string, out: string, exportIp: string, exportPort: string }) => {
    opts = {from: options.from, to: options.to}
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
    }
    // @ts-ignore
    let tot = fs.readFileSync(options.src, 'utf8');
    tot = tot.split('export')?.[1].split('{')
    tot = tot.splice(1).join('{')
    tot = 'module.exports = {' + tot
    fs.writeFileSync(
        options.out,
        tot,
    );
    let toText = require(options.out)
    // @ts-ignore
    const translators = [];
    const keys = Object.keys(toText)
    for (let i = 0; i < keys.length; i++) {
        const data = await translator(keys[i],toText[keys[i]].toString())
        // @ts-ignore
        toText[data.key] = data.newValue;
        opts = {from: options.from, to: options.to}
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
        }
    }
    let prefix = ''
    let src = fs.readFileSync(options.src, 'utf8');
    src = src.split('export')
    prefix += `${src[0]}export${src[1].split('{')[0]}`
    fs.writeFile(
        options.out,
        prefix + JSON.stringify(toText),
        // @ts-ignore
        (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`生成文件：${options.out}`);
        }
    );
    return Promise.resolve();
};
