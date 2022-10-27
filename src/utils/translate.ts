import * as md5 from 'md5';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
const APP_ID = process.env.APP_ID;
const APP_KEY = process.env.APP_KEY;

const URL = 'http://api.fanyi.baidu.com/api/trans/vip/translate';

export const snakeCase2QueryStr = (str = '') => {
  return str.replace(/_/g, '\n');
};

export const translate = async ({
  q,
  from = 'auto',
  to = 'zh',
}: {
  q: string;
  from: string;
  to: string;
}) => {
  const salt = new Date().getTime();
  const str = APP_ID + q + salt + APP_KEY;
  const sign = md5(str);
  const res = await axios.get(URL, {
    params: {
      q,
      from,
      to,
      appid: APP_ID,
      salt,
      sign,
    },
  });
  return res.data;
};

export const en2zh = async (en = '') => {
  const res = await translate({ q: en, from: 'en', to: 'zh' });
  const { trans_result } = res;
  if (!trans_result) {
    return [];
  }
  return trans_result.map((item: any) => item.dst);
};

export const zh2en = async (zh = '') => {
  const res = await translate({ q: zh, from: 'zh', to: 'en' });
  const { trans_result } = await res;
  if (!trans_result) {
    return [];
  }
  return trans_result.map((item: any) => item.dst);
};
