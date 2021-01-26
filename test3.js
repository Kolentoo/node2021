const puppeteer = require('puppeteer');

(async () => {
    // 启动浏览器
    const browser = await puppeteer.launch({
        headless: false, // 默认是无头模式，这里为了示范所以使用正常模式
    })

    // 控制浏览器打开新标签页面
    const page = await browser.newPage()
    // 在新标签中打开要爬取的网页
    await page.goto('https://image.baidu.com/')
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
    await page.click('.s_btn');
    console.log('搜索列表哦');

    // 等待页面搜索加载完成
    page.on('load',async()=>{
        console.log('页面加载完成');

        // 获取页面的图片列表
        const srcs = await page.evaluate(()=>{
            // 获取图片
            const images = document.querySelectorAll('img.main_img');
            // 返回获取图片集合的src地址
            return Array.prototype.map.call(images,img=>{
                img.src;
            })
        })
        console.log(`${src.length} images 下载ing`);

        srcs.forEach(src=>{
            console.log('src',src);
        });

        await browser.close();
    })
})()