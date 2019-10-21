<template>
  <div class="customerInfoCard">
    <div>
      <img src="@/assets/img/组 27.png" />
      <div class="textInfo" v-if="isReceivedData">
        <span class="name">{{customerInfo.patName}}</span>
        <span class="status">默认</span>
        <p class="cardNumber">诊疗卡号：{{customerInfo.visitCardNo}}</p>
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
      isReceivedData: false
    }
  },
  computed: {
    customerInfo () {
      return this.$store.state.patInfo.filter(item => item.visitCardNo === this.$store.state.userInfo.visitCardNo)[0]
    }
  },
  created () {
    util.http
      .post('/api/pat/pat_info')
      .then(res => {
        this.$store.commit('updateUserPatInfo', res.data)
        this.isReceivedData = true
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
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
