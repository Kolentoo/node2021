var c = new Crawler({
  maxConnections : 10,
 
  // 两次请求之间将闲置1000ms
  rateLimit: 1000,
  // 在每个请求处理完毕后将调用此回调函数
  callback : function (error, res, done) {
   if(error){
    console.log(error);
   }else{
    var $ = res.$;
    // $ 默认为 Cheerio 解析器
    // 它是核心jQuery的精简实现，可以按照jQuery选择器语法快速提取DOM元素
    console.log($("title").text());
   }
   done();
  }
 });

 c.queue('http://www.baidu.com');