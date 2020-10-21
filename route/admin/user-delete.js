const { User } = require('../../model/user')

module.exports = async (req, res) => {
    //   取得要刪除的用戶ID
    const id = req.query.id
    //    依據ID刪除使用者
    await User.findOneAndDelete({ _id: id })
    // 刪除成功後，重定向回使用者列表列面
    res.redirect('/admin/user')
}
