<template>
  <div class="iHospital">
    <img src="@/assets/img/ihospitalBg.png" alt />
    <div class="btns">
      <router-link to="/iHospital/iSDept">
        <img src="@/assets/img/ask.png" />
        <p>在线问诊</p>
      </router-link>
      <router-link to="/iHospital/review">
        <img src="@/assets/img/review.png" />
        <p>在线复诊</p>
      </router-link>
      <router-link to="/iHospital">
        <img src="@/assets/img/delivery.png" />
        <p>药物配送</p>
      </router-link>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
export default {
  components: { Tabbar },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.iHospital {
  height: 100vh;
  background: #fff;
  > img {
    display: block;
    margin: 0 auto;
    padding-top: 32px;
    width: 680px;
  }
  .btns {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    img {
      width: 170px;
    }
    p {
      color: #999999;
      font-size: 24px;
      margin-top: -12px;
    }
  }
}
</style>
