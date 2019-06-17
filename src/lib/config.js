import tempdata from './tempdata';
import availableYaolings from './availableYaolings';

const CUR_YAOLING_VERSION = 'sprite_18b3306a1d7dda37b41d2d458e00a0a8.json'; // 妖灵数据库版本，如果与官方版本不一致，需要手动更新
//本地妖灵数据库更新时间:"2019-06-14 08:09:00"

const APP_VERSION = 'v1.5.1'; // 地图版本
const API_KEY = '2LWBZ-FEQK6-KKYS2-M6WR4-PFGS5-RZBP3'; // 地图 api key

let dataMap = [];
tempdata.Data.forEach(o => {
  dataMap[o.Id] = o;
});

const FILTER = {
  FILTER_WIDE: [
    {
      id: 2000106,
      name: '风雪虎',
      on: true
    },
    {
      id: 2000313,
      name: '银角小妖',
      on: true
    },
    {
      id: 2000316,
      name: '金角小妖',
      on: true
    },
    {
      id: 2000327,
      name: '小蝙蝠',
      on: true
    },
    {
      id: 2000265,
      name: '香玉',
      on: true
    },
    {
      id: 2000238,
      name: '颜如玉',
      on: true
    },
    {
      id:2000147,
      name:'岩上喵',
      on:true
    }
  ],
  FILTER_RARE: [
    2000106, // 风雪虎
    2000313, // 银角小妖
    2000316, //金角小妖
    2000327, // 小蝙蝠
    2000265, // 香玉
    2000238, // 颜如玉
    2000109, // 螺莉莉
    2000028, //小蝌蚪
    2000419, //花火羊
    2000242, // 夜行枭
    // 2000147, // 檐上喵 现在满大街
    // 2000188 // CoCo熊 现在满大街
  ],
  FILTER_NEST: [
    2000321, // 木偶娃娃
    2000324, // 瓷偶娃娃
    2000112, // 雷童子
    2000413, //兜兜犴
    2000416, //淘奇蛇
  ],
  FILTER_FEATURE: [
    2004013, // 暴走小龙虾
    2004016, // 素包
    2004010, // 舞狮
    2004007, // 貂宝
    2004004, // 小白蛇
    2000206, // 麻辣小火锅
    2000182 // 小兵俑
  ],
  FILTER_FISH: [
    2000501, // 咸鱼
    2000502, // 多鱼
    2000504, // 摸鱼
    2000519 // 大若智鱼
  ],
  FILTER_ELEMENT: [
    2000511, // 金元宝宝
    2000512, // 木元宝宝
    2000513, // 水元宝宝
    2000514, // 火元宝宝
    2000515 // 土元宝宝
  ],
  FILTER_BOT: [
    // 告警机器人使用
    2000106, // 风雪虎
    2000313, // 银角小妖
    2000327, // 小蝙蝠
    2000265, // 香玉
    2000238 // 颜如玉
  ],
  FILTER_GHOST: [
    2000271, //三魂
    2000272, //七魄
  ],
  FILTER_T1: tempdata.Data.filter(item => {
    return item.Level === 2 && availableYaolings.Data.includes(item.Id);
  }).map(item => {
    return item.Id;
  }),
  FILTER_T2: tempdata.Data.filter(item => {
    return item.Level === 3 && availableYaolings.Data.includes(item.Id);
  }).map(item => {
    return item.Id;
  }),

  FILTER_CUSTOM: availableYaolings.Data.map(item => {
    return {
      id: item,
      name: dataMap[item].Name,
      img: dataMap[item].SmallImgPath,
      on:false,
    }
  })
};

const SOCKET = {
  MAX_RECONNECT_TIME: 10, // 断线重连次数
  MSG_INTERVAL: 5000, // 发送消息最小时间间隔
  RECONNECT_TIMEOUT: 1000, // 断线重连时间
  URL:
    'wss://publicld.gwgo.qq.com?account_value=0&account_type=1&appid=0&token=0' // 官方妖灵查询接口
};

const BOT = {
  URL: 'http://127.0.0.1:36524/api/v1/Cqp/CQ_sendGroupMsg'
};

// 官方接口每次查询的经纬度范围
// MAX_RANGE: 以查询点为基准，范围查询的单元格数量
// 例如MAX_RANGE=10。即是基准东南西北各+10，再加中心线，21*21的单元格数
const WIDE_SEARCH = {
  MAX_RANGE: 5, 
  MAX_SOCKETS: 10, // 最大socket线程数
  LAT_RANGE: 0.013754, // 单次查询纬度偏移量
  LNG_RANGE: 0.01795 // 单词查询经度偏移量
};

const MAP_PARAMS = {
  BOX_WIDTH: 2,
  BOX_FILL: new qq.maps.Color(100,100,255,0.1),
  BOX_STROKE: new qq.maps.Color(100,100,255,0.4),

  OUTBOX_WIDTH: 1,
  OUTBOX_FILL: new qq.maps.Color(0,0,0,0),
  OUTBOX_STROKE: new qq.maps.Color(100,200,255,0.8),

  ERROR_FILL: new qq.maps.Color(255,100,100,0.4),
  ERROR_STROKE: new qq.maps.Color(255,100,100,0.6),
}

module.exports = {
  FILTER,
  API_KEY,
  SOCKET,
  CUR_YAOLING_VERSION,
  APP_VERSION,
  WIDE_SEARCH,
  MAP_PARAMS,
  BOT
};
