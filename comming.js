

console.log('开始工作');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const schedule = require('node-schedule');


var CronJob = require('cron').CronJob;
new CronJob('0 15 7 * * *', function() {
(async() => {

    // 建立数据库连接
    var mysql = require('mysql');
    var db = mysql.createConnection({
        host: '106.12.132.19',
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



    await page.goto('https://movie.douban.com/cinema/later/shanghai/');
    await page.setViewport({
        width: 1920,
        height: 1080
    });

    const commingBox = await page.evaluate(() => {
        // 获取图片
        const box1 = document.querySelectorAll('#showing-soon .item');
        // 返回获取图片集合的src地址
        return Array.prototype.map.call(box1, item => {
            return {
                id: item.querySelector('.thumb').href.replace(/[^\d]/g, ''),
                href: item.querySelector('.thumb img').src ? item.querySelector('.thumb img').src.replace('webp', 'jpg') : '',
                title: item.querySelector('.intro a').textContent,
                playTime: item.querySelectorAll('.dt')[0].textContent,
                type: item.querySelectorAll('.dt')[1].textContent,
                country: item.querySelectorAll('.dt')[2].textContent,
            }
        })
    });

    var commingData = [];
    commingBox.map(current => {
        commingData.push([current.id, current.href, current.title, current.playTime, current.type,
            current.country
        ]);
    });

    console.log('commingData', commingData);
    // await page.waitFor(2000);
    await browser.close();

    db.query(`use kolento`, [commingData], function(err1, result1) {
        if (err1) {
            console.log('err1', err1);
        } else {
            console.log('result1', result1)
            db.query(`truncate table commingbox`, [commingData], function(err2, result2) {
                if (err2) {
                    console.log('err2', err2);
                } else {
                    console.log('result2', result2)
                    db.query(`INSERT INTO commingbox(id,href,title,playTime,type,country) VALUES ?`, [commingData], function(err3, result3) {
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



})();

}, null, true, 'Asia/Shanghai');