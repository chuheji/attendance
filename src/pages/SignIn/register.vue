<template>
  <div>
    <h1 class="title">注册</h1>
    <van-cell-group>
      <van-field
        v-model="nickname"
        required
        clearable
        label="昵称"
        placeholder="请输入昵称"
      />
      <van-field
        v-model="account"
        required
        clearable
        label="账号"
        placeholder="请输入账号"
      />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
    </van-cell-group>
    <van-button @click="register" class="btn" type="primary" size="large">注册</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nickname: '',
      account: '',
      password: ''
    }
  },
  methods: {
    register () {
      if (!this.nickname || !this.account || !this.password) {
        this.$toast('似乎还有什么没有输入~')
        return false
      }
      if (this.password.length < 6 || this.password.length > 30) {
        this.$toast('密码应为6到30位~')
        return false
      }
      this.$axios.post('/api/register', {
        params: {
          account: this.account,
          password: this.password,
          nickname: this.nickname
        }
      }).then(res => {
        this.$toast(res.data.msg)
        if (res.data.code === 200) {
          this.$router.push('/Login')
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.title{
  margin-left: 1rem;
}
.btn{
  margin-top: 1.5rem;
}
</style>
