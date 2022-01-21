const {google} = require('./google')
const {more} = require('./more')

export const createModeFun = (options: {
    src: string
    from: string
    out: string
    to: string
    exportIp: string
    exportPort: string
}) => {
    const {src,from,to,out} = options
    if (!(src&&from&&to&&out))throw new Error(`缺少必要参数:${JSON.stringify(options)}`)
    const startTime = new Date().getTime();
    google(options)
        .then(() => {
            console.log(`翻译完成----->耗时：${Number((new Date().getTime() - startTime)/1000)}s`);
        })
        .catch((e:Error) => {
            throw e;
        });
}

export const insertModeFun = (options: {
    src: string
    from: string
    out: string
    to: string
    exportIp: string
    exportPort: string
}) => {
    const {src,from,to,out} = options
    if (!(src&&from&&to&&out))throw new Error(`缺少必要参数:${JSON.stringify(options)}`)
    const startTime = new Date().getTime();
    more(options)
        .then(() => {
            console.log(`翻译完成----->耗时：${Number((new Date().getTime() - startTime)/1000)}s`);
        })
        .catch((e:Error) => {
            throw e;
        });
}