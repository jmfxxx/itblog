// 引用express框架
const express = require('express');
// 建立home路由
const admin = express.Router();

admin.get('/',(req,res)=>{
    res.send('Welcome Blog  Admin Page ')
})

module.exports = admin;
