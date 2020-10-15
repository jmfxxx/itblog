// 引入Joi模塊 （寫法已有不同要看官網寫法)
const Joi = require('joi');

//定義schema是一個Joi物件，並定義格式
const schema = Joi.object({
    username: Joi.string().min(2).max(10).error(new Error('姓名至少2-10個字'))
});
// console.log(schema.validate({ username: 1 }))
// const { error, value } = schema.validate({ username: 'a string' });
async function a1() {
    try {
        await schema.validateAsync({ username: '1' });

    }
    catch (err) {
        console.log(err.message);
        return;
    }
    console.log('驗証成功!!!!')
}
a1();

