// 導入用戶集合構造函數
const { User } = require('../../model/user')
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    //接收請求參數
    // res.send(req.body)
    //取得客戶端輸入資料進後二次驗証(後端驗証)
    const { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        // 送回狀態碼改為400 並且不讓程式再向下跑
        return res.status(400).render('admin/error', { msg: 'Email或密碼輸入錯誤' })
    }
    //如果沒資料會是空的，如果有資料回傳會是個物件email
    let user = await User.findOne({ email: email })
    if (user) {
        // 將客戶端和資料庫的資料比對
        // 使用bcrypt.compare 方式進行比對 正確傳回true 錯誤傳回false 
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            // 向req下增加一個username屬性，並給值   //因為使用express-session所以會在req下會產生一個session
            req.session.username = user.username;
            // console.log(req.session)
            // 將資料寫到 app.locals中,增加一個userInfo屬性
            req.app.locals.userInfo = user;
            // 登錄成功
            // res.send('Login Success')
            res.redirect('/admin/user')
        } else {
            //密碼不對
            res.status(400).render('admin/error', { msg: 'Email or Password Error!!!!' })
        }
    } else {
        //沒查詢到
        res.status(400).render('admin/error', { msg: 'Email or Password Error!!!!' })
    }
}

module.exports = login;

// 方法2 直接回，不加變數方式 module.export = async.....
// module.exports = async (req, res) => {
//     //接收請求參數
//     // res.send(req.body)
//     //取得客戶端輸入資料進後二次驗証(後端驗証)
//     const { email, password } = req.body;
//     if (email.trim().length == 0 || password.trim().length == 0) {
//         // 送回狀態碼改為400 並且不讓程式再向下跑
//         return res.status(400).render('admin/error', { msg: 'Email或密碼輸入錯誤' })
//     }
//     //如果沒資料會是空的，如果有資料回傳會是個物件email
//     let user = await User.findOne({ email: email })
//     if (user) {
//         // 將客戶端和資料庫的資料比對
//         // 使用bcrypt.compare 方式進行比對 正確傳回true 錯誤傳回false 
//         let isValid = await bcrypt.compare(password, user.password)
//         if (isValid) {
//             // 向req下增加一個username屬性，並給值   //因為使用express-session所以會在req下會產生一個session
//             req.session.username = user.username;
//             // console.log(req.session)
//             // 將資料寫到 app.locals中,增加一個userInfo屬性
//             req.app.locals.userInfo = user;
//             // 登錄成功
//             // res.send('Login Success')
//             res.redirect('/admin/user')
//         } else {
//             //密碼不對
//             res.status(400).render('admin/error', { msg: 'Email or Password Error!!!!' })
//         }
//     } else {
//         //沒查詢到
//         res.status(400).render('admin/error', { msg: 'Email or Password Error!!!!' })
//     }
// }

