<template>
  <div class="container">
    <p class="bread">我的</p>
    <div class="user">
      <img @click="show = true" :src="avatar" alt="">
      <p @click="show = true">{{nickname}}</p>
    </div>
    <van-cell-group>
      <van-cell v-for="(item, index) in list" :key="index" v-show="item.show" :title="item.title" is-link :url="item.url" />
    </van-cell-group>
    <van-cell-group class="logout">
      <van-cell value="退出登录" @click="logout"/>
    </van-cell-group>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>
</template>
<script>
import { clearCookie } from '../../common/cookie'
export default {
  data () {
    return {
      nickname: this.$store.state.nickname,
      list: [
        {title: '创建签到', url: '/#/MySetting/SetUp', show: this.$store.state.type === 'teacher'},
        {title: '我创建的签到', url: '/#/MySetting/SetUped', show: this.$store.state.type === 'teacher'},
        {title: '我参与的签到', url: '/#/MySetting/Join', show: this.$store.state.type === 'student'}
      ],
      avatar: '',
      show: false,
      actions: [
        { name: '更换头像' },
        { name: '修改密码' }
      ]
    }
  },
  mounted () {
    let path = this.$store.state.Path
    if (path && path !== '') {
      this.avatar = require(`../../../server/upload/${path}`)
    } else {
      this.avatar = require('../../assets/logo.png')
    }
  },
  methods: {
    onSelect (item) {
      this.show = false
      if (item.name === '更换头像') {
        this.$router.push('/MySetting/UploadImg')
      } else if (item.name === '更改昵称') {
        this.$router.push('/MySetting/ChangeNick')
      } else if (item.name === '修改密码') {
        this.$router.push('/MySetting/ChangePwd')
      }
    },
    onCancel () {
      this.show = false
    },
    logout () {
      this.$dialog.confirm({
        title: '退出登录',
        message: '确定退出登录吗'
      }).then(() => {
        clearCookie()
        this.$router.push('/Login')
      }).catch(() => {
        this.$toast('已取消')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container{
  background-color: #eee;
  p{
    margin: 0;
    padding-top: 1rem;
  }
}
.user{
  width: 100%;
  height: 10rem;
  position: relative;
  img{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border-color: #000;
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: -2rem;
    margin-top: -2rem;
    background-color: #fff;
  }
  p {
    text-align: center;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 65%;
  }
}
.logout{
  margin-top: 2rem;
  span{
    color:#e4393c
  }
}
</style>
