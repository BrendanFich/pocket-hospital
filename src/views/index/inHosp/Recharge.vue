<template>
  <div class="recharge">
    <h1>充值金额</h1>
    <mt-field label="￥" type="number" v-model="value"></mt-field>
    <mt-button type="primary" class="btn" @click.native="getWxConig">确认充值</mt-button>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import util from '@/assets/js/util'
export default {
  components: {},
  data () {
    return {
      regInfo: {},
      value: null
    }
  },
  watch: {},
  methods: {
    getWxConig () {
      let money = Number(this.value)
      if (this.value === null || this.value === '' || money === 0) {

      } else if (money < 0.01) {
        this.$toast({ message: '至少充值0.01元', duration: 1500, className: 'toast' })
      } else if (money > 20000) {
        this.$toast({ message: '每日最多充值2万', duration: 1500, className: 'toast' })
      } else {
        util.http
          .post('/api/invisit/payRecharge', {money: money * 100})
          .then(res => {
            this.wxPay(res.data.Records)
          })
          .catch(error => {
            console.log(error)
          })
      }
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
            this.$router.go(-1)
          }
        })
      })
    }
  },
  created () {
    util.http
      .post('/api/invisit/getInPatInfo')
      .then(res => {
        if (res.data.hisOrdNum === '') {
          this.$router.push('/inHosp/inHospReg1')
        } else {
          this.regInfo = res.data
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang='scss' scoped>
.recharge {
  background: #f2f2f2;
  min-height: 100vh;
  h1 {
    color: #999999;
    font-size: 24px;
    padding: 25px 30px;
  }
  >>>.mint-cell-wrapper {
    font-size: 1.5rem;
    line-height: 100px;
    .mint-cell-text {
      padding-bottom: 10px;
      margin-left: 30px;
    }
    .mintui {
      font-size: 1rem;
      margin-right: 10px;
    }
  }
  .btn {
    margin: 0 12.5px;
    margin-top: 92px;
    width: 725px;
    height: 80px;
    background: #09cf74;
    font-size: 30px;
  }
}
</style>
