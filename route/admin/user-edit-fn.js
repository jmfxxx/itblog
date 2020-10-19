
// 引入用戶集合的構造函數
const { User, validateUser } = require('../../model/user')
// 引入 bcrypt 
const bcrypt = require('bcrypt')
const { object } = require('joi')


module.exports = async (req, res, next) => {



    try {

        const { error, value } = await validateUser(req.body)
        console.log('--------------------vaild')

        if (error) {
            // JSON.stringfy() 將物件轉換字串

            let errmsg = error
            let pp = {}
            pp.path = "/admin/user-edit"
            pp.message = `${errmsg}`


            let cc = `{path:'/admin/user-edit,message=${error}}`
            console.log('Iam cc : ' + cc)
            return next(JSON.stringify(pp))

            // res.redirect(`/admin/user-edit?message=${error}`)
        }
        // res.redirect(`/admin/user-edit?message=${error}}`)
        console.log(error)

    } catch (e) {
        console.log('Er.... unknow error')
    }
    // 依據email信箱來判斷是否已註冊過了...
    // 使用findOne的原因他會回傳一個物件，find會返回一個陣列
    // 依findOne返回值來判斷或為空則表示沒找到
    let user = await User.findOne({ email: req.body.email })
    // 如果用戶已經存在，信箱已被註冊過了
    if (user) {
        // res.redirect 會執行一個res.end會造成後面送res.send錯誤
        // 解決方式加 return
        // return res.redirect(`/admin/user-edit?message=email已被註冊過`)
        return next(JSON.stringify({ path: '/admin/user-edit', message: 'email已被註冊過' }))
    }

    //對密碼進行加密處理 bcrypt
    //產成隨機字符串
    const salt = await bcrypt.genSalt(10)
    let password = await bcrypt.hash(req.body.password, salt)
    // 替換密碼
    req.body.password = password;
    // res.send(req.body)   //測試用確認密碼是否有加密

    //將新增使用者資料加入資料庫
    await User.create(req.body);
    //  將網頁重定向回到user頁面
    res.redirect('/admin/user?message=""')
}