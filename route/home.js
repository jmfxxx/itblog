// 引用express框架
const express = require('express');
// 建立home路由
const home = express.Router();

home.get('/',(req,res)=>{
    res.send('Welcome Blog Home ')
})

module.exports = home;
