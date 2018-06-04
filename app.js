const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// 引入自定义模块
var todoController = require('./controller/todoController')

//实例化一个 express 对象 内部是return 的
var app = express()

app.set('view engine','ejs')



//配置 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




// 开放文件入口
//省略的写法 和 app.use('/public/',express.static('./public'))  效果是一样的额
app.use('/public/',express.static('public'))



todoController(app)


app.listen(3000,err=>console.log(err?err:'localhost:3000'))