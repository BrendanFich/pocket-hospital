<template>
  <div class="internetHospital">
    <div class="internetHospital">
      <img src="@/assets/img/组 20.png" alt />
      <div class="btns">
        <router-link to="/inquiryOnline">
          <img src="@/assets/img/组 20(1).png" />
          <p>在线问诊</p>
        </router-link>
        <router-link to="/">
          <img src="@/assets/img/组 20(2).png" />
          <p>在线复诊</p>
        </router-link>
        <router-link to="/">
          <img src="@/assets/img/组 20(3).png" />
          <p>药物配送</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InternetHospital',
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.internetHospital {
  > img {
    display: block;
    margin: 0 auto;
    margin-top: 32px;
    width: 680px;
    height: 282px;
  }
  .btns {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    img {
      width: 170px;
      height: 170px;
    }
    p {
      color: #999999;
      font-size: 24px;
      margin-top: -12px;
    }
  }
}
</style>
