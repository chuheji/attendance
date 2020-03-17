<template>
  <div>
    <Header name='上传头像'></Header>
    <van-uploader :before-read="beforeRead" class="upload" preview-size='150px' :after-read='onRead' v-model='fileList' multiple :max-count='1' />
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  data () {
    return {
      fileList: []
    }
  },
  components: {
    Header
  },
  methods: {
    beforeRead (file) {
      console.log(file.type)
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
        return true
      } else {
        this.$toast('请上传正确格式的图片')
        return false
      }
    },
    onRead (file) {
      let formData = new FormData()
      formData.append('avatar', file.file)
      let data = {
        account: this.$store.state.account
      }
      this.$axios.post('/api/upload', formData, {
        params: data
      }, {
        headers: {
          'enctype': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$toast('上传成功')
          console.log(res.data.path)
          this.$store.commit('UPLOAD_AVATAR', res.data.path)
          this.$router.push('/MySetting')
          history.go(0)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .upload {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
  }
</style>
