<template>
  <div class="customerInfoCard">
    <div>
      <img src="@/assets/img/组 27.png" />
      <div class="textInfo" v-if="isReceivedData">
        <span class="name">{{customerInfo.patName}}</span>
        <span class="status">默认</span>
        <p class="cardNumber" v-if="customerInfo.visitCardNo === defaultCardNo">就诊卡号：{{showNo}}</p>
        <p class="cardNumber" v-if="customerInfo.socialHosCardNO === defaultCardNo">社保卡号：{{showNo}}</p>
      </div>
    </div>
    <router-link to="/mine/cardManage">
      <span class="changeCard">切换诊疗卡></span>
    </router-link>
  </div>
</template>

<script>
import util from '@/utils/util'

export default {
  name: 'customerInfoCard',
  data () {
    return {
      isReceivedData: false,
      defaultCardNo: this.$store.state.userInfo.visitCardNo
    }
  },
  computed: {
    customerInfo () {
      return this.$store.state.patInfo.filter(item => (item.visitCardNo === this.defaultCardNo) || (item.socialHosCardNO === this.defaultCardNo))[0]
    },
    showNo () {
      return this.customerInfo.visitCardNo === this.defaultCardNo ? this.customerInfo.visitCardNo : this.customerInfo.socialHosCardNO
    }
  },
  created () {
    util.http
      .post('/api/pat/pat_info')
      .then(res => {
        this.$store.commit('updateUserPatInfo', res.data)
        this.$store.commit('updateUserInfo')
        this.isReceivedData = true
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted () {
    console.log(this.defaultCardNo)
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
