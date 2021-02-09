

console.log('开始工作');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const schedule = require('node-schedule');

(async () => {
    
  // 建立数据库连接
  var mysql = require('mysql');
  var db = mysql.createConnection({
    host     : '106.12.132.19',
    user     : 'root',
    password : '123456',
    port     : 3306,
    database : 'kolento'
  });
  
  db.connect(err=>{
    if(err) throw err;
    console.log('数据库连接成功')
  });

  db.on('error', function (err) {
    console.log('db error监听数据库连接情况', err);
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      db.connect(err=>{
        if(err) throw err;
        console.log('数据库重新连接成功')
      });
    } else {
        throw err;
    }
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
  });


  console.log('运行pupeteer成功');
  
  // schedule.scheduleJob('0 10 15 * * *',async()=>{
    
   
    var pages = 1;
    var dataBox = [];
    let getItems = setInterval(async()=>{
      if(pages<100){
        try{
          const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          });
          var page = await browser.newPage();
          
          console.log('开始执行');
          await page.goto(`http://bgm.tv/anime/browser/tv/?sort=date&page=${pages}`);
          await page.setViewport({
              width:1920,
              height:1080
          });

          console.log('进入下一页');
          pages++;
          console.log('pages',pages);
          const information = await page.evaluate(()=>{
            const items = document.querySelectorAll('#browserItemList .item');
            return Array.prototype.map.call(items,item=>{
              return{
                id:item.querySelector('.subjectCover')?item.querySelector('.subjectCover').href.replace(/[^\d]/g,''):'暂无信息',
                title:item.querySelector('h3 .l')?item.querySelector('h3 .l').textContent:'暂无信息',
                originName:item.querySelector('.inner h3 .grey')?item.querySelector('.inner h3 .grey').textContent:'暂无信息',
                info:item.querySelector('.inner .info')?item.querySelector('.inner .info').textContent:'暂无信息',
                score:item.querySelector('.fade')?item.querySelector('.fade').textContent:'0',
                src:item.querySelector('.image img')?item.querySelector('.image img').src:'暂无信息',
                num:item.querySelector('.inner .tip_j')?item.querySelector('.inner .tip_j').textContent:'暂无信息',
                hot:item.querySelector('.inner .tip_j')?item.querySelector('.inner .tip_j').textContent.replace(/[^\d]/g,''):'0',
              }
            })
          });

          information.map(current=>{
            if(current.title!='暂无信息'&&current.src!='暂无信息'){
              dataBox.push([current.id,current.title,current.originName,current.info,current.score,current.src,current.num
              ,current.hot]);
            }
          });
          await browser.close();
          
        }
        catch(err){
          console.log('出现错误',err);
        }
      }else{
        clearInterval(getItems);
        console.log('全部数据准备完毕，开始插入数据库');

        console.log('dataBox',dataBox)
        
        db.query(`use kolento`,[dataBox],function(err1,result1){
          if(err1){
            console.log('err1',err1);
          }else{
            console.log('result1',result1)
            db.query(`truncate table bangumi`,[dataBox],function(err2,result2){
              if(err2){
                console.log('err2',err2);
              }else{
                console.log('result2',result2)
                db.query(`INSERT INTO bangumi(id,title,originName,info,score,src,num,hot) VALUES ?`,[dataBox],function(err3,result3){
                  if(err3){
                    console.log('err3',err3);
                  }else{
                    console.log('result3',result3);
                  }
                })
              }
            })
          }
        });  

        console.log('结束工作');
      }
    },30000)
  // }); 


    


})();







