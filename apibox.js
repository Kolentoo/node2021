var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var axios = require('axios');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// 星座
app.get('/astro/all',(req,res)=>{
  let url = 'http://api.jisuapi.com/astro/all?appkey=adfb0e1348ec0adf'
  let arr1
  axios.get(url).then(json=>{
    arr1 = json.data
  }).then(()=>{
    res.json(arr1)
  })
})

// 星座详情
app.get('/astro/fortune/:astroid',(req,res)=>{
  let astroid = req.params.astroid;
  let url = 'http://api.jisuapi.com/astro/fortune?appkey=adfb0e1348ec0adf'
  let arr3
  axios.get(url,{
    params:{
      astroid:astroid
    }
  }).then(json=>{
    arr3 = json.data
  }).then(()=>{
    res.json(arr3)
  })
})

// 天气城市
app.get('/weather/query/:city',(req,res)=>{
  let city = req.params.city;
  let url = 'http://api.jisuapi.com/weather/query?appkey=adfb0e1348ec0adf'
  let arr2
  axios.get(url,{
    params:{
      city:city
    }
  }).then(json=>{
    arr2 = json.data
  }).then(()=>{
    res.json(arr2)
  })
})


app.get('/v4/discovery/hot/:num',(req,res)=>{
  let url = 'http://baobab.kaiyanapp.com/api/v4/discovery/hot'
  let num = req.params.num
  let arr3
  axios.get(url,{
    params:{
      num:5
    }
  }).then(json=>{
    arr3 = json.data
  }).then(()=>{
    res.json(arr3)
  })
})

app.get('/api/data/Android/10/:pages',(req,res)=>{
  let pages = req.params.pages
  let url = `http://gank.io/api/data/Android/10/${pages}` 
  let arr3
  axios.get(url,{
  }).then(json=>{
    arr3 = json.data
  }).then(()=>{
    res.json(arr3)
  })
})

// 动漫电影排行
app.get('/chart/top_list',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let url = `https://movie.douban.com/j/chart/top_list?type=25&interval_id=100%3A90&action=&start=0&limit=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 剧情电影排行
app.get('/chart/top_story',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let url = `https://movie.douban.com/j/chart/top_list?type=11&interval_id=100%3A90&action=&start=0&limit=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 喜剧电影排行
app.get('/chart/top_happy',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let url = `https://movie.douban.com/j/chart/top_list?type=24&interval_id=100%3A90&action=&start=0&limit=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 动作电影排行
app.get('/chart/top_act',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let url = `https://movie.douban.com/j/chart/top_list?type=5&interval_id=100%3A90&action=&start=0&limit=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 爱情电影排行
app.get('/chart/top_love',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let url = `https://movie.douban.com/j/chart/top_list?type=13&interval_id=100%3A90&action=&start=0&limit=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 科幻榜单
app.get('/chart/top_scientist',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let url = `https://movie.douban.com/j/chart/top_list?type=17&interval_id=100%3A90&action=&start=0&limit=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 惊悚榜单
app.get('/chart/top_scare',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let url = `https://movie.douban.com/j/chart/top_list?type=19&interval_id=100%3A90&action=&start=0&limit=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 恐怖榜单
app.get('/chart/top_horror',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let url = `https://movie.douban.com/j/chart/top_list?type=20&interval_id=100%3A90&action=&start=0&limit=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 灾难榜单
app.get('/chart/top_disaster',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let url = `https://movie.douban.com/j/chart/top_list?type=12&interval_id=100%3A90&action=&start=0&limit=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 正在热映
app.get('/v2/movie/in_theaters',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 即將上映
app.get('/v2/movie/coming_soon',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://api.douban.com/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=20` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// top250
app.get('/v2/movie/top250',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://api.douban.com/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 北美票房
app.get('/v2/movie/us_box',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://api.douban.com/v2/movie/us_box?apikey=0df993c66c0c636e29ecbb5344252a4a` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 电影详情
app.get('/v2/movie/subject/:mid',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://api.douban.com/v2/movie/subject/${mid}?apikey=0df993c66c0c636e29ecbb5344252a4a` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})


// 热门动画
app.get('/anime/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=recommend&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 最新动画
app.get('/anime/new',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=time&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 动画最高评价
app.get('/anime/nice',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E6%9C%AC%E5%8A%A8%E7%94%BB&sort=rank&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 热门最新
app.get('/hottv/new',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&sort=time&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 热门最热
app.get('/hottv/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 热门最好
app.get('/hottv/nice',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%83%AD%E9%97%A8&sort=rank&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 美剧最新
app.get('/america/new',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BE%8E%E5%89%A7&sort=time&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 美剧最热
app.get('/america/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BE%8E%E5%89%A7&sort=recommend&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 美剧最好
app.get('/america/nice',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BE%8E%E5%89%A7&sort=rank&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 英剧最新
app.get('/england/new',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E8%8B%B1%E5%89%A7&sort=time&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 英剧最热
app.get('/england/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E8%8B%B1%E5%89%A7&sort=recommend&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 英剧最好
app.get('/england/nice',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E8%8B%B1%E5%89%A7&sort=rank&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 韩剧最新
app.get('/korea/new',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E9%9F%A9%E5%89%A7&sort=time&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 韩剧最热
app.get('/korea/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E9%9F%A9%E5%89%A7&sort=recommend&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 韩剧最好
app.get('/korea/nice',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E9%9F%A9%E5%89%A7&sort=rank&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 日剧最新
app.get('/japan/new',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E5%89%A7&sort=time&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 日剧最热
app.get('/japan/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E5%89%A7&sort=recommend&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 日剧最好
app.get('/japan/nice',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%97%A5%E5%89%A7&sort=rank&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 国产最热
app.get('/china/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E5%9B%BD%E4%BA%A7%E5%89%A7&sort=recommend&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 国产最新
app.get('/china/new',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E5%9B%BD%E4%BA%A7%E5%89%A7&sort=time&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 国产最好
app.get('/china/nice',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E5%9B%BD%E4%BA%A7%E5%89%A7&sort=rank&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 香港最热
app.get('/hongkong/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%B8%AF%E5%89%A7&sort=recommend&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 香港最新
app.get('/hongkong/new',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%B8%AF%E5%89%A7&sort=time&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 香港最好
app.get('/hongkong/nice',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E6%B8%AF%E5%89%A7&sort=rank&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 综艺最热
app.get('/variety/hot',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BB%BC%E8%89%BA&sort=recommend&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 综艺最新
app.get('/variety/new',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BB%BC%E8%89%BA&sort=time&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 综艺最好
app.get('/variety/nice',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `https://movie.douban.com/j/search_subjects?type=tv&tag=%E7%BB%BC%E8%89%BA&sort=rank&page_limit=20&page_start=0` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 人物详情
app.get('/movie/person/:mid',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = req.params.mid
  let url = `http://api.douban.com/v2/movie/celebrity/${mid}&apikey=0df993c66c0c636e29ecbb5344252a4a` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})

// 电影搜索
app.get('/search/:mid',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let mid = encodeURI(req.params.mid)
  let url = `http://api.douban.com/v2/movie/search?q=${mid}&apikey=0df993c66c0c636e29ecbb5344252a4a` 
  console.log(url)
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})


// 聊天机器人2号
app.get('/robots2/:words',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  let words = req.params.words
  let url = `http://i.itpk.cn/api.php?question=${words}` 
  let arr4
  axios.get(url,{
  }).then(json=>{
    arr4 = json.data
  }).then(()=>{
    res.json(arr4)
  })
})






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
