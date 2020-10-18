// 建立使用者集合

const mongoose = require("mongoose");

// 導入bcrypt 
const bcrypt = require("bcrypt");
// 引入joi模塊
const Joi = require('joi');

// 創建用戶集合規則
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  email: {
    type: String,
    // 保証email不重複
    unique: true,
  },
  password: {
    type: String,
    useUnifiedTopology: true,
  },
  //admin  , user
  role: {
    type: String,
    required: true,
  },
  state: {
    type: Number,
    // 0啟用
    // 1停用
    default: 0,
  },
});
const User = mongoose.model("User", userSchema);

//創建集合
async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash('123456', salt)

  const user = await User.create({
    username: "admin",
    email: "admin@don.local",
    password: pass,
    role: "admin",
    state: 0,
  })

}

// 驗証用戶訊息
const validateUser = user => {
  // 定義驗証規則
  // role 角色:只允許這兩個 normal 及 admin
  // state 狀態只允許2種(0,1)
  const schema = Joi.object({
    username: Joi.string().min(2).max(12).required().error(new Error('用戶名不符合規則,名字至少2-12個字元')),
    email: Joi.string().error(new Error('Email不可以為空!!!!')),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密碼長度不符合要求')),
    role: Joi.string().valid('normal', 'admin').required().error(new Error('角色不符合規則!')),
    state: Joi.number().valid(0, 1).required().error(new Error('狀態值錯誤!'))
  });
  // 實施驗証
 console.log(schema.validate(user))
    return  schema.validate(user)
}

// createUser();
// 將用集合做為模塊成員進行導出
module.exports = {
  User: User,
  validateUser
};
