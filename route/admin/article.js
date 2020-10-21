module.exports = (req, res) => {
    // 這是一個標識當前訪問的是用戶管理頁面
    req.app.locals.currentLink = 'article'
    res.render('admin/article.art')
}