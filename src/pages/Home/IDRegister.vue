<template>
  <div>
    <Header name='身份认证'></Header>
    <van-cell-group>
      <van-field
        v-model='account'
        required
        clearable
        label='账号'
        right-icon='question-o'
        placeholder='请输入账号'
        @click-right-icon="$toast('question')"
      />
      <van-field v-model='password' type='password' label='密码' placeholder='请输入密码' required />
    </van-cell-group>
    <van-radio-group v-model='radio'>
      <van-cell-group>
        <van-cell title='我是老师' clickable @click="radio = 'teacher'">
          <van-radio slot='right-icon' name='teacher' />
        </van-cell>
        <van-cell title='我是学生' clickable @click="radio = 'student'">
          <van-radio slot='right-icon' name='student' />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-button @click='login' class='btn' type='primary' size='large'>认证</van-button>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      account: '',
      password: '',
      radio: ''
    }
  },
  components: {
    Header
  },
  methods: {
    login () {
      if (!this.account || !this.password) {
        this.$toast('似乎还有什么没有输入~')
        return false
      }
      if (this.password.length < 6 || this.password.length > 30) {
        this.$toast('密码应为6到30位~')
        return false
      }
      if (!this.radio) {
        let _this = this
        this.$axios
          .post('/api/login', {
            params: {
              account: this.account,
              password: this.password
            }
          })
          .then(res => {
            if (res.data.code === 200) {
              localStorage.setItem('look', false)
              this.$toast(res.data.msg)
              _this.$router.push('/Home')
              _this.$store.commit('LOG_IN', res.data.data)
            } else {
              this.$toast(res.data.msg)
            }
          })
      } else {
        let _this = this
        this.$axios
          .post('/api/loginType', {
            params: {
              account: this.account,
              password: this.password,
              type: this.radio
            }
          })
          .then(res => {
            if (res.data.code === 200) {
              _this.$router.push('/Home')
              _this.$store.commit('LOG_IN', res.data.data)
              this.$toast(res.data.msg)
            } else {
              this.$toast(res.data.msg)
            }
          })
      }
    }
  }
}
</script>
<style lang='less' scoped>
.title {
  margin-left: 1rem
}
p {
  margin-left: 1rem
}
</style>
