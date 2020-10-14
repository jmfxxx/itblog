//導入bcrypt
const bcrypt = require('bcrypt');

async function run() {
    // 生成隨機字符串
    // genSalt方法接收一個數值作為參數
    // 數值愈大，生成的隨機字符串複雜度愈高
    // 預設10
    // 返回生成的隨機字符串
    const salt = await bcrypt.genSalt(10)
    // 對密碼進行加密
    // 1.要進行加密的明文(原文)
    // 2.隨機字符串
    // 返回值是加密後的密碼
    const result = await bcrypt.hash('123456', salt)

    console.log(salt)
    console.log(result) //加密後的結果

}
run();