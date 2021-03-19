var mysql = require('mysql');
const express = require('express');
const app = express();

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

// app.get( `/anime/all/:start/:num`,(req,res)=>{
  // // 查询所有
  // // let sql = 'SELECT * FROM animebox'; 
  // let sql = `select * from animebox limit ${req.params.start},${req.params.num}`
  // db.query(sql,(err,result)=>{
  //   if(err){
  //   }else{
  //     // res.send('查询成功');
  //     let final = {'flag':'success',result}
  //     res.json(final);
  //   }
  // })
// })

class Dd{
  static getInstance(){
    if (!Dd.instance){
        Dd.instance = new Dd();
    }
    return Dd.instance;
  }
  constructor(){
    /*实例化的时候就会执行*/
      this.connect();
  }
  connect(){
    console.log('连接数据库');
    mysql.createConnection({
      host     : '121.5.124.135',
      user     : 'root',
      password : '123456',
      port     : 3306,
      database : 'kolento'
    });
  }
  find(){
    console.log('查找数据库');
    app.get( `/anime/all/:start/:num`,(req,res)=>{
      let sql = `select * from animebox limit ${req.params.start},${req.params.num}`
      mysql.query(sql,(err,result)=>{
        if(err){
        }else{
          let final = {'flag':'success',result}
          res.json(final);
        }
      })
    })
  }
}


var p1 = Dd.getInstance();
var p2 = Dd.getInstance();
p1.find();
