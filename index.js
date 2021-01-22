// 接口转发
var express = require('express');
var request = require('request');

var app = express();

// 热门动画
app.use('/anime/hot/:start/:end',function(req,res){
  var url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=recommend&page_limit=${req.params.end}=&page_start=${req.params.start}`;
  console.log('req',req);
  request({
    url:url,
    method:'GET',
    json:true
  },function(_err,_res,_resBody){
    res.json(_resBody);
  })
});

// 动画详情
app.use('/anime/detail/:animeId',function(req,res){
  var url = `https://m.douban.com/rexxar/api/v2/tv/${req.params.animeId}?ck=&for_mobile=1`;
  console.log('req',req);
  request({
    url:url,
    method:'GET',
    json:true
  },function(_err,_res,_resBody){
    res.json(_resBody);
  })
})

// 动画评论
app.use('/anime/comment/:animdId/:start/:end',function(req,res){
  var url = `https://m.douban.com/rexxar/api/v2/tv/${req.params.animeId}/interests?count=${req.params.end}&order_by=hot&start=${req.params.start}&ck=&for_mobile=1`;
  console.log('req',req);
  request({
    url:url,
    method:'GET',
    json:true
  },function(_err,_res,_resBody){
    res.json(_resBody);
  })
})


var server = app.listen(8888,()=>{
  console.log('running');
});




