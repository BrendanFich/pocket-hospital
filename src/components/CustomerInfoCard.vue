<template>
  <div class="customerInfoCard">
    <div>
      <img src="@/assets/img/组 27.png" />
      <div class="textInfo" v-if="customerInfo.patName">
        <span class="name">{{customerInfo.patName}}</span>
        <span class="status">默认</span>
        <p class="cardNumber" v-if="customerInfo.visitCardNo === defaultCardNo">就诊卡号：{{customerInfo.visitCardNo}}</p>
        <p class="cardNumber" v-if="customerInfo.socialHosCardNO === defaultCardNo">社保卡号：{{customerInfo.socialHosCardNO}}</p>
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
      defaultCardNo: this.$store.state.userInfo.visitCardNo ? this.$store.state.userInfo.visitCardNo : this.$store.state.userInfo.socialCardNo
    }
  },
  computed: {
    customerInfo () {
      return this.$store.state.patInfo.filter(item => (item.visitCardNo === this.defaultCardNo) || (item.socialHosCardNO === this.defaultCardNo))[0]
    }
  },
  created () {
    this.$store.commit('updateUserPatInfo')
  }
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
