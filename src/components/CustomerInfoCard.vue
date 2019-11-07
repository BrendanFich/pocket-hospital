<template>
  <div class="customerInfoCard">
    <div>
      <img src="@/assets/img/greenAvatar.png" />
      <div class="textInfo">
        <span class="name">{{$store.state.visitName}}</span>
        <span class="status">默认</span>
        <p class="cardNumber" v-if="$store.state.visitCardNo !== ''">就诊卡号：{{$store.state.userInfo.visitCardNo}}</p>
        <p class="cardNumber" v-if="$store.state.socialCardNo !== ''">社保卡号：{{$store.state.userInfo.socialCardNo}}</p>
      </div>
    </div>
    <router-link to="/mine/cardManage">
      <span class="changeCard">切换诊疗卡></span>
    </router-link>
  </div>
</template>

<script>
// import util from '@/assets/js/util'
export default {
  name: 'customerInfoCard',
  data () {
    return {
    }
  },
  created () {
    // this.$store.commit('updateUserInfo')
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
