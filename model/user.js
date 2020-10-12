// 建立使用者集合

const mongoose = require("mongoose");
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

//創建集合
const User = mongoose.model("User", userSchema);
// User.create({
//   username: "admin",
//   email: "admin@don.local",
//   password: "123456",
//   role: "admin",
//   state: 0,
// })
//   .then(() => {
//     console.log("Create user success");
//   })
//   .catch((err) => {
//     console.log("Error" + err);
//   })
// 將用集合做為模塊成員進行導出
module.exports = {
  User: User,
};
