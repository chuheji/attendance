<template>
  <div>
    <div class="return">
      <van-icon class="icon" name="arrow-left" />
      <p class='bread'>{{name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String
    }
  },
  mounted () {
    document.querySelector('.return').addEventListener('click', () => {
      history.go(-1)
    })
  }
}
</script>
