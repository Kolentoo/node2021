// 1.express启动一个简单的Http服务
// 2.分析目标页面DOM结构，找到所要抓取的信息的相关DOM元素
// 3.使用superagent请求目标页面
// 4.使用cheerio获取页面元素，获取目标数据
// 5.返回数据到前端浏览器

const express  = require('express');
const app = express();

// 建立数据库连接
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kolento123!',
  port     : 3306,
  database : 'kolento'
});
 
db.connect(err=>{
  if(err) throw err;
  console.log('数据库连接成功')
});

let server = app.listen(3888, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Your App is running', host, port);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 引入所需要的第三方包,用于请求页面
// superagent模块提供了很多比如get、post、delte等方法，可以很方便地进行Ajax请求操作。
// 在请求结束后执行.end()回调函数。.end()接受一个函数作为参数，
// 该函数又有两个参数error和res。当请求失败，error会包含返回的错误信息，请求成功，error值为null，返回的数据会包含在res参数中
const superagent= require('superagent');
let hotNews = []; // 热点新闻
let localNews = []; // 本地新闻

superagent.get('http://news.baidu.com/').end((err, res) => {
  if (err) {
    // 如果访问失败或者出错，会这行这里
    console.log(`热点新闻抓取失败 - ${err}`)
  } else {
   // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res
   // 抓取热点新闻数据
   console.log('返回的res',res)
   hotNews = getHotNews(res);
  }
});

// heerio模块的.load()方法，将HTML document作为参数传入函数，以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素。
// 同时可以使用类似于jQuery中的.each()来遍历元素。此外，还有很多方法，大家可以自行Google/Baidu。
const cheerio = require('cheerio');

let getHotNews = (res) => {
  let hotNews = [];
  // 访问成功，请求http://news.baidu.com/页面所返回的数据会包含在res.text中。
  
  /* 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
     以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
   */
  let $ = cheerio.load(res.text);

  // 找到目标数据所在的页面元素，获取数据
  $('div#pane-news ul li a').each((idx, ele) => {
    // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
    let news = {
      title: $(ele).text(),        // 获取新闻标题
      href: $(ele).attr('href')    // 获取新闻网页链接
    };
    hotNews.push(news)              // 存入最终结果数组
  });
  return hotNews
};

app.get('/list', async (req, res, next) => {
  res.send(hotNews);
});




app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})

// 从表里面插入内容

app.get('/add',(req,res)=>{
  var newsBox = [];
  hotNews.map(current=>{
    console.log('current',current)
    newsBox.push([current.title,current.href])
  })
  console.log('newsBox',newsBox)
  let sql = `INSERT INTO newsBox(newsname,newshref) VALUES ?`;
  db.query(sql,[newsBox],(err,result)=>{
    if(err){
      console.log('err',err);
    }else{
      console.log('result',result);
      res.send('post内容成功');
    }
  })
});