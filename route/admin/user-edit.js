const { User } = require('../../model/user')

module.exports = async (req, res) => {
    // 這是一個標識當前訪問的是用戶管理頁面
    req.app.locals.currentLink = 'user'
    // 取得網址中的id參數
    const { message, id } = req.query;
    //    如果id有值表示要做修改否則就是要做新增操作
    if (id) {
        let user = await User.findOne({ _id: id })
        console.log('user有沒有找到...' + user)
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    } else {
        // 增加操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '新增'
        })

    }

}