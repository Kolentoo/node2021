let app = require('./serve');
let http = require("http");
let https = require("https");
let fs = require("fs");
// Configuare https引入证书相关文件
const httpsOption = {
    key : fs.readFileSync("./public/SSL/Nginx/2_kolento.club.key"),
    cert: fs.readFileSync("./public/SSL/Nginx/1_kolento.club_bundle.crt")
}

// 创建服务，默认80端口
http.createServer(app).listen(80);
// https默认443端口
https.createServer(httpsOption, app).listen(443);