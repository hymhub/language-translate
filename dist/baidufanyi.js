import axios from 'axios';
import { md5 } from './md5.js';
class Baidu {
    constructor(appid, key) {
        this.appid = appid;
        this.key = key;
    }
    async translate(q, options) {
        const { from, to } = options;
        const salt = Date.now().toString();
        const req = {
            from,
            to,
            q,
            salt,
            appid: this.appid,
            sign: md5(`${this.appid}${q}${salt}${this.key}`)
        };
        const { data } = await axios.get('https://fanyi-api.baidu.com/api/trans/vip/translate', {
            params: req
        });
        if (data.error_code != null) {
            throw new Error(JSON.stringify(data));
        }
        else {
            return data.trans_result.map(({ dst }) => dst).join('');
        }
    }
}
export default Baidu;
