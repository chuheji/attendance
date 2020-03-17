<template>
  <div>
    <Header name='修改密码'></Header>
    <van-cell-group>
      <van-field v-model="opassword" type="password" label="旧密码" placeholder="请输入旧密码" required/>
      <van-field v-model="npassword" type="password" label="新密码" placeholder="请输入新密码" required/>
    </van-cell-group>
    <van-button @click="submit" class="btn" type="primary" size="large">提交</van-button>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      opassword: '',
      npassword: ''
    }
  },
  components: {
    Header
  },
  methods: {
    submit () {
      let _this = this
      if (this.opassword === '' || this.npassword === '') {
        this.$toast('似乎有什么没有输入')
        return false
      } else {
        this.$axios.post('/api/rightpwd', {
          params: {
            account: this.$store.state.account,
            opassword: _this.opassword
          }
        }).then(res => {
          if (res.data.code === 250) {
            this.$toast(res.data.msg)
            return false
          } else if (res.data.code === 200) {
            this.$axios.post('/api/changepwd', {
              params: {
                account: this.$store.state.account,
                npassword: this.npassword
              }
            }).then(res => {
              this.$toast(res.data.msg)
              this.$router.push('/Mysetting')
            })
          }
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
