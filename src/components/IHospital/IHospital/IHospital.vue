<template>
  <div class="iHospital">
    <img src="./img/ihospitalBg.png" alt />
    <div class="btns">
      <div @click="linkTo('')">
        <img src="./img/ask.png" />
        <p>在线问诊</p>
      </div>
      <div @click="linkTo('')">
        <img src="./img/review.png" />
        <p>在线复诊</p>
      </div>
      <div @click="linkTo('')">
        <img src="./img/delivery.png" />
        <p>药物配送</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    linkTo (path) {
      if (path) {
        this.$router.push(path)
      } else {
        this.$toast.fail('尚未开发')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.iHospital
  @include page($color-page-background)
  > img
    display: block
    margin: 0 auto
    padding-top: 32px
    width: 680px
  .btns
    margin-top: 40px
    display: flex
    justify-content: space-around
    align-items: center
    text-align: center
    img
      width: 170px
    p
      color: $color-word-grey
      font-size: 24px
      margin-top: -12px
</style>
