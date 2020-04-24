<!--
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-24 17:08:13
 -->
<template>
  <div>
    <Header name='我的假条'></Header>
    <div v-if="!result.length" class="no_message">
      <van-icon class="icon" name="chart-trending-o" />
      <p>暂无数据</p>
    </div>
    <div class="box">
      <div class="wrap" v-for="(item, index) in result" :key="index">
        <van-panel title="批假人" :desc="item.name" :status="item.status" use-footer-slot>
          <div class="start">请假理由：{{item.reason}}</div>
          <div class="mid">请假开始时间：{{item.startTime}}</div>
          <div class="end">请假结束时间：{{item.endTime}}</div>
          <!-- <div slot="footer">
            <van-button @click="del(item.id)" size="small" type="danger">删除</van-button>
          </div> -->
        </van-panel>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      result: []
    }
  },
  methods: {
    init () {
      let _this = this
      this.$axios.post('/api/leaverecord', {
        params: { account: this.$store.state.account }
      }).then(res => {
        _this.result = res.data.data
        console.log(this.result)
      })
    },
    del (id) {
      this.$axios.post('/api/delrecord', {
        params: { id: id, account: this.$store.state.account }
      }).then(res => {
        this.$toast(res.data.msg)
        history.go(0)
      })
    }
  },
  mounted () {
    this.init()
  },
  components: {
    Header
  }
}
</script>
<style lang='less' scoped>
.wrap {
  margin-top: .5rem
}
.wrap:nth-of-type(1) {
  margin-top: 0;
}
.start {
  padding: .5rem .5rem .25rem 1rem;
  color: #555;
  font-size: 14px
}
.mid {
  padding: .25rem .5rem .25rem 1rem;
  color: #555;
  font-size: 14px
}
.end {
  padding: .25rem .5rem .5rem 1rem;
  color: #555;
  font-size: 14px
}
.van-panel__footer {
  text-align: right;
}
.no_message {
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  font-size: 1.5rem;
  color: #999;
  .icon {
    font-size: 5rem
  }
}
</style>
