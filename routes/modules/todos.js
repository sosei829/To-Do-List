const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

  router.get('/new',(req,res)=>{
    return res.render('new')
  })
  
  router.post('/', (req, res) => {
    console.log("hello")
    const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
    return Todo.create({ name })     // 存入資料庫
      .then(() => res.redirect('/')) // 新增完成後導回首頁
      .catch(error => console.log(error))
  })
  
  router.get('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id) //從資料庫找出資料
      .lean() //把資料轉換成單純的 JS 物件
      .then((todo) => res.render('detail', { todo })) //把資料送給前端樣板
      .catch(error => console.log(error)) //意外情形處理
  })
  
  router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
      .lean()
      .then((todo) => res.render('edit', { todo }))
      .catch(error => console.log(error))
  })
  
  router.put('/:id', (req, res) => {
    const id = req.params.id
    const { name, isDone } = req.body
    return Todo.findById(id)
      .then(todo => {
        todo.name = name
        todo.isDone = isDone === 'on'
        return todo.save()
      })
      .then(()=> res.redirect(`/todos/${id}`))
      .catch(error => console.log(error))
  })
  
  router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Todo.findById(id)
      .then(todo => todo.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  })

  module.exports = router