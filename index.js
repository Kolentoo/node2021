// 接口转发
var express = require('express');
var request = require('request');

var app = express();
app.use('/',function(req,res){
  var url = 'https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BB%BC%E8%89%BA&sort=rank&page_limit=20&page_start=0';
  console.log('url',req.url);
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
})