// 引入express
const express = require("express");
const path = require("path");
// 引入body-parser 處理post請求
const bodyParser = require('body-parser')
// 導入expess-session
const session = require('express-session');
const app = express();
// 資料庫連接
require("./model/connect");

// 官方建議使用false (採querystring方式處理)
app.use(bodyParser.urlencoded({ extended: false }));

// 調用app.use(session()) 攔截session請求
app.use(session({ secret: 'secret key' }));
//開放靜態資源文件
app.use(express.static(path.join(__dirname, "public")));

// 1.告訴express模板所在框在
app.set("views", path.join(__dirname, "views"));
// 2.告訴 express模版預設的副檔名為何
app.set("view engine", "art");
// 3.當渲染為art的模板時，所使用的模板引掔是什麼
app.engine("art", require("express-art-template"));

// 導入route模組  .js可省略
const home = require("./route/home");
const admin = require("./route/admin");
const { nextTick } = require("process");
// 攔截請求，判斷用戶狀態

app.use('/admin', require('./middleware/loginGuard'))

// 設定攔截請求 路由匹配路徑
app.use("/home", home);
app.use("/admin", admin);

// 錯誤處理中間件
app.use((err,req,res,next) => {
    console.log(err + 'typeof: '+typeof(err))
 const result = JSON.parse(err)
console.log(result)
console.log(result.path)
console.log(result.message)
res.redirect(`${result.path}?message=${result.message}`);
})

// list port
app.listen(80);

console.log("Server start !! http://localhost");
