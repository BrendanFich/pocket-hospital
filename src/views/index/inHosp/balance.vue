<template>
  <div class='balance'>
    <div class="showBalance">
      <div class="label">账号余额</div>
      <div class="amount">{{balance}}</div>
    </div>
    <mt-button type="primary" class="btn" @click.native="recharge">充值</mt-button>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  components: {},
  data () {
    return {
      balance: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    getBalance () {
      util.http
        .post('/api/invisit/checkBalance')
        .then(res => {
          this.balance = res.data.balance / 100
        })
        .catch(error => {
          console.log(error)
        })
    },
    recharge () {
      this.$router.push('/inHosp/recharge')
    }
  },
  created () {
    this.getBalance()
  }
}
</script>

<style lang='scss' scoped>
.balance{
  background: #f2f2f2;
  height: 100vh;
  padding-top: 20px;
  .showBalance {
    margin: 0 auto;
    background: url("../../../assets/img/balanceBg.png") no-repeat;
    background-size: 100% 100%;
    width: 694px;
    height: 284px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    .label {
      margin-left: 80px;
      font-size: 26px;
    }
    .amount {
      margin-top: 28px;
      margin-left: 80px;
      font-size: 60px;
      font-weight:bold;
    }
  }
  .btn {
    margin-top: 54px;
    margin-left: 40px;
    width: 670px;
    height: 80px;
    border-radius: 10px;
    background: #09cf74;
    color: #fff;
    font-size: 26px;
  }
  /deep/ .mint-actionsheet-listitem,/deep/ .mint-actionsheet-button {
    height: 80px;
    font-size: 30px;
    line-height: 80px;
  }
}
</style>
