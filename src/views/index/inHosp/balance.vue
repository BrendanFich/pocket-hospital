<template>
  <div class='balance'>
    <div class="showBalance">
      <div class="label">账号余额</div>
      <div class="amount">{{this.$store.state.userInfo.balance === '' ? '0' : this.$store.state.userInfo.balance}}</div>
    </div>
    <mt-button type="primary" class="btn" @click.native="recharge">充值</mt-button>
  </div>
</template>

<script>
import util from '@/assets/js/util'
import wx from 'weixin-js-sdk'
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    recharge () {
      this.$messagebox.prompt('请输入充值金额（单位：元）', {
        inputValidator: (val) => {
          if (!isNaN(Number(val))) {
            return true
          } else {
            return false
          }
        },
        inputErrorMessage: '无效金额'
      }).then((val) => {
        console.log(val)
        this.getWxConig(Number(val.value))
      })
    },
    getWxConig (money) {
      util.http
        .post('/api/invisit/payRecharge', {money})
        .then(res => {
          this.wxPay(res.Records)
        })
        .catch(error => {
          console.log(error)
        })
    },
    wxPay (config) {
      wx.ready(function () {
        wx.chooseWXPay({
          timestamp: config.timestamp,
          nonceStr: config.nonceStr,
          package: config.package,
          signType: config.signType,
          paySign: config.paySign,
          success: function (res) {
            console.log('支付成功后的回调函数')
            console.log(res)
          }
        })
      })
    }
  },
  created () {}
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
