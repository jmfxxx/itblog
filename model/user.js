// 建立使用者集合

const mongoose = require('mongoose');
// 創建用戶集合規則
const userSchema = new mongoose.Schema ({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        // 保証email不重複
        unique: true,

    },
    password:{
        type:String,
        useUnifiedTopology: true
    },
    role:{
        type:String,
        required:true
    },
    state:{
        type:Number,
        // 0啟用
        // 1停用
        default:0   
    }
});

//創建集合
const User = mongoose.model('User',userSchema);

// 將用集合做為模塊成員進行導出
models.exports = {
    User:User,

} 
