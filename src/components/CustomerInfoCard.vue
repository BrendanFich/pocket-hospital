<template>
  <div class="customerInfoCard">
    <div>
      <img src="@/assets/img/组 27.png" />
      <div class="textInfo">
        <span class="name">张家辉</span>
        <span class="status">默认</span>
        <p class="cardNumber">诊疗卡号：66424801</p>
      </div>
    </div>
    <router-link to="/mine/cardManage">
      <span class="changeCard">切换诊疗卡></span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'customerInfoCard',
  data () {
    return {
      customerInfo: {}
    }
  }
  // created () {
  //   this.$axios
  //     .get(
  //       ' https://www.easy-mock.com/mock/5d8c0d14f97c2b7214e12ce6/example2/example2'
  //     )
  //     .then(res => {
  //       console.log(res.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }
}
</script>

<style lang="scss" scoped>
.customerInfoCard {
  padding: 47px 50px 46px 31px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    img {
      width: 104px;
      margin-right: 30px;
    }
    .textInfo {
      display: block;
      .name {
        color: #666666;
        font-size: 30px;
        font-weight: bold;
      }
      .status {
        margin-left: 17px;
        font-size: 24px;
        color: #ffffff;
        background: #f69343;
        padding: 3px 12px;
        border-radius: 5px;
      }
      .cardNumber {
        margin-top: 12px;
        font-size: 24px;
        color: #999999;
      }
    }
  }
  .changeCard {
    color: #09cf74;
    font-size: 24px;
  }
}
</style>
