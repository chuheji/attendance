<template>
  <div>
    <Header name='修改昵称'></Header>
    <van-cell-group>
      <van-field
        v-model="nickname"
        required
        clearable
        label="新昵称"
        placeholder="请输入新昵称"
      />
    </van-cell-group>
    <van-button @click="submit" class="btn" type="primary" size="large">提交</van-button>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      nickname: ''
    }
  },
  components: {
    Header
  },
  methods: {
    submit () {
      if (this.nickname === '') {
        this.$toast('请输入新昵称')
        return false
      } else {
        this.$axios.post('/api/changenick', {
          params: {account: this.$store.state.account, nickname: this.nickname}
        }).then(res => {
          if (res.data.code === 200) {
            this.$toast('修改成功')
            let temp = JSON.parse(localStorage.getItem('info'))
            for (let item in temp) {
              if (item === 'nickname') {
                temp[item] = this.nickname
              }
            }
            localStorage.setItem('info', JSON.stringify(temp))
            history.go(0)
          }
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
