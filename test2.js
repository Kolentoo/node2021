const puppeteer = require('puppeteer');

(async () => {
    // 启动浏览器
    const browser = await puppeteer.launch({
        headless: false, // 默认是无头模式，这里为了示范所以使用正常模式
    })

    // 控制浏览器打开新标签页面
    const page = await browser.newPage()
    // 在新标签中打开要爬取的网页
    await page.goto('https://movie.douban.com/tv/#!type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=recommend&page_limit=20&page_start=0')

    // // 等待元素加载完成('加载更多按钮元素')
    // await page.waitForSelector('#wrapper .list-wp .more');

    // // 当加载更多的按钮出现时，模拟点击操作
    // await page.click('#wrapper .list-wp .more');

    // 使用evaluate方法在浏览器中执行传入函数（完全的浏览器环境，所以函数内可以直接使用window、document等所有对象和方法）
    console.log('进入方法前')
    let data = await page.evaluate(() => {
        console.log('开始')
        let list = document.querySelectorAll('#wrapper .list-wp .item p');
        console.log('list',list)
        let res = []
        for (let i = 0; i < list.length; i++) {
          res.push({
              name: list[i].text()
          })
        }
        return res;
    })
    console.log(data);
})()