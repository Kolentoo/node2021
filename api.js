

console.log('开始工作');
const puppeteer = require('puppeteer');

const express = require('express');
const app = express();

(async () => {

    // 建立数据库连接
    var mysql = require('mysql');
    var db = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'kolento123!',
      port     : 3306,
      database : 'kolento'
    });
    
    db.connect(err=>{
      if(err) throw err;
      console.log('数据库连接成功')
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

    let server = app.listen(8888, function () {
      let host = server.address().address;
      let port = server.address().port;
      console.log('Your App is running', host, port);
    });


    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();


    await page.goto('https://movie.douban.com/tv/#!type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=recommend&page_limit=20&page_start=0');
    await page.setViewport({
        width:1920,
        height:1080
    });

    // 点击加载更多
    let times = 0;
    var flag = 'start';
    let getItems = setInterval(async()=>{
      if(times<=0){
        await page.click('.more');
        console.log('加载更多');
        times++;
        flag='start';
      }else{
        flag='finished';
      }
    },2000)
    // await page.click('.more');
    // console.log('加载更多');


    // page.on('load',async()=>{
    // // 点击加载更多
    // await page.click('.more');
    // console.log('加载更多');
    // })

    
    setTimeout(async() => {
      // 等待页面搜索加载完成
      // page.on('load',async()=>{
        console.log('页面加载完成');

        // 获取页面的图片列表
        const information = await page.evaluate(()=>{
            // 获取图片
            console.log('开始获取节点');
            const items = document.querySelectorAll('.item');
            console.log('items',items);
            // 返回获取图片集合的src地址
            return Array.prototype.map.call(items,item=>{
              return{
                title:item.querySelector('p').textContent.replace(/\s*/g,""),
                score:item.querySelector('strong').innerHTML,
                src:item.querySelector('img').src,
                href:item.href,
              }
            })
        });

        // console.log('information',information);

      // })

      // 从表里面插入内容
      let dataBox = [];
      //详情页面的url集合
      let html = [];
      information.map(current=>{
        dataBox.push([current.title,current.score,current.src]);
        html.push(current.href)
      });

      
      for (let i = 0; i < html.length; i++) {
        await page.goto(html[i], { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('.article', { timeout: 5000 });

        const result = await page.evaluate(() => {
          const article = document.querySelector('.article');
          console.log('article',article);
          return article;
        });
        console.log('result',result)

        // const result = await page.evaluate(() => {
        //   console.log(1)
        //   const article = document.querySelector('.article');
        //   console.log('article',article);
        //   return article;
          // const desc = arr.querySelector('#link-report span').textContent;
          // console.log('arr',arr)
          // return arr.map(v => {
          //   return {
          //     naturalWidth: v.naturalWidth,
          //     naturalHeight: v.naturalHeight,
          //     width: v.width,
          //     height: v.height,
          //   };
          // });
        // });
        // return result;
        // arr = [ ...arr, ...doms ];
      }
        // app.get('/add',(req,res)=>{
        //   let sql = `INSERT INTO animeList(title,score,src) VALUES ?`;
        //   db.query(sql,[dataBox],(err,result)=>{
        //     if(err){
        //       console.log('err',err);
        //     }else{
        //       console.log('result',result);
        //       res.send('post内容成功');
        //     }
        //   })
        // });

        // await page.evaluate(()=>{
        //   window.location.href='http://127.0.0.1:8888/add'
        // })
        


      console.log('结束工作');
    }, 10000);

})();





