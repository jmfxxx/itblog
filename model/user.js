// 建立使用者集合

const mongoose = require("mongoose");

// 導入bcrypt 
const bcrypt = require("bcrypt");

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
// createUser();
// 將用集合做為模塊成員進行導出
module.exports = {
  User: User,
};
