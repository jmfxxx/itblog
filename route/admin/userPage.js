const { User} = require('../../model/user');
module.exports = async (req, res) => {
    // 接收當前頁參數
    let page = req.query.page || 1;
    console.log('指定頁數'+page)
// 分頁數量
    let pagesize = 10 ;
// 總筆數
    let count = await User.countDocuments({});
    // console.log(`總筆數${page}第`)
    

// 總分頁數 Math.ceil 無條件進位
    let total = Math.ceil(count/pagesize);
console.log(`總頁數${total}`)
    // 限制取出數量
// 頁碼對應數據查詢位置
let start = (page-1)*pagesize
    //將用戶訊息從資料庫查詢出來
 let users = await User.find({}).limit(pagesize).skip(start);
 users.forEach(item=>console.log(item.username))
 

//  res.send(users)
// 渲染模板 
// 傳出當前頁及總頁數
    res.render('admin/user',{
        users:users,
        page:page,
        total:total})
}