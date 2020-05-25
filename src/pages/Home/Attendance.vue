<!--
 * @Description:签到
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-05-17 20:23:24
 -->
<template>
  <div>
    <Header name='签到'></Header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-search v-model="code" placeholder="请输入签到码" show-action shape="round">
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-panel v-if="result" :title="result[0].name" :desc="result[0].geo" :status="status" use-footer-slot>
        <div slot="footer">
          <van-button @click="toAttendance" size="small" type="danger">签到</van-button>
          <van-button @click="toAskholiday" size="small" type="danger">请假</van-button>
        </div>
      </van-panel>
    </van-pull-refresh>
    <div id="allmap"></div>
  </div>
</template>
<script>
import Header from '@/components/Header'
import Utils from '@/utils'
export default {
  data () {
    return {
      code: '',
      value: '',
      result: null,
      lat: '',
      lng: '',
      isLoading: false,
      attend: null
    }
  },
  methods: {
    onSearch () {
      this.$axios.post('/api/attendance', {
        params: {code: this.code}
      }).then(res => {
        if (res.data.code === 200) {
          this.result = res.data.data
        } else {
          this.$toast(res.data.msg)
        }
      })
    },
    toAttendance () {
      let _this = this
      if (this.status === '未开始') {
        this.$toast('签到还没有开始。。')
        return false
      } else if (this.status === '已结束') {
        this.$toast('签到已经结束了。。')
        return false
      } else if (this.status === '进行中') {
        this.$axios.post('/api/selectattended', {
          params: {code: this.code, account: this.$store.state.account}
        }).then(res => {
          if (res.data.code === 250) {
            _this.$toast(res.data.msg)
            return false
          } else if (res.data.code === 200) {
            this.$axios.post('/api/selectlatetime', {
              params: {code: _this.code}
            }).then(res2 => {
              if (Number(Utils.format()) > Number(res2.data.data[0].lateTime.replace(/\s/g, '').replace(/-/g, '').replace(/:/g, ''))) {
                _this.attend = '迟到'
              } else {
                _this.attend = '正常'
                console.log(_this.attend)
              }
            })
            const { BMap, BMAP_STATUS_SUCCESS } = window
            var map = new BMap.Map('allmap')
            var point = new BMap.Point(110, 33)
            map.centerAndZoom(point, 12)
            var geolocation = new BMap.Geolocation()
            geolocation.getCurrentPosition(function (r) {
              if (this.getStatus() === BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point)
                map.addOverlay(mk)
                map.panTo(r.point)
                _this.lat = r.point.lat
                _this.lng = r.point.lng
                console.log(r)
              } else {
                _this.$toast('网络错误,请检查网络')
              }
            })
            // 50米内可以签到
            if (Math.abs(this.result[0].lat - this.lat) < 0.1 && Math.abs(this.result[0].lng - this.lng) < 0.1) {
              let data = {}
              data.account = this.$store.state.account
              data.nickname = this.$store.state.nickname
              data.name = this.result[0].name
              data.startTime = this.result[0].startTime
              data.endTime = this.result[0].endTime
              data.geo = this.result[0].geo
              data.attendTime = new Date().toLocaleString()
              data.code = this.code
              data.department = this.$store.state.department
              data.classes = this.$store.state.classes
              data.attend = this.attend
              this.$axios.post('/api/toattendance', {
                params: data
              }).then(res => {
                this.$toast(res.data.msg)
              })
            } else {
              this.$toast('还未到签到地点！')
              return false
            }
          }
        })
      }
    },
    toAskholiday () {
      this.$dialog.confirm({
        title: '请假',
        message: '请假务必填写签到码'
      }).then(() => {
        this.$router.push('/Home/AskLeave')
      }).catch(() => {
        this.$toast('已取消')
      })
    },
    onRefresh () {
      this.onSearch()
      this.isLoading = false
    }
  },
  computed: {
    status () {
      let now = Number(Utils.format())
      let start = Number(this.result[0].startTime.replace(/\s/g, '').replace(/-/g, '').replace(/:/g, ''))
      let end = Number(this.result[0].endTime.replace(/\s/g, '').replace(/-/g, '').replace(/:/g, ''))
      if (now < start) {
        return '未开始'
      } else if ((now >= start) && (now <= end)) {
        return '进行中'
      } else {
        return '已结束'
      }
    }
  },
  components: {
    Header
  }
}
</script>
<style lang='less' scoped>
.van-panel__footer {
  text-align: right;
}
</style>
