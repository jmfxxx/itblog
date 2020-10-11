// 引用express框架
const express = require('express');
// 建立home路由
const admin = express.Router();

admin.get('/login',(req,res)=>{
    res.render('admin/login')

})
admin.get('/user',(req,res)=>{
    res.render('admin/user')

})
admin.get('/article-edit',(req,res)=>{
    res.render('admin/article-edit')

})

admin.get('/article',(req,res)=>{
    res.render('admin/article')

})

admin.get('/user-edit',(req,res)=>{
    res.render('admin/user-edit')

})

module.exports = admin;
