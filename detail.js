
//  详情页
//  https://bangumi.tv/subject/297954



console.log('开始工作');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const schedule = require('node-schedule');

(async () => {
    
  // 建立数据库连接
  var mysql = require('mysql');

  const db = mysql.createPool({
    host     : '106.12.132.19',
    user     : 'root',
    password : '123456',
    port     : 3306,
    database : 'kolento'
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


  var idBox = [];
  var dataBox = [];
  var dataResult = [];
  console.log('运行pupeteer成功');
  db.getConnection((err, conn) => {
    // distinct避免重复的数据
    let sql = `select distinct id from bangumi limit 63,3`;
    // 从连接池中获取一个连接
    conn.query(sql, (err2, res) => {
    if (err2) {
            console.log('查询数据库失败');
        } else {
            // console.log('res',res);
            idBox=res;
            conn.release();

            // console.log('idBox',idBox);

            let end = idBox.length;
            let times = 0;
            // console.log('end',end);
            // console.log('idBox[times].id',idBox[times].id)
            let timeBox = setInterval(async()=>{
              if(times<end){
                
                const browser = await puppeteer.launch({
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                });
                var page = await browser.newPage();
                
                console.log('开始执行');
                await page.goto(`https://bangumi.tv/subject/${idBox[times].id}`,{
                  'timeout': 1000*90
                });


                await page.setViewport({
                    width:1920,
                    height:1080
                });

                const information = await page.evaluate(()=>{
                  const item = document.querySelector('#subject_summary');
                  return {
                    id:document.querySelector('.subject_prg a')?document.querySelector('.subject_prg a').href.replace(/[^\d]/g,''):'未知',
                    detail:item?item.textContent:'暂无介绍'
                  }
                });

                // console.log('information',information);
                dataBox=[...dataBox,information];
                // console.log('dataBox',dataBox);
                times++;
                console.log('times',times);
                await browser.close();
                console.log('本轮完成');

              }else{
                clearInterval(timeBox);
                console.log('已经满足条件跳出循环 开始插入数据库');
                dataBox.map(current=>{
                  if(current.id!='未知'){
                    dataResult.push([current.id,current.detail]);
                  }
                  
                });

                db.query(`use kolento`,[dataResult],function(err1,result1){
                  if(err1){
                    console.log('err1',err1);
                  }else{
                    console.log('result1',result1)
                    db.query(`INSERT INTO content(id,content) VALUES ?`,[dataResult],function(err3,result3){
                      if(err3){
                        console.log('err3',err3);
                      }else{
                        console.log('result3',result3);
                      }
                    })
                  }
                });  
              }
            },30000)

        }
    })

  });

    


})();







