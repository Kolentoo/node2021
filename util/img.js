module.exports = (src,dir)=>{
    console.log(src);
    // url转img
    // 引入需要发送请求的模块，并且根据url的头部判断用哪一个
    const http = require('http');
    const https = require('https');
    const fs = require('fs');
    const path = require('path');
    const {promisify} = require('util');//用于把回调改成同步返回promise的工具
    const writeFile = promisify(fs.writeFile); //用于写入文件


    const urlToImg = promisify((url,dir,callback)=>{
        const mod = /^https:/.test(url)?https:http;
        const ext = path.extname(url);//提取扩展名
        const file = path.join(dir,`${Date.now()}${ext}`);//用时间戳改文件名
        mod.get(url,res=>{
            res.pipe(fs.createWriteStream(file)).on('finish',()=>{
                callback();
                console.log('file',file);
            });
        });
    })

    // // base64转img
    // const base64ToImg = async function(base64Str,dir){
    //     // 获取文件名和内容content
    //     // 以data:开头
    //     const matches = base64Str.match(/^data:(.+?);base64,(.+)$/);

    //     try{
    //     const ext = matches[1].split('/')[1].replace('jpeg','jpg');
    //     const file = path.join(dir,`${Date.now()}.${ext}`);

    //     await writeFile(file,matches[2],'base64');
    //     console.log('file',file);
    //     }catch(ex){
    //         console.log('非法base64');
    //     }
    // }
}

