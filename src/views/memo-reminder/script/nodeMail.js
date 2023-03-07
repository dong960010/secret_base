// const superagent = require('superagent') // 发送网络请求获取DOM
// const cheerio = require('cheerio')// 获取DOM节点
// const nodemailer = require('nodemailer') // 发送邮件的node插件
// const ejs = require('ejs') // ejs模版引擎
// const fs = require('fs') // /文件读写
// const path = require('path')// 路径配置
// const schedule = require('node-schedule')// 定时器任务库

// 爬取网页
// function catchOneData() {
//   const url = this.urls.oneUrl
//   const p = new Promise(function(resolve, reject) {
//     superagent.get(url).end((err, res) => {
//       if (res.ok) {
//         const $ = cheerio.load(res.text)
//         const selectItem = $('#carousel-one .carousel-inner .item')
//         const todayOne = selectItem[0] // 获取轮播图第一个页面，也就是当天更新的内容
//         const todayOneData = { // 保存到一个json中
//           imgUrl: 'https://w.wallhaven.cc/full/m3/wallhaven-m3lz2y.jpg',
//           type: $(todayOne).find('.fp-one-imagen-footer').text().replace(/(^\s*)|(\s*$)/g, ''),
//           text: $(todayOne).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, ''),
//           author: '临时工小東'
//         }
//         console.log(todayOneData)
//         resolve(todayOneData)
//       } else {
//         console.log(err, '获取失败')
//       }
//     })
//   })
//   return p
// }

// // 获取天气提醒
// function getWeatherTips() {
//   const url = this.urls.weatherUrl
//   const p = new Promise(function(resolve, reject) {
//     superagent.get(url).end(function(err, res) {
//       if (err) {
//         reject(err)
//         return
//       }
//       let weatherTip = ''
//       const $ = cheerio.load(res.text)
//       $('.wea_tips').each((i, elem) => {
//         console.log(i)
//         weatherTip = $(elem).find('em').text()
//       })
//       resolve(weatherTip)
//     })
//   })
//   return p
// }

// // 获取天气预报
// function getWeatherData() {
//   const url = this.urls.weatherUrl
//   const p = new Promise(function(resolve, reject) {
//     superagent.get(url).end(function(err, res) {
//       if (err) {
//         reject(err)
//         return
//       }
//       const threeDaysData = []
//       const $ = cheerio.load(res.text)
//       $('.forecast .days').each(function(i, elem) {
//         const SingleDay = $(elem).find('li')
//         threeDaysData.push({
//           Day: $(SingleDay[0]).text().replace(/(^\s*)|(\s*$)/g, ''),
//           WeatherImgUrl: $(SingleDay[1]).find('img').attr('src'),
//           WeatherText: $(SingleDay[1]).text().replace(/(^\s*)|(\s*$)/g, ''),
//           Temperature: $(SingleDay[2]).text().replace(/(^\s*)|(\s*$)/g, ''),
//           WindDirection: $(SingleDay[3]).find('em').text().replace(/(^\s*)|(\s*$)/g, ''),
//           WindLevel: $(SingleDay[3]).find('b').text().replace(/(^\s*)|(\s*$)/g, ''),
//           Pollution: $(SingleDay[4]).text().replace(/(^\s*)|(\s*$)/g, ''),
//           PollutionLevel: $(SingleDay[4]).find('strong').attr('class')
//         })
//       })
//       resolve(threeDaysData)
//     })
//   })
//   return p
// }

// // 发动邮件
// function sendMail(HtmlData) {
//   const template = ejs.compile(
//     fs.readFileSync(path.resolve(__dirname, 'email.ejs'), 'utf8')
//   )
//   const html = template(HtmlData)

//   const transporter = nodemailer.createTransport({
//     service: this.EmianService,
//     port: 465,
//     secureConnection: true,
//     auth: this.EamilAuth
//   })

//   const mailOptions = {
//     from: this.EmailFrom,
//     to: this.EmailTo,
//     subject: this.EmailSubject,
//     html: html
//   }
//   transporter.sendMail(mailOptions, (error, info = {}) => {
//     if (error) {
//       console.log(error)
//       // sendMail(HtmlData) //再次发送
//       return
//     }
//     console.log('邮件发送成功', info.messageId)
//     console.log('静等下一次发送')
//   })
// }

// // 聚合
// function getAllDataAndSendMail() {
//   const HtmlData = {}
//   // how long with
//   const today = new Date()
//   console.log(today)
//   const initDay = new Date(this.startDay)
//   const lastDay = Math.floor((today - initDay) / 1000 / 60 / 60 / 24)
//   const todaystr = `${today.getFullYear()} / ${(today.getMonth() + 1)} / ${today.getDate()}`
//   HtmlData['lastDay'] = lastDay
//   HtmlData['todaystr'] = todaystr

//   Promise.all([catchOneData(), getWeatherTips(), getWeatherData()]).then(
//     function(data) {
//       HtmlData['todayOneData'] = data[0]
//       HtmlData['weatherTip'] = data[1]
//       HtmlData['threeDaysData'] = data[2]
//       this.sendMail(HtmlData)
//     }
//   ).catch(function(err) {
//     // getAllDataAndSendMail() //再次获取
//     console.log('获取数据失败： ', err)
//   })
// }

// function scheduleStart() {
//   const rule = new schedule.RecurrenceRule()
//   const { EmailHour, EmialMinminute } = this.sendMailConfig
//   rule.dayOfWeek = [0, new schedule.Range(1, 6)]
//   rule.hour = EmailHour
//   rule.minute = EmialMinminute
//   console.log('NodeMail: 开始等待目标时刻...')
//   schedule.scheduleJob(rule, () => {
//     console.log('执行任务')
//     getAllDataAndSendMail()
//   })
// }

process.stdout.write(JSON.stringify('result----'))
