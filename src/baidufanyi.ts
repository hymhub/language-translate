import axios from 'axios'
import { md5 } from './md5.js'
import type { Lang } from './types'

interface TranslateReq {
  from: Lang
  to: Lang
  q: string
  salt: string
  appid: string
  sign: string
}

interface TranslateRes {
  error_code?: any
  from: Lang
  to: Lang
  trans_result: Array<{
    src: string
    dst: string
  }>
}

interface TranslateOption {
  from: Lang
  to: Lang
}

class Baidu {
  constructor (private readonly appid: string, private readonly key: string) {}

  async translate (q: string, options: TranslateOption): Promise<string> {
    const { from, to } = options
    const salt = Date.now().toString()
    const req: TranslateReq = {
      from,
      to,
      q,
      salt,
      appid: this.appid,
      sign: md5(`${this.appid}${q}${salt}${this.key}`)
    }
    const { data } = await axios.get<TranslateRes>('https://fanyi-api.baidu.com/api/trans/vip/translate', {
      params: req
    })
    if (data.error_code != null) {
      throw new Error(JSON.stringify(data))
    } else {
      return data.trans_result.map(({ dst }) => dst).join('')
    }
  }
}

export default Baidu
