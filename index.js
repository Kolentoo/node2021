// 接口转发
var express = require('express');
var request = require('request');

var app = express();


// 分类动漫列表
app.use('/anime/list/:start',function(req,res){
  var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}`;
  console.log('req',req);
  request({
    url:url,
    method:'GET',
    json:true
  },function(_err,_res,_resBody){
    res.json(_resBody);
  })
});

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

// 动画简介
app.use('/anime/:id',function(req,res){
  var url = `https://movie.douban.com/j/subject_abstract?subject_id=${req.params.id}`;
  console.log('req',req);
  request({
    url:url,
    method:'GET',
    json:true
  },function(_err,_res,_resBody){
    res.json(_resBody);
  })
});



var server = app.listen(8888,()=>{
  console.log('running');
});




