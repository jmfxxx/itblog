const { User} = require('../../model/user');
module.exports = async (req, res) => {
    //將用戶訊息從資料庫查詢出來
 let users = await User.find({})

//  res.send(users)
// 渲染模板
    res.render('admin/user',{users:users})
}