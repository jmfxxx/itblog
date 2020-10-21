// 1引入mongoose
const { string } = require('joi')
const mongoose = require('mongoose')
// 2創建文章集合規則
const articleSchema = new mongoose.Schema({
    title: {
        type: string,
        maxlength: 20,
        minlength: 4,
        required: [true, '請填寫文章標題']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '請指定作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
})
// 3根據則創建集合
const Article = mongoose.model('Article')
// 3將集合規則做為模塊成員進行導出
module.exports = {
    Article: Article
}