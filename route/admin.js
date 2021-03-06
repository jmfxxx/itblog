// 引用express框架
const express = require('express');

// 建立home路由
const admin = express.Router();

// 渲染登入頁面
admin.get('/login', require('./admin/loginPage'))
// 實現登錄功能
admin.post('/login', require('./admin/login'))

// 創建用戶列表路由
admin.get('/user', require('./admin/userPage'))

// 實現退出功能
admin.get('/logout', require('./admin/logout'))

// 新增使用者路由
admin.get('/user-edit', require('./admin/user-edit'))

// 新增使用者路由(POST)
admin.post('/user-edit', require('./admin/user-edit-fn'))
// 修改使用者路由(POST)
admin.post('/user-modify', require('./admin/user-modify'))

// // 刪除使用者路由
admin.get('/delete', require('./admin/user-delete'))

// 文章列表路由
admin.get('/article', require('./admin/article'))
// 文章編輯路由
admin.get('/article-edit', require('./admin/article-edit'))

// 實現文章添加功能的路由
admin.post('/article-add', require('./admin/article-add'))

module.exports = admin;
