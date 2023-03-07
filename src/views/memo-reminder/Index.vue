<template>
  <div id="reminder">
    <el-button type="primary" @click="startTask">send</el-button>
    {{ output }}
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'Reminder',
  data() {
    return {
      startDay: '',
      local: '',
      // 发送者邮箱厂家
      EmianService: '163',
      // 发送者邮箱账户SMTP授权码
      EamilAuth: {
        user: 'dong_960010@163.com',
        pass: 'DHCIZJVVFDACHYKV'
      },
      // 发送者昵称与邮箱地址
      EmailFrom: '"dong_960010" <dong_960010@163.com>',
      // 接收者邮箱地
      EmailTo: 'dong_960010@163.com',
      // 邮件主题
      EmailSubject: '临时工小東的每日祝福',
      sendMailConfig: {
        EmailHour: '00',
        EmialMinminute: '30'
      },
      // 爬取数据的url
      urls: {
        oneUrl: '',
        weatherUrl: ''
      },
      output: null
    }
  },
  mounted() {
    Object.assign(this.urls, {
      oneUrl: 'http://wufazhuce.com/',
      weatherUrl: `https://tianqi.moji.com/weather/china/${this.local}`
    })
  },
  methods: {
    async getUserInfo() {
      const res = await getUserInfo()
      console.log(res)
    },
    startTask() {
      console.log('---start task ---')
      this.getUserInfo()
    }
  }
}
</script>

<style>

</style>
