<template>
  <div>
    <Header name='请假'></Header>
    <div>
      <van-cell-group>
        <van-field v-model='reason' type='text' label='请假原因' placeholder='请输入请假原因' required />
        <van-field v-model='name' type='text' label='批假人' placeholder='请输入批假人账号' required />
        <van-field v-model='code' type='text' label='签到码' placeholder='请输入签到码(选填)' />
        <van-field
          v-model="start_time"
          readonly="readonly"
          required
          label="请假开始时间"
          @click="startTimePop=true"
          placeholder="请选择请假开始时间"
        />
        <van-popup v-model="startTimePop" position="bottom" :overlay="true">
          <van-datetime-picker
            v-model="currentDate_start"
            type="datetime"
            @cancel="startTimePop = false"
            @confirm="startTimePop = false"
            @change="startTimeChange"
          />
        </van-popup>
        <van-field
          v-model="end_time"
          readonly="readonly"
          required
          label="请假结束时间"
          @click="endTimePop=true"
          placeholder="请选择请假结束时间"
        />
        <van-popup v-model="endTimePop" position="bottom" :overlay="true">
          <van-datetime-picker
            v-model="currentDate_end"
            type="datetime"
            @cancel="endTimePop = false"
            @confirm="endTimePop = false"
            @change="endTimeChange"
          />
        </van-popup>
      </van-cell-group>
      <van-button @click='create' class='btn' type='primary' size='large'>提交</van-button>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      endTimePop: false,
      startTimePop: false,
      currentDate_start: '',
      currentDate_end: '',
      reason: '',
      name: '',
      start_time: '',
      end_time: '',
      status: '未审批',
      code: ''
    }
  },
  methods: {
    endTimeChange (e) {
      let endTimeArr = e.getValues()
      this.end_time = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  ${endTimeArr[3]}:${endTimeArr[4]}:00`
    },
    startTimeChange (e) {
      let startTimeArr = e.getValues()
      this.start_time = `${startTimeArr[0]}-${startTimeArr[1]}-${startTimeArr[2]}  ${startTimeArr[3]}:${startTimeArr[4]}:00`
    },
    create () {
      let data = {}
      data.reason = this.reason
      data.name = this.name
      data.startTime = this.start_time
      data.endTime = this.end_time
      data.status = this.status
      data.account = this.$store.state.account
      data.code = this.code
      data.department = this.$store.state.department
      data.classes = this.$store.state.classes
      data.nickname = this.$store.state.nickname
      for (let item in data) {
        if (item !== 'code') {
          if (!data[item]) {
            this.$toast('似乎还有什么没有输入~')
            return false
          }
        }
      }
      console.log(data)
      this.$axios
        .post('/api/askleave', {
          params: data
        }).then(res => {
          this.$toast(res.data.msg)
          if (res.data.code === 200) {
            this.$socket.emit('needrecord', {
              tokens: this.name,
              account: this.$store.state.account
            })
          }
        })
    }
  },
  components: {
    Header
  }
}
</script>
<style lang='less' scoped>
</style>
