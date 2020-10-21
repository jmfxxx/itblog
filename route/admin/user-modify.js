// 依按下修改按紐前端畫面送出的請求參數取得id
// 如果密碼輸入正確才能修改
const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req, res, next) => {
    const { username, email, role, state, password } = req.body;
    // 即將要修改的id
    const id = req.query.id;
    let user = await User.findOne({ _id: id })
    // 密碼比對 ，使用者修改頁面輸入的和資料庫比對
    const isValid = await bcrypt.compare(password, user.password)
    // isVailid =1  True 0 ==> false
    if (isValid) {
        // 當輸入密碼正確時才會進行修改
        // res.send('password check')
        // 密碼比對成功則寫入資料庫中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        })
        // 更新完頁面重定向頁面　/admin/user
        res.redirect('/admin/user')
    } else {
        // 錯誤不修改送回頁面
        // 觸發  錯誤處理中間件app.js 送回後會帶出訊息及錯誤的 id
        let obj = { path: '/admin/user-edit', message: '密碼比對失敗不能進行修改', id: id }
        next(JSON.stringify(obj));
    }
}