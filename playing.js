// 执行爬虫抓取近期动漫

// cdn购买腾讯云
// https://cloud.tencent.com/act/pro/CDN-?fromSource=gwzcw.3687932.3687932.3687932&utm_medium=cpc&utm_id=gwzcw.3687932.3687932.3687932

console.log('开始工作');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const schedule = require('node-schedule');



(async() => {

    // 建立数据库连接
    var mysql = require('mysql');
    var db = mysql.createConnection({
        host: '121.5.124.135',
        user: 'root',
        password: '123456',
        port: 3306,
        database: 'kolento'
    });

    db.connect(err => {
        if (err) throw err;
        console.log('数据库连接成功')
    });

    app.all("*", function(req, res, next) {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin", "*");
        //允许的header类型
        res.header("Access-Control-Allow-Headers", "content-type");
        //跨域允许的请求方式 
        res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
        if (req.method.toLowerCase() == 'options')
            res.send(200); //让options尝试请求快速结束
        else
            next();
    });

    // let server = app.listen(8888, function () {
    //   let host = server.address().address;
    //   let port = server.address().port;
    //   console.log('Your App is running', host, port);
    // });

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // puppeteerOptions: {
        //   ignoreHTTPSErrors: true,
        //   dumpio: false,
        // }
    });
    console.log('运行pupeteer成功');


    // 进入登录页面
    console.log('进入登录页');
    var page = await browser.newPage();
    await page.goto('https://accounts.douban.com/passport/login?source=movie');
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    await page.waitFor(2000);
    await page.click('.account-tab-account');
    await page.evaluate(() => {
        console.log('清空账号密码');
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        console.log('输入账号密码');
        document.getElementById("username").value = '18019781126';
        document.getElementById("password").value = "haojiyou123!";

    });
    await page.click('.account-tabcon-start .btn-account');
    console.log('登录成功')



    // 近期热门动画
    // await page.goto('https://movie.douban.com/tv/#!type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=recommend&page_limit=20&page_start=0');
    // 全部动漫列表

    // 每天2点获取最新动漫信息列表
    // schedule.scheduleJob('0 10 15 * * *',async()=>{
    //   console.log('开始执行定时任务');
    //   await page.goto('https://movie.douban.com/tag/#/?sort=U&range=0,10&tags=%E5%8A%A8%E6%BC%AB');
    //   await page.setViewport({
    //       width:1920,
    //       height:1080
    //   });

    //   // 点击加载更多
    //   var times = 0;
    //   var flag = 'start';

    //   await page.click('.th-list');

    //   let getItems = setInterval(async()=>{
    //     if(times<50){
    //       try{
    //         console.log('开始等待节点生成')
    //         await page.waitForSelector('.more:not(:empty)', { timeout: 120000 },{ visible: true });
    //         await page.click('.more');
    //         console.log('加载更多');
    //         times++;
    //         flag='start';
    //         console.log('times',times);
    //       }
    //       catch(err){
    //         console.log('出现错误',err);
    //       }
    //     }else{
    //       console.log('加载完毕');
    //       flag='finished';
    //       clearInterval(getItems);
    //       setTimeout(async() => {
    //         // 等待页面搜索加载完成
    //         // page.on('load',async()=>{

    //         // 获取页面的图片列表
    //         const information = await page.evaluate(()=>{
    //           // 获取图片
    //           const items = document.querySelectorAll('.item');
    //           // 返回获取图片集合的src地址
    //           return Array.prototype.map.call(items,item=>{
    //             return{
    //               title:item.querySelector('.title')?item.querySelector('.title').textContent:'未知',
    //               score:item.querySelector('.rating')?item.querySelector('.rating').textContent:'0',
    //               src:item.querySelector('img')?item.querySelector('img').src:'',
    //               href:item?item.href:'',
    //               id:item.querySelector('.poster')?item.querySelector('.poster').dataset.id:'未知id',
    //               director:item.querySelectorAll('.cast span')[0]?item.querySelectorAll('.cast span')[0].textContent:'暂无信息',
    //               actor:item.querySelectorAll('.cast span')[1]?item.querySelectorAll('.cast span')[1].textContent:'暂无信息',
    //             }
    //           })
    //         });


    //         // })

    //         // 从表里面插入内容
    //         let dataBox = [];
    //         //详情页面的url集合
    //         let html = [];
    //         information.map(current=>{
    //           dataBox.push([current.title,current.score,current.src,current.href,current.id,current.director,current.actor]);
    //           html.push({
    //             href:current.href,
    //             id:current.id
    //           })
    //         });

    //         // 进入列表对应的详情页逐个爬取简介 由于过于频繁导致ip异常暂不启用
    //         // let descBox = [];
    //         // for (let i = 0; i < html.length; i++) {
    //         //   await page.goto(html[i].href,{
    //         //     waitUntil: [
    //         //       'domcontentloaded',  //等待 “domcontentloaded” 事件触发
    //         //       'networkidle0'       //在 500ms 内网络连接个数不超过 0 个
    //         //     ]
    //         //   });
    //         //   await page.waitForSelector('#link-report', { timeout: 30000 });

    //         //   const result = await page.evaluate(() => {
    //         //     const desc = document.querySelector('#link-report span').textContent;
    //         //     return desc;
    //         //   });
    //         //   descBox.push({
    //         //     desc:result,
    //         //     id:html[i].id
    //         //   });
    //         //   detailBox.push({

    //         //   })
    //         //   console.log('descBox',descBox);

    //         // }
    //         // 将爬取的动漫list数据存入数据库

    //         db.query(`use kolento`,[dataBox],function(err1,result1){
    //           if(err1){
    //             console.log('err1',err1);
    //           }else{
    //             console.log('result1',result1)
    //             db.query(`truncate table animebox`,[dataBox],function(err2,result2){
    //               if(err2){
    //                 console.log('err2',err2);
    //               }else{
    //                 console.log('result2',result2)
    //                 db.query(`INSERT INTO animebox(title,score,src,href,id,director,actor) VALUES ?`,[dataBox],function(err3,result3){
    //                   if(err3){
    //                     console.log('err3',err3);
    //                   }else{
    //                     console.log('result3',result3);
    //                   }
    //                 })
    //               }
    //             })
    //           }
    //         });

    //         await page.waitFor(2000);
    //         await browser.close();
    //         console.log('结束工作');


    //       }, 30000);
    //     }
    //   },30000)
    // }); 


    // 获取正在热映电影信息 每天4点更新
    schedule.scheduleJob('0 23 16 * * *', async() => {
        await page.goto('https://movie.douban.com/cinema/nowplaying/shanghai/');
        await page.setViewport({
            width: 1920,
            height: 1080
        });
        const moreMovie = await page.$("#nowplaying .more");
        if (moreMovie) {
            await page.click('.more');
        }

        const movieBox1 = await page.evaluate(() => {
            // 获取图片
            const box1 = document.querySelectorAll('.lists .list-item');
            // 返回获取图片集合的src地址
            return Array.prototype.map.call(box1, item => {
                return {
                    id: item.dataset.subject,
                    region: item.dataset.region,
                    duration: item.dataset.duration,
                    director: item.dataset.director,
                    actors: item.dataset.actors,
                    release: item.dataset.release ? item.dataset.release : null,
                    comment: item.dataset.votecount ? item.dataset.votecount : 0,
                    href: item.querySelector('img').src ? item.querySelector('img').src.replace('webp', 'jpg') : '',
                    title: item.dataset.title,
                    score: item.dataset.score ? item.dataset.score : null,
                }
            })
        });

        var movieData1 = [];
        movieBox1.map(current => {
            movieData1.push([current.id, current.region, current.duration, current.director, current.actors,
                current.href, current.title, current.score
            ]);
        });

        console.log('movieData1', movieData1);
        // await page.waitFor(2000);
        await browser.close();

        db.query(`use kolento`, [movieData1], function(err1, result1) {
            if (err1) {
                console.log('err1', err1);
            } else {
                console.log('result1', result1)
                db.query(`truncate table playingbox`, [movieData1], function(err2, result2) {
                    if (err2) {
                        console.log('err2', err2);
                    } else {
                        console.log('result2', result2)
                        db.query(`INSERT INTO playingbox(id,region,duration,director,actors,href,title,score) VALUES ?`, [movieData1], function(err3, result3) {
                            if (err3) {
                                console.log('err3', err3);
                            } else {
                                console.log('result3', result3);
                            }
                        })
                    }
                })
            }
        })
    });

    // 获取即将上映电影信息 每天5点更新
    // schedule.scheduleJob('0 0 5 * * *', async() => {
    //     await page.goto('https://movie.douban.com/cinema/later/shanghai/');
    //     await page.setViewport({
    //         width: 1920,
    //         height: 1080
    //     });

    //     const commingBox = await page.evaluate(() => {
    //         // 获取图片
    //         const box1 = document.querySelectorAll('#showing-soon .item');
    //         // 返回获取图片集合的src地址
    //         return Array.prototype.map.call(box1, item => {
    //             return {
    //                 id: item.querySelector('.thumb').href.replace(/[^\d]/g, ''),
    //                 href: item.querySelector('.thumb img').src ? item.querySelector('.thumb img').src.replace('webp', 'jpg') : '',
    //                 title: item.querySelector('.intro a').textContent,
    //                 playTime: item.querySelectorAll('.dt')[0].textContent,
    //                 type: item.querySelectorAll('.dt')[1].textContent,
    //                 country: item.querySelectorAll('.dt')[2].textContent,
    //             }
    //         })
    //     });

    //     var commingData = [];
    //     commingBox.map(current => {
    //         commingData.push([current.id, current.href, current.title, current.playTime, current.type,
    //             current.country
    //         ]);
    //     });

    //     console.log('commingData', commingData);
    //     // await page.waitFor(2000);
    //     await browser.close();

    //     db.query(`use kolento`, [commingData], function(err1, result1) {
    //         if (err1) {
    //             console.log('err1', err1);
    //         } else {
    //             console.log('result1', result1)
    //             db.query(`truncate table commingbox`, [commingData], function(err2, result2) {
    //                 if (err2) {
    //                     console.log('err2', err2);
    //                 } else {
    //                     console.log('result2', result2)
    //                     db.query(`INSERT INTO commingbox(id,href,title,playTime,type,country) VALUES ?`, [commingData], function(err3, result3) {
    //                         if (err3) {
    //                             console.log('err3', err3);
    //                         } else {
    //                             console.log('result3', result3);
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // });



})();