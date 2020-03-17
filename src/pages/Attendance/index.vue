<template>
  <div class="container">
    <p class="bread">消息</p>
    <div v-if="message === ''" class="no_message">
      <van-icon class="icon" name="chat-o" />
      <p>暂无消息</p>
    </div>
    <p>{{message}}</p>
    <!-- <div class="box">
      <div class="wrap" v-for="(item, index) in message" :key="index">
        <van-panel use-footer-slot>
          <div class="start">{{item.msg}}</div>
          <div slot="footer">
            <van-button @click="del(item.code)" size="small" type="danger">删除</van-button>
          </div>
        </van-panel>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  mounted () {
    // 登录
    this.sockets.subscribe('relogin', (data) => {
      this.$toast(data.msg)
    })
    // 删除签到
    this.sockets.subscribe('redeattend', (data) => {
      this.$toast(data.msg)
    })
    // 创建签到
    this.sockets.subscribe('reattend', (data) => {
      this.$toast(data.msg)
    })
    // 签到成功
    this.sockets.subscribe('reattendsuccess', (data) => {
      this.$toast(data.msg)
    })
    // 已批准假条
    this.sockets.subscribe('reattendrecord', (data) => {
      this.$toast(data.msg)
    })
    // 新的需批假
    this.sockets.subscribe('reneedrecord', (data) => {
      console.log(data)
      alert(data.msg)
    })
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
