// 将整个操作放置在一个闭包的异步函数中，以便于进行异步操作
(async () => {

  // 爬虫工具,内置浏览器模拟用户操作
  const puppeteer = require('puppeteer');

  //启动浏览器
  const browers = await puppeteer.launch({
    headless:false, // 默认为true，设为false时，可以显示可视化浏览器界面
  })
  //启动新页面
  var page = await browers.newPage()
  //链接网址
  let url = 'https://movie.douban.com/tv/#!type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=recommend&page_limit=20&page_start=0';
  await page.goto(url);

  // 等待元素加载完成('加载更多按钮元素')
  await page.waitForSelector('#wrapper .list-wp .more');

  // 当加载更多的按钮出现时，模拟点击操作
  await page.click('#wrapper .list-wp .more');

  const result = await page.evaluate(() => {
    // 拿到页面上的jQuery
    var $ = window.$;
    // 在这里进行熟悉的 DOM 操作
    // Do something
    // page.$$eval('#wrapper .list-wp .list .item', ele => {
    //   try {
    //     console.log('ele',ele)
    //     for (let i = 0; i < ele.length; i++) {
    //       let n = ele[i].querySelector('p').textContent
    //       console.log('n',n)
    //     }
    //   } catch (error) {
    //     return false
    //   }
    // });
  });

  // 关闭浏览器
  brower.close();

  // 6. 对结果进行处理
  console.log(result);

})();

// 一种是$eval，相当于js里的document.querySelector，只爬取符合的第一个元素；
// 另一种为$$eval，相当于js里的document.querySelectorAll，爬取所有符合的元素；

// const anime = page.$$eval('#wrapper .list-wp .list a', ele => {
//   try {
//     for (let i = 0; i < ele.length; i++) {
//       let n = ele[i].querySelector('p').textContent
//       if(n.includes('进击的巨人')){
//         return true
//       } else {
//         return false
//       }
//     }
//   } catch (error) {
//     return false
//   }
// });

