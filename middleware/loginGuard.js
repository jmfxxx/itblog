const guard = (req, res, next) => {
    // 判斷用戶訪問是否登錄頁面
    // 判斷用戶的登錄狀態
    // 如果用戶是登入的，將請求放行
    // 如果未登入，重定向回登錄頁面
    console.log(req.url)
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        //   用戶是合法的且已登入
        next();
    }
}

module.exports = guard;