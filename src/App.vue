<template>
  <div id="app">
    <router-view/>
    <div style="marginTop: 12rem" v-if="this.$store.state.isLoading" class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <van-tabbar v-if="$route.meta.keepAlive" route active-color="darkorange" inactive-color="#000">
      <van-tabbar-item
        replace
        to="/Home"
        icon="wap-home"
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/Attendance"
        icon="chat"
        :info="message"
      >
        消息
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/Mysetting"
        icon="manager"
      >
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      path: '',
      message: this.$store.state.message
    }
  },
  methods: {
    return () {
      history.go(-1)
    }
  }
}
</script>

<style lang='less'>
.bread{
  padding-left: 1rem;
}
.return {
  display: inline-block;
  .bread{
    padding-left: 2rem;
  }
  .icon {
    position: fixed;
    left: 0.8rem;
    top: 1.2rem;
  }
}
body{
  background-color: #eee;
}
.van-icon-sign {
  color: darkcyan;
}
#van-icon-sign > .van-grid-item__content > .van-grid-item__text {
  color: darkcyan;
}
.van-icon-clock-o {
  color: darkgoldenrod
}
#van-icon-clock-o > .van-grid-item__content > .van-grid-item__text {
  color: darkgoldenrod;
}
.van-icon-todo-list-o {
  color: darkkhaki
}
#van-icon-todo-list-o > .van-grid-item__content > .van-grid-item__text {
  color: darkkhaki
}
.van-icon-records {
  color: darkblue
}
#van-icon-records > .van-grid-item__content > .van-grid-item__text {
  color: darkblue
}
.van-icon-completed {
  color: darkmagenta
}
#van-icon-completed > .van-grid-item__content > .van-grid-item__text {
  color: darkmagenta
}
.van-icon-friends-o {
  color: darkolivegreen
}
#van-icon-friends-o > .van-grid-item__content > .van-grid-item__text {
  color: darkolivegreen
}
.van-icon-user-o {
  color: darkseagreen
}
#van-icon-user-o > .van-grid-item__content > .van-grid-item__text {
  color: darkseagreen
}
.loading{
  width: 80px;
  height: 40px;
  margin: 0 auto;
  margin-top:100px;
}
.loading span{
  display: inline-block;
  width: 8px;
  height: 100%;
  border-radius: 4px;
  background: lightgreen;
  -webkit-animation: load 1s ease infinite;
}
@-webkit-keyframes load{
  0%,100%{
    height: 40px;
    background: lightgreen;
  }
  50%{
    height: 70px;
    margin: -15px 0;
    background: lightblue;
  }
}
.loading span:nth-child(2){
  -webkit-animation-delay:0.2s;
}
.loading span:nth-child(3){
  -webkit-animation-delay:0.4s;
}
.loading span:nth-child(4){
  -webkit-animation-delay:0.6s;
}
.loading span:nth-child(5){
  -webkit-animation-delay:0.8s;
}
</style>
