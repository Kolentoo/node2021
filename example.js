const puppeteer = require('puppeteer');
console.log('开始执行')
(async () => {
const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
const page = await browser.newPage();
await page.goto('https://example.com');
await page.screenshot({path: 'example.png'});

console.log('截图完成')
await browser.close();
console.log('浏览器已完毕')
})();