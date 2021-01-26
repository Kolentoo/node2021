// demo:
// 爬取百度图片网站中，搜索 狗 的图片
// 1.进入百度图片网站页面
// 2.扩大浏览器视图
// 3.focus到输入框
// 4.输入 狗 
// 5.进行搜索

console.log(111)
const path = require('path');
const puppeteer = require('puppeteer');
const srcToImg = require('./util/img');
console.log(222);

(async () => {
    console.log(333)
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await page.goto('https://image.baidu.com/');
    console.log('go to baidu');

    await page.setViewport({
        width:1920,
        height:1080
    });
    console.log('reset viewport');

    // focus到输入框并
    await page.focus('#kw');
    // 输入字符
    await page.keyboard.sendCharacter('狗');
    // 点击搜索
    await page.click('.s_newBtn');
    console.log('搜索列表哦');

    // 等待页面搜索加载完成
    page.on('load',async()=>{
        console.log('页面加载完成');

        // 获取页面的图片列表
        const srcs = await page.evaluate(()=>{
            // 获取图片
            console.log('开始获取节点');
            const images = document.querySelectorAll('img.main_img');
            console.log('images',images)
            // 返回获取图片集合的src地址
            return Array.prototype.map.call(images,img=>img.src)
        })
        console.log('srcs',srcs)
        console.log(`${srcs.length} images 下载ing`);

        await srcs.forEach(src=>{
            // 打印图片的src
            // console.log('src',src);
            let savePath = path.resolve(__dirname,'./images/');
            srcToImg(src,savePath);
        });

        // await browser.close();
    })
})();



console.log('end');