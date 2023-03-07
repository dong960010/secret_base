const express = require('express')
const app = express()

const cors = require('cors') // 解决跨域问题

const { conMysql } = require('./mysql')

app.use(cors())

const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')
// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// 处理 mutipart/form-data
app.use(multiparty())
// 处理 application/json
app.use(bodyParser.json())

// 创建统一的返回报文对象
class Response {
  constructor(isSucceed, msg, code, data) {
    this.isSucceed = isSucceed
    this.msg = msg
    this.code = code
    this.data = data
  }
}

// 一个简单的测试接口
// app.get('/user/login', (req, res) => {
//   const sql = `select * from list where id = '${req.query.user}'`
//   conMysql(sql).then(result => {
//     const response = new Response(true, '获取成功', 200, result)
//     res.send(response)
//   }).catch(err => {
//     res.status(500).send(`${err}数据库连接出错!`)
//   })
// })

app.post('/user/login', (req, res) => {
  const { account, password } = req.query
  const sql = `select * from account where account = '${account}' and password = '${password}'`
  conMysql(sql).then(result => {
    const response = new Response(true, '获取成功', 200, result)
    res.send(response)
  }).catch(err => {
    res.status(500).send(`${err}数据库连接出错!`)
  })
})

app.get('/getUserInfo', (req, res) => {
  const sql = `select * from list where id = '${req.query.id}'`
  conMysql(sql).then(result => {
    const response = new Response(true, '获取成功', 200, result[0])
    res.send(response)
  }).catch(err => {
    res.status(500).send(`${err}数据库连接出错!`)
  })
})

// 监听node服务器的端口号
app.listen(3000, () => {
  console.log('恭喜你，服务器启动成功')
})
