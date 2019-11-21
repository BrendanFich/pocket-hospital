<template>
  <div class="iHospital">
    <img src="./img/ihospitalBg.png" alt />
    <div class="btns">
      <router-link to="/iHospital/iSDept">
        <img src="./img/ask.png" />
        <p>在线问诊</p>
      </router-link>
      <router-link to="/iHospital/review">
        <img src="./img/review.png" />
        <p>在线复诊</p>
      </router-link>
      <router-link to="/iHospital">
        <img src="./img/delivery.png" />
        <p>药物配送</p>
      </router-link>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/base/Tabbar/Tabbar'
export default {
  components: { Tabbar },
  data () {
    return {}
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
