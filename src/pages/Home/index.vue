<!--
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-05-17 20:14:54
 -->
<template>
  <div class="container">
    <p class="bread">首页</p>
    <van-grid :column-num="2" :gutter="10">
      <van-grid-item
        v-for="(item, index) in list"
        v-show="item.show"
        :key="index"
        :url="item.url"
        :icon="item.icon"
        :text="item.text"
        :id="item.id"
      />
    </van-grid>
  </div>
</template>
<script>
import { getCookie } from '../../common/cookie'
export default {
  data () {
    return {
      Attendance: this.$store.state.Attendance,
      IDRegister: this.$store.state.IDRegister,
      AttendanceHistory: this.$store.state.AttendanceHistory,
      AskLeave: this.$store.state.AskLeave,
      ApplicationLeave: this.$store.state.ApplicationLeave,
      ApproveLeave: this.$store.state.ApproveLeave,
      CallRoll: this.$store.state.CallRoll
    }
  },
  computed: {
    list () {
      return [
        {icon: 'sign', id: 'van-icon-sign', text: '签到', url: '/#/Home/Attendance', show: this.getPower('Attendance')},
        {icon: 'clock-o', id: 'van-icon-clock-o', text: '签到历史', url: '/#/Home/AttendanceHistory', show: this.getPower('AttendanceHistory')},
        {icon: 'todo-list-o', id: 'van-icon-todo-list-o', text: '请假', url: '/#/Home/AskLeave', show: this.getPower('AskLeave')},
        {icon: 'records', id: 'van-icon-records', text: '我的假条', url: '/#/Home/ApplicationLeave', show: this.getPower('ApplicationLeave')},
        {icon: 'completed', id: 'van-icon-completed', text: '批假', url: '/#/Home/ApproveLeave', show: this.getPower('ApproveLeave')},
        {icon: 'friends-o', id: 'van-icon-friends-o', text: '创建签到', url: '/#/MySetting/SetUp', show: this.getPower('CallRoll')}
      ]
    }
  },
  methods: {
    getPower (name) {
      let obj = JSON.parse(getCookie('info'))
      if (obj) {
        return obj[name]
      } else {
        return false
      }
    }
  }
}
</script>
<style scoped>
.container{
  margin-top: 1rem;
}
</style>
