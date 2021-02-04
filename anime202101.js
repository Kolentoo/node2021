// 2021新番数据
//https://www.acgmh.com/29488.html


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
    console.log('数据库连接成功');
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


  const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  console.log('运行pupeteer成功');
  const page = await browser.newPage();

  await page.goto('https://www.acgmh.com/29488.html');

  setTimeout(async() => {
    // 等待页面搜索加载完成
    // page.on('load',async()=>{

    // 获取页面的图片列表
    const information = await page.evaluate(()=>{
      // 获取图片
      const items = document.querySelector('#content-innerText');
      // 返回获取图片集合的src地址
      return{
        time:'2021-01',
        content:items.innerHTML
      }
    });

    console.log('information',information);

    // })


    db.query(`use kolento`,information,function(err1,result1){
      if(err1){
        console.log('err1',err1);
      }else{
        console.log('result1',result1)
        db.query(`truncate table animeList`,information,function(err2,result2){
          if(err2){
            console.log('err2',err2);
          }else{
            console.log('result2',result2)
            db.query(`INSERT INTO animeList SET ?;`,information,function(err3,result3){
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
    
    await page.waitFor(2000);
    await browser.close();
    console.log('结束工作');

    
  }, 5000);

    


})();







