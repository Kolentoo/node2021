// 用于demo测试
console.log('进入kolento.js');

const express = require('express');
const app = express();



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
})

// 开启服务
app.listen(3333,()=>{
  console.log('服务器监听在3333端口')
});

// 创建数据库
// app.get('/createdb',(req,res)=>{
//   let sql = 'CREATE DATABASE Kolento';
//   db.query(sql,(err,result)=>{
//     if(err){
//       console.log('err',err);
//     }else{
//       console.log('result',result);
//       res.send('database create success');
//     }
//   })
// })

// 创建表
// app.get('/createTable',(req,res)=>{
//   let sql = 'CREATE TABLE content(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(ID))';
//   db.query(sql,(err,result)=>{
//     if(err){
//       console.log('err',err);
//     }else{
//       console.log('result',result);
//       res.send('content表创建成功');
//     }
//   })
// })

// 从表里面插入内容
app.get('/add',(req,res)=>{
  let post = {title:'标题信息3',body:'内容信息3'};
  let sql = "INSERT INTO animeBox SET ?";
  db.query(sql,post,(err,result)=>{
    if(err){
      console.log('err',err);
    }else{
      console.log('result',result);
      res.send('post内容成功');
    }
  })
});

// 从表中查询数据
app.get('/getContent',(req,res)=>{
  let sql = 'SELECT * FROM animeBox';
  db.query(sql,(err,result)=>{
    if(err){
      console.log('err',err);
    }else{
      console.log('result',result);
      // res.send('查询成功');
      let final = {'flag':'success',result}
      res.json(final);
    }
  })
})

// 根据id查询内容
app.get('/getContent/:id',(req,res)=>{
  let sql = `SELECT * FROM animeBox WHERE id = ${req.params.id}`;
  db.query(sql,(err,result)=>{
    if(err){
      console.log('err',err);
    }else{
      console.log('result',result);
      // res.send('查询成功');
      let final = {'flag':'success',result}
      res.json(final);
    }
  })
})

// 根据id更数据
app.get('/update/:id',(req,res)=>{
  console.log('req的内容',req.params);
  console.log('req的内容',req.query);
  let sql = `UPDATE animeBox SET title = '${req.query.title}' WHERE id = ${req.params.id}`;
  db.query(sql,(err,result)=>{
    if(err){
      console.log('err',err);
    }else{
      console.log('result',result);
      // res.send('查询成功');
      res.send('update'+req.params.id+'ok')
    }
  })
})

// 删除数据
app.get('/del',(req,res)=>{
  let sql = `DELETE FROM animeBox WHERE id = ${req.query.id}`;
  db.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log('result',result);
      res.send('del ok')
    }
  })
})

 



// 使用nodejs执行http请求
// 1.get请求
// const https = require('https');
// const options = {
//   hostname:'nodejs.cn',
//   port:443,
//   path:'/todos',
//   methods:'get'
// }

// const req = https.request(options,res=>{
//   console.log('状态码',res.statusCode);

//   res.on('data',d=>{
//     process.stdout.write(d)
//   })
// })

// req.on('error',error=>{
//   console.error(error)
// })

// req.end();

// post请求
// const  https = require('https');
// const data = JSON.stringify({todo:'dosomething'});

// const options = {
//   hostname:'nodejs.cn',
//   port:443,
//   path:'todos',
//   method:'post',
//   headers:{
//     'Content-Type':'application/json',
//     'Content-Length':data.length
//   }
// }

// const req = https.request(options,res=>{
//   console.log('res.statusCode',res.statusCode);

//   res.on('data',d=>{
//     process.stdout.write(d);
//   })
// })

// req.on('error',error=>{
//   console.log(error)
// })

// req.write(data);
// req.end();

// console.log('文件写入测试');

// const fs = require('fs');
// const content = '测试结尾内容';

// fs.writeFile('./kolento.txt',content,{ flag: 'a+' },err=>{
//   if(err){
//     console.error('错误信息',err);
//     return;
//   }
// })

// console.log('文件写入完成');

// // 追加文件
// fs.appendFile('file.log',content,err=>{
//   if(err){
//     console.error(err)
//   }
// })

// console.log('追加文件结束')

// console.log('测试创建文件夹');
// const fs = require('fs')

// const folderName = './test'

// try {
//   if (!fs.existsSync(folderName)) {
//     fs.mkdirSync(folderName)
//   }
// } catch (err) {
//   console.error(err)
// }

// const fs = require('fs')
// const path = require('path')

// fs.rename('./test','重命名文件夹',err=>{
//   if(err){
//     console.log(err)
//   }
// })