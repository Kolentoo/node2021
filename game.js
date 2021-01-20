const express  = require('express');
const app = express();

let server = app.listen(3888, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running', host, port);
});

app.get('/', function (req, res) {
  res.send('start okkkk');
});

const superagent= require('superagent');
let gameList = [];

superagent.get('https://www.xbox-now.com/zh/games-with-gold').end((err, res) => {
  if (err) {
    console.log(`游戏列表抓取失败 - ${err}`)
  } else {
   console.log('返回的游戏数据res',res)
   gameList = getGame(res);
  }
});


const cheerio = require('cheerio');

let getGame = (res) => {
  let gameList = [];
  let $ = cheerio.load(res.text);

  // 找到目标数据所在的页面元素，获取数据
  $('div.box-success .comparison-table-entry .box-title a').each((idx, ele) => {
    // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
    let result = {
      title: $(ele).text(),        // 获取新闻标题
      href: $(ele).attr('href')    // 获取新闻网页链接
    };
    gameList.push(result)              // 存入最终结果数组
  });
  return gameList
};

app.get('/list', async (req, res, next) => {
  res.send(gameList);
});