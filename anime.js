// 2021新番数据
//https://mzh.moegirl.org.cn/%E6%97%A5%E6%9C%AC2021%E5%B9%B4%E5%86%AC%E5%AD%A3%E5%8A%A8%E7%94%BB
// 2020年秋季
// https://mzh.moegirl.org.cn/%E6%97%A5%E6%9C%AC2020%E5%B9%B4%E7%A7%8B%E5%AD%A3%E5%8A%A8%E7%94%BB
// 2020夏季
// https://mzh.moegirl.org.cn/%E6%97%A5%E6%9C%AC2020%E5%B9%B4%E5%A4%8F%E5%AD%A3%E5%8A%A8%E7%94%BB
// 2020春
// https://mzh.moegirl.org.cn/%E6%97%A5%E6%9C%AC2020%E5%B9%B4%E6%98%A5%E5%AD%A3%E5%8A%A8%E7%94%BB
// 2020冬
// https://mzh.moegirl.org.cn/%E6%97%A5%E6%9C%AC2020%E5%B9%B4%E5%86%AC%E5%AD%A3%E5%8A%A8%E7%94%BB


console.log('开始工作');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();



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

  await page.goto('https://mzh.moegirl.org.cn/%E6%97%A5%E6%9C%AC2020%E5%B9%B4%E5%86%AC%E5%AD%A3%E5%8A%A8%E7%94%BB');
  // setTimeout(async() => {
    // 等待页面搜索加载完成
    // page.on('load',async()=>{

    const information = await page.evaluate(()=>{
      // 获取图片
      const items = document.querySelectorAll('.mw-parser-output .collapsible-block');
      // 返回获取图片集合的src地址
      return Array.prototype.map.call(items,(item,index)=>{
        // 排除标题和结尾推荐
        if(index!=0&&items.length-1!==index){
          return{
            title:item.querySelectorAll('dl dd')[0]&&item.querySelectorAll('dl dd')[0].querySelector('a')?item.querySelectorAll('dl dd')[0].querySelector('a').textContent:'未知',
            src:item.querySelector('.lazy-image-placeholder')?item.querySelector('.lazy-image-placeholder').dataset.src:'未知',
            playTime:item.querySelectorAll('dl dd')[1]?item.querySelectorAll('dl dd')[1].textContent:'未知',
            animeDesc:item.querySelector('.poem p')?item.querySelector('.poem p').textContent:'未知',
            animeYear:'2020',
            animeMonth:'1'
          }
        }
      })
    });

    // 从表里面插入内容
    let dataBox = [];
    //详情页面的url集合
    information.map(current=>{
      if(current!=null){
        if(current.title!='未知'&&current.src!=='未知')
        dataBox.push([current.title,current.src,current.playTime,current.animeDesc,current.animeYear,current.animeMonth]);
      }
    });

    console.log('dataBox',dataBox);


    db.query(`use kolento`,[dataBox],function(err1,result1){
      if(err1){
        console.log('err1',err1);
      }else{
        console.log('result1',result1)
        db.query(`insert into totalAnime(title,src,playTime,animeDesc,animeYear,animeMonth) VALUES ?`,[dataBox],function(err3,result3){
          if(err3){
            console.log('err3',err3);
          }else{
            console.log('result3',result3);
          }
        })
        // db.query(`truncate table totalAnime`,[dataBox],function(err2,result2){
        //   if(err2){
        //     console.log('err2',err2);
        //   }else{
        //     console.log('result2',result2)
        //     db.query(`insert into totalAnime(title,src,playTime,animeDesc,animeYear,animeMonth) VALUES ?`,[dataBox],function(err3,result3){
        //       if(err3){
        //         console.log('err3',err3);
        //       }else{
        //         console.log('result3',result3);
        //       }
        //     })
        //   }
        // })
      }
    });
    
    await page.waitFor(2000);
    await browser.close();
    console.log('结束工作');

    
  // }, 5000);

    


})();







