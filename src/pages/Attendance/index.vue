<!--
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-05-15 23:57:53
 -->
<template>
  <div class="container">
    <p class="bread">发现</p>
      <van-tabs v-model="active">
        <van-tab title="我创建的签到">
            <div v-if="!result.length" class="no_message">
      <van-icon class="icon" name="chart-trending-o" />
      <p>暂无数据</p>
    </div>
    <div class="box">
      <div class="wrap" v-for="(item, index) in result" :key="index">
        <van-panel :title="item.name" :desc="item.geo" :status="item.status" use-footer-slot>
          <div class="start">签到码：{{item.code}}</div>
          <div class="mid">开始时间：{{item.startTime}}</div>
          <div class="end">结束时间：{{item.endTime}}</div>
          <!-- <div slot="footer">
            <van-button @click="del(item.code, item.name)" size="small" type="danger">删除</van-button>
          </div> -->
        </van-panel>
      </div>
    </div>
        </van-tab>
        <van-tab title="我参与的签到">
            <div v-if="!result2.length" class="no_message">
      <van-icon class="icon" name="chart-trending-o" />
      <p>暂无数据</p>
    </div>
    <div class="box">
      <div class="wrap" v-for="(item, index) in result2" :key="index">
        <van-panel :title="item.name" :desc="item.geo" :status="item.code" use-footer-slot>
          <div class="start">开始时间：{{item.startTime}}</div>
          <div class="mid">结束时间：{{item.endTime}}</div>
          <div class="end">签到时间：{{item.attendTime}}</div>
          <!-- <div slot="footer">
            <van-button @click="del(item.code)" size="small" type="danger">删除</van-button>
          </div> -->
        </van-panel>
      </div>
    </div>
        </van-tab>
      </van-tabs>
  </div>
</template>
<script>
import Utils from '@/utils'
export default {
  data () {
    return {
      message: '',
      active: 1,
      result: [],
      result2: []
    }
  },
  methods: {
    init () {
      let _this = this
      this.$axios.post('/api/setuped', {
        params: { account: this.$store.state.account }
      }).then(res => {
        _this.result = res.data.data
        for (let i of _this.result) {
          let now = Number(Utils.format())
          let start = Number(i.startTime.replace(/\s/g, '').replace(/-/g, '').replace(/:/g, ''))
          let end = Number(i.endTime.replace(/\s/g, '').replace(/-/g, '').replace(/:/g, ''))
          if (now < start) {
            i.status = '未开始'
          } else if ((now >= start) && (now <= end)) {
            i.status = '进行中'
          } else {
            i.status = '已结束'
          }
        }
      })
    },
    init2 () {
      let _this = this
      this.$axios.post('/api/attendhistory', {
        params: { account: this.$store.state.account }
      }).then(res => {
        _this.result2 = res.data.data
      })
    }
  },
  mounted () {
    this.init()
    this.init2()
  }
}
</script>
<style lang="less" scoped>
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
