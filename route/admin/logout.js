module.exports = (req, res) => {
    // 刪除session
    req.session.destory(function () {
        // 刪除cookie
        res.clearCookie('connect.sid');
        // 重定向到用戶頁面
        res.redirect('/admin/login');
    })
}