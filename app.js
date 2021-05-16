// 載入 express 並建構應用程式伺服器
const express = require('express')
// 載入 Todo model
const Todo = require('./models/todo') 
// 引用 body-parser
const bodyParser=require('body-parser')
// 載入 over-ride
const methodoverride = require('method-override')
// 載入 handlebars
const exphbs = require('express-handlebars');
// 引用路由器
const routes = require('./routes')
require('./config/mongoose')
// 將 request 導入路由器
const app = express()



// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 用 app.use
app.use(methodoverride('_method'))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(routes)

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})