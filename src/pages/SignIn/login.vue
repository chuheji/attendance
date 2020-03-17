<template>
  <div>
    <h1 class="title">登录</h1>
    <van-cell-group>
      <van-field
        v-model="account"
        required
        clearable
        label="账号"
        placeholder="请输入账号"
      />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
    </van-cell-group>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="我是老师" clickable @click="radio = 'teacher'">
          <van-radio slot="right-icon" name="teacher" />
        </van-cell>
        <van-cell title="我是学生" clickable @click="radio = 'student'">
          <van-radio slot="right-icon" name="student" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <!-- <router-link to="/Register"><p>点击注册游客账号</p></router-link> -->
    <van-button @click="login" class="btn" type="primary" size="large">登录</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      account: '',
      password: '',
      radio: ''
    }
  },
  methods: {
    login () {
      let _this = this
      if (!this.account || !this.password) {
        this.$toast('似乎还有什么没有输入~')
        return false
      }
      if (this.password.length < 6 || this.password.length > 30) {
        this.$toast('密码应为6到30位~')
        return false
      }
      if (!this.radio) {
        this.$axios.post('/api/login', {
          params: {
            account: this.account,
            password: this.password
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$toast(res.data.msg)
            this.$router.push('/Home')
            this.$store.commit('LOG_IN', res.data.data)
          } else {
            this.$toast(res.data.msg)
          }
        })
      } else {
        this.$axios.post('/api/loginType', {
          params: {
            account: this.account,
            password: this.password,
            type: this.radio
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$store.commit('LOG_IN', res.data.data)
            this.$socket.emit('login', {
              tokens: this.account,
              account: this.account,
              type: this.radio
            })
            this.$toast(res.data.msg)
            _this.$router.push('/Home').catch(err => {
              console.log(err)
            })
          } else {
            this.$toast(res.data.msg)
          }
        }).catch(err => {
          throw err
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.title{
  margin-left: 1rem;
}
p{
  margin-left: 1rem;
}
</style>
