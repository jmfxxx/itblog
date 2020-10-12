// 引入express
const express = require("express");
const path = require("path");

const app = express();
// 資料庫連接
require("./model/connect");

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

// 設定攔截請求 路由匹配路徑
app.use("/home", home);
app.use("/admin", admin);

// list port
app.listen(80);

console.log("Server start !! http://localhost");
