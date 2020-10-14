function searializeToJson(form) {
    var result = {}

    //使用 變數去接收表單返迴的值   
    // 返回內容[{name:'email',valeu:'aabb@mail'},{name:'password',vlaue:'aabb123'}]
    var f = form.serializeArray()
    // console.log(f)
    //將取得的表單輸入的值，轉成物件格式
    f.forEach(item => {
        result[item.name] = item.value
    })
    // console.log(result)
    return result;
}

