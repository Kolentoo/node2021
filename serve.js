// 启动接口服务 需要时刻处于启动状态
console.log('进入kolento.js');

const express = require('express');
const app = express();

// 建立数据库连接
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : '106.12.132.19',
  user     : 'root',
  password : '123456',
  port     : 3306,
  database : 'kolento'
});
console.log('db',db);
 
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



// 从表animebox里面插入内容
app.get('/add',(req,res)=>{
  let post = {title:'标题信息3',body:'内容信息3'};
  let sql = "INSERT INTO animebox SET ?";
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
app.get( `/anime/all/:start/:end`,(req,res)=>{
  // 查询所有
  // let sql = 'SELECT * FROM animebox'; 
  // 查询所有动漫数据中的20条
  let sql = `select * from animebox limit ${req.params.start},${req.params.end}`
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

// 根据id查询动漫内容
app.get('/animeDetail/:id',(req,res)=>{
  let sql = `SELECT * FROM animebox WHERE id = ${req.params.id}`;
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

// 根据动漫名字查询内容
app.get('/animeName/:title',(req,res)=>{
  let sql = `SELECT * FROM animebox WHERE title = ${req.params.title}`;
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
  let sql = `UPDATE animebox SET title = '${req.query.title}' WHERE id = ${req.params.id}`;
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
  let sql = `DELETE FROM animebox WHERE id = ${req.query.id}`;
  db.query(sql,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log('result',result);
      res.send('del ok')
    }
  })
})


// 以下为转发的可用接口
// 分类动漫列表
app.use('/anime/list/:start',function(req,res){
  var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,10&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}`;
  console.log('req',req);
  request({
    url:url,
    method:'GET',
    json:true
  },function(_err,_res,_resBody){
    res.json(_resBody);
  })
});

// 热门动画
app.use('/anime/hot/:start/:end',function(req,res){
  var url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=recommend&page_limit=${req.params.end}=&page_start=${req.params.start}`;
  console.log('req',req);
  request({
    url:url,
    method:'GET',
    json:true
  },function(_err,_res,_resBody){
    res.json(_resBody);
  })
});

// 动画简介
app.use('/anime/:id',function(req,res){
  var url = `https://movie.douban.com/j/subject_abstract?subject_id=${req.params.id}`;
  console.log('req',req);
  request({
    url:url,
    method:'GET',
    json:true
  },function(_err,_res,_resBody){
    res.json(_resBody);
  })
});


// 引入静态资源文件
app.use(express.static('./public'));

module.exports=app;


// 开启服务
// app.listen(3333,()=>{
//   console.log('服务器监听在3333端口')
// });

 

