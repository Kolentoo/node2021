// 启动接口服务 需要时刻处于启动状态
console.log('进入kolento.js');
const request = require('request');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// 建立数据库连接
var mysql = require('mysql');
// var db = mysql.createConnection({
//   host     : '121.5.124.135',
//   user     : 'root',
//   password : '123456',
//   port     : 3306,
//   database : 'kolento'
// });

// db.connect(err=>{
//   if(err) throw err;
//   console.log('数据库连接成功')
// });

const pool = mysql.createPool({
    host: '121.5.124.135',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'kolento'
});



app.all("*", function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})

//查询成功后关闭mysql
function closeMysql(connect) {
    connect.end((err) => {
        if (err) {
            console.log(`mysql关闭失败:${err}!`);
        } else {
            console.log('mysql关闭成功!');
        }
    });
}


// 从表animebox里面插入内容
// app.get('/add',(req,res)=>{
//   let post = {title:'标题信息3',body:'内容信息3'};
//   let sql = "INSERT INTO animebox SET ?";
//   db.query(sql,post,(err,result)=>{
//     if(err){
//       console.log('err',err);
//     }else{
//       console.log('result',result);
//       res.send('post内容成功');
//     }
//   })
// });

// 所有最新动画名单
app.get(`/anime/all/:start/:num`, (req, result) => {
    // 查询所有
    // let sql = 'SELECT * FROM animebox'; 
    let sql = `select * from bangumi limit ${req.params.start},${req.params.num}`;
    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
    // db.query(sql,(err,result)=>{
    //   if(err){
    //   }else{
    //     // res.send('查询成功');
    //     let final = {'flag':'success',result}
    //     res.json(final);
    //   }
    // })
})

// 所有热门动画名单
app.get(`/anime/popular/:start/:num`, (req, result) => {
    // 查询所有
    // let sql = 'SELECT * FROM animebox'; 
    let sql = `select * from bangumi order by hot+0 desc limit ${req.params.start},${req.params.num}`;
    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 动画榜单数据
app.get(`/anime/ranking/:start/:num`, (req, result) => {
    let sql = `select * from bangumi order by score desc,hot+0 desc limit ${req.params.start},${req.params.num}`;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 按年份查询动漫
app.get(`/anime/year/:year/:start/:num`, (req, result) => {
    let sql = `select * from bangumi where info like '%${req.params.year}%' order by hot+0 desc limit ${req.params.start},${req.params.num}`;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 按年月份查询动漫
app.get(`/anime/exact/:year/:month/:start/:num`, (req, result) => {
    let sql = `select * from bangumi where info like '%${req.params.year}年${req.params.month}月%' order by hot+0 desc limit ${req.params.start},${req.params.num}`;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 根据id查询动漫内容
app.get(`/animeId/:id`, (req, result) => {
    let sql = `SELECT * FROM bangumi WHERE id = ${req.params.id}`;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 根据id查询动漫内容
app.get(`/detail/:id`, (req, result) => {
    let sql = `SELECT * FROM content WHERE id = ${req.params.id}`;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 根据名字title查询动漫内容
app.get(`/animeName/:title`, (req, result) => {
    let sql = `SELECT * FROM bangumi where title like '%${req.params.title}%' order by hot+0 desc`;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 获取正在上映的电影
app.get(`/movie/playing/:start/:num`, (req, result) => {
    let sql = `select * from playingbox limit ${req.params.start},${req.params.num}`
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 获取即将上映的电影
app.get(`/movie/comming/:start/:num`, (req, result) => {
    let sql = `select * from commingbox limit ${req.params.start},${req.params.num}`;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 查询热映电影详情
app.get(`/playing/:id`, (req, result) => {
    let sql = `select * from playingbox where id = ${req.params.id}`;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();

                }
            })
        }
    });
})

// 查询即将上映电影详情
app.get(`/comming/:id`, (req, result) => {
    let sql = `select * from commingbox where id = ${req.params.id}`;
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();

                }
            })
        }
    });
})

// 全新数据库
app.get(`/anime/all/:start/:num`, (req, result) => {
    // 查询所有
    // let sql = 'SELECT * FROM animebox'; 
    let sql = `select * from bangumi limit ${req.params.start},${req.params.num}`;
    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 剧目简介
app.use('/mdetail/:id', function(req, res) {
    var url = `https://movie.douban.com/j/subject_abstract?subject_id=${req.params.id}`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 查询用户
app.get(`/user/detail/:name`, (req, result) => {
    // 查询所有
    // let sql = 'SELECT * FROM animebox'; 
    let sql = `select * from user where name = ${req.params.name}`;
    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
    // db.query(sql,(err,result)=>{
    //   if(err){
    //   }else{
    //     // res.send('查询成功');
    //     let final = {'flag':'success',result}
    //     res.json(final);
    //   }
    // })
})

// 小程序登录
app.get(`/login/:code`, (req, result) => {
    // 插入点击登录的用户
    console.log('req', req.params);
    let APPID = 'wxf64cb2d137c2a292';
    let SECRET = '61ff053b3a73ef830f856299e69eba17';

    request(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${req.params.code}&grant_type=authorization_code`, function(err, response, body) {
        //err 当前接口请求错误信息
        //response 一般使用statusCode来获取接口的http的执行状态
        //body 当前接口response返回的具体数据 返回的是一个jsonString类型的数据 
        //需要通过JSON.parse(body)来转换
        if (!err && response.statusCode == 200) {
            //todoJSON.parse(body)
            var res = JSON.parse(body);
            let final = { 'flag': 'success', res }
            console.log('res', res);
            result.json(final);
        }
    })
});

// 查询用户是否存在
app.get(`/user/openid/:openid`, (req, result) => {
    // 查询所有
    console.log('req.params', req.params);
    let sql = `select * from user where openid = '${req.params.openid}'`;
    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败', err2);
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 新增小程序用户
app.post(`/addUser`, (req, result) => {
    // 插入点击登录的用户
    console.log('req', req.body);
    let url = req.body.avatar;
    let name = req.body.name.replace(/\s+/g, " ");
    console.log('url', url);
    console.log('name', name);

    let sql = `insert into user(name,sex,country,avatar,openid) values('${name}',${req.body.sex},'${req.body.country}','${req.body.avatar}','${req.body.openid}');`

    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err1, res1) => {
                if (err1) {
                    console.log('查询数据库失败err1', err1);
                } else {
                    conn.query(`select @@identity as id`, (err2, res2) => {
                        if (err2) {
                            console.log('查询数据库失败err2', err2);
                        } else {
                            console.log(res2);
                            let final = { 'flag': 'success', res1, res2 }
                            console.log('result', final);
                            result.json(final);
                            conn.release();
                            // pool.end();
                        }
                    })
                }
            })
        }
    });
})

// 更新昵称
app.get(`/updateUser/:id/:name`, (req, result) => {
    // 插入点击登录的用户
    let sql = `UPDATE user SET name = '${req.query.name}' WHERE id = ${req.params.id}`;
    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 用户添加收藏关注的番剧
app.get(`/addAnime/:animeId/:id/:type`, (req, result) => {
    console.log('req.params', req.params);
    if (req.params.type == 'no') {
        var sql = `UPDATE user SET likeGroup = CONCAT(likeGroup,',${req.params.animeId}') WHERE id = ${req.params.id}`;
    } else {
        var sql = `update user set likeGroup=replace(likeGroup,',${req.params.animeId}','') where likeGroup like '%,${req.params.animeId}%';`
    }

    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败', err2);
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 获取用户收藏的番剧
app.get(`/likeBox/:id`, (req, result) => {
    // 插入点击登录的用户
    let sql = `select likeGroup from user where id = ${req.params.id};`
        // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})


// 根据多个id查询对应的信息
app.get(`/amineBox/:idBox`, (req, result) => {
    // 插入点击登录的用户
    let sql = `select * from bangumi where id in (${req.params.idBox});`
        // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败');
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                    // pool.end();
                }
            })
        }
    });
})

// 提交评论评分
app.post(`/addComment`, (req, result) => {
    console.log('req', req.body);

    let sql = `insert into comment(id,time,userName,avatar,content,userId,score) values('${req.body.id}','${req.body.time}','${req.body.userName}','${req.body.avatar}','${req.body.content}','${req.body.userId}','${req.body.score}');`
        // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err1, res1) => {
                if (err1) {
                    console.log('查询数据库失败err1', err1);
                } else {
                    console.log(res1);
                    let final = { 'flag': 'success', res1 }
                    console.log('result', final);
                    result.json(final);
                    conn.release();
                }
            })
        }
    });
})


// 获取动漫评论
app.get(`/comment/list/:id/:start/:num`, (req, result) => {
    // 插入点击登录的用户
    console.log('req', req);
    let sql = `select * from comment WHERE id = ${req.params.id}  order by time desc limit ${req.params.start},${req.params.num};`

    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败err2', err2);
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                }
            })
        }
    });
})

// 提交用户建议
app.post(`/addAdvice`, (req, result) => {
    console.log('req', req.body);

    let sql = `insert into advicebox(name,content,time,userId,avatar) values('${req.body.name}','${req.body.content}','${req.body.time}','${req.body.userId}','${req.body.avatar}');`
        // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err1, res1) => {
                if (err1) {
                    console.log('查询数据库失败err1', err1);
                } else {
                    console.log(res1);
                    let final = { 'flag': 'success', res1 }
                    console.log('result', final);
                    result.json(final);
                    conn.release();
                }
            })
        }
    });
})


// 获取用户建议列表
app.get(`/advice/list/:start/:num`, (req, result) => {
    // 插入点击登录的用户
    console.log('req', req);
    let sql = `select * from advicebox  order by time desc limit ${req.params.start},${req.params.num};`

    // 从连接池中获取一个连接
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('和mysql数据库建立连接失败');
        } else {
            console.log('和mysql数据库连接成功');
            conn.query(sql, (err2, res) => {
                if (err2) {
                    console.log('查询数据库失败err2', err2);
                } else {
                    console.log(res);
                    let final = { 'flag': 'success', res }
                    result.json(final);
                    conn.release();
                }
            })
        }
    });
})



// 根据id更数据
// app.get('/update/:id',(req,res)=>{
//   console.log('req的内容',req.params);
//   console.log('req的内容',req.query);
//   let sql = `UPDATE animebox SET title = '${req.query.title}' WHERE id = ${req.params.id}`;
//   db.query(sql,(err,result)=>{
//     if(err){
//       console.log('err',err);
//     }else{
//       console.log('result',result);
//       // res.send('查询成功');
//       res.send('update'+req.params.id+'ok')
//     }
//   })
// })

// 删除数据
// app.get('/del',(req,res)=>{
//   let sql = `DELETE FROM animebox WHERE id = ${req.query.id}`;
//   db.query(sql,(err,result)=>{
//     if(err){
//       console.log(err)
//     }else{
//       console.log('result',result);
//       res.send('del ok')
//     }
//   })
// })




// 以下为转发的可用接口
// 分类动漫列表全部
app.use('/anime/list/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 热门动画
app.use('/anime/hot/:start/:end', function(req, res) {
    var url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=recommend&page_limit=${req.params.end}=&page_start=${req.params.start}`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 分类
// 动漫剧情
app.use('/anime/juqing/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E5%89%A7%E6%83%85`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫喜剧
app.use('/anime/xiju/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E5%96%9C%E5%89%A7`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫动作
app.use('/anime/dongzuo/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E5%8A%A8%E4%BD%9C`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫爱情
app.use('/anime/dongzuo/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E7%88%B1%E6%83%85`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫科幻
app.use('/anime/kehuan/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E7%A7%91%E5%B9%BB`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫悬疑
app.use('/anime/xuanyi/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E6%82%AC%E7%96%91`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫惊悚
app.use('/anime/jingsong/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E6%83%8A%E6%82%9A`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫恐怖
app.use('/anime/kongbu/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E6%81%90%E6%80%96`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫冒险
app.use('/anime/maoxian/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E5%86%92%E9%99%A9`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫犯罪
app.use('/anime/fanzui/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&genres=%E7%8A%AF%E7%BD%AA`;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});

// 动漫国创
app.use('/anime/china/:start', function(req, res) {
    var url = `https://movie.douban.com/j/new_search_subjects?sort=U&range=0,20&tags=%E5%8A%A8%E6%BC%AB&start=${req.params.start}&countries=%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86
  `;
    console.log('req', req);
    request({
        url: url,
        method: 'GET',
        json: true
    }, function(_err, _res, _resBody) {
        res.json(_resBody);
    })
});








// 引入静态资源文件
app.use(express.static('./public'));



module.exports = app;


// 开启服务
// app.listen(3333,()=>{
//   console.log('服务器监听在3333端口')
// });