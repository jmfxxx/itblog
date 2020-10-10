// 引入express
const express = require('express')

const app = express();

// 導入route模組  .js可省略
const home =require('./route/home')
const admin = require('./route/admin')

// 設定攔截請求 路由匹配路徑
app.use('/home',home);
app.use('/admin',admin)

// list port
app.listen(80);

console.log('Server start !! http://localhost')