const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// 目标地址
let httpUrl = "http://www.xboxfan.com/topic?id=20";

let dirName = path.join(__dirname,"images");
if(fs.existsSync(dirName)){
  console.log("文件夹已存在");
}else{
  fs.mkdir(dirName,()=>{
      console.log("文件夹创建成功");
  });
}

// 获取数据
async function getData(){
  console.log(111)
  let htmlData = await axios.get(httpUrl);
  console.log('htmlData',htmlData)
  let $ = cheerio.load(htmlData.data);
  console.log(222)
  console.log('$',$)
  $(".container .list-group a img").each(async (index,item)=>{//定位到当前图片元素img
    // console.log('item',item)
    let imgUrl = $(item).attr("src");//获取到当前的img路径
    if(imgUrl){
      let srcFile = path.join(dirName,path.parse(imgUrl).base);
      console.log('srcFile',srcFile)
      let ws = fs.createWriteStream(srcFile);
      axios.get(imgUrl,{responseType:"stream"}).then((res)=>{//请求当前图片
        res.data.pipe(ws);//将请求的图片数据copy到srcFile文件路径中
        res.data.on("close",()=>{
          console.log("图片" + path.parse(imgUrl).base + "已经下载完成");
          ws.close();
        })
      })
    }
  })
}


getData();

