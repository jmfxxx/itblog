
// 引入用戶集合的構造函數
const { User, validateUser } = require('../../model/user')
// 引入 bcrypt 
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {


    try {
        await validateUser(req.body)
    }
    catch (e) {
        console.log(e)
        //  如果有錯，重定向到使用新增頁面
        res.redirect(`/admin/user-edit?message=${e}`)
    }
    // 依據email信箱來判斷是否已註冊過了...
    // 使用findOne的原因他會回傳一個物件，find會返回一個陣列
    // 依findOne返回值來判斷或為空則表示沒找到
    let user = await User.findOne({ email: req.body.email })
    // 如果用戶已經存在，信箱已被註冊過了
    if (user) {
        // res.redirect 會執行一個res.end會造成後面送res.send錯誤
        // 解決方式加 return
        return res.redirect(`/admin/user-edit?message=email已被註冊過`)
    }

    //對密碼進行加密處理 bcrypt
    //產成隨機字符串
    const salt = await bcrypt.genSalt(10)
    let password = await bcrypt.hash(req.body.password, salt)
    // 替換密碼
    req.body.password = password;
    // res.send(req.body) 

    //將新增使用者資料加入資料庫
    await User.create(req.body);
    //  將網頁重定向回到user頁面
    res.redirect('/admin/user')
}