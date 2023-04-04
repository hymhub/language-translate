import type { Lang } from './types';
interface TranslateOption {
    from: Lang;
    to: Lang;
}
declare class Baidu {
    private readonly appid;
    private readonly key;
    constructor(appid: string, key: string);
    translate(q: string, options: TranslateOption): Promise<string>;
}
export default Baidu;
