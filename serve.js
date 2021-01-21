// 跨域问题，当你无法操作后台是否可以跨域的时候
var http = require('http');
var https = require('https');
var server = http.createServer();
var fs = require('fs');
server.listen('8080');
var url = require('url');

server.on('request',(request,response)=>{
    var path = url.parse(request.url);
    if(path.pathname == '/') {
        fs.readFile('./html/coress.html',(err,info)=>{
            response.write(info);
            response.end();
        })
    } else if(path.pathname.startsWith('/v4')) { //服务器转发请求
     //创建请求
      var request =  https.request({
            hostname:'m.maizuo.com',
            port:'443',
            path:path.path,
            method:'GET'
        },(resp)=>{
            let results = '';
            //监听接受数据
            resp.on('data',(dataObj)=>{
                results += dataObj;
            })
         //监听关闭
            resp.on('end',()=>{
                response.write(results);
                response.end();
            })
        })
        // 发送请求
        request.end();
    }
})