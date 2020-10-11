// 連接mongodb資料庫用

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blog",{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>{console.log('DB連接成功')})
.catch((err)=>{
    console.log('DB連接有錯，請檢查錯誤!!!'+err)
})