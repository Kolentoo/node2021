var express = require("express");
var app = express();
var router = express.Router();
var request = require('request');

// router.get('/', function (req, res, next) {
//     var url = 'http://www.httpbin.org/get';
//     request(url, function (error, response, body) {
//         if (!error && response.statusCode === 200) {
//             var data = JSON.parse(body);
//             res.send(data);
//         } else {
//             res.send('{error:404}');
//         }
//     });
// });

// 热门动画
app.get('/anime/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=recommend&page_limit=20&page_start=0` 
  let arr;
  axios.get(url,{
  }).then(json=>{
    arr = json.data
  }).then(()=>{
    res.json(arr)
  })
});


app.use('/', router);




