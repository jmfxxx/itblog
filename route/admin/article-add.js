const formidable = require('formidable')
const path = require('path')
module.exports = (req, res) => {
    // 1.創建表單解析對象
    const form = new formidable.IncomingForm();
    // 2.設定上傳目錄
    form.uploadDir = path.join(__dirname, '../../public', 'uploads')
    // 3.保留上傳文件的副檔名（預設不保留)改為保留
    form.keepExtensions = true;
    // 4.解析表單 
    form.parse(req, (err, fields, files) => {
        // 1.err錯誤對象，如果表單解析失敗，err裏面儲存錯誤訊息，如果表單解析成功，err空白
        // 2.fileds 物件類型 保存一般表單的內容
        // 3.files  物件類型 上傳文件的相鬥資料，保存二進制內容
        res.send(fields)
    })



    // res.send('ok ')
}