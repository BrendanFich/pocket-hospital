<template>
  <div class="confirm">
    <CustomerInfoCard @visitName="getVisitName" @visitCardNo="getVisitCardNo" :temporaryCardNo= temporaryCardNo :temporaryCardPatname = temporaryCardPatname></CustomerInfoCard>
    <div class="orderInfo">
      <ul>
        <li>
          <span class="key">院区</span>
          <span class="value">{{$store.state.area}}</span>
        </li>
        <li>
          <span class="key">科室</span>
          <span class="value">{{$store.state.deptName}}</span>
        </li>
        <li>
          <span class="key">医生</span>
          <span class="value">{{$store.state.doctorName}}</span>
        </li>
        <li>
          <span class="key">就诊日期</span>
          <span class="value">{{$store.state.beginTime.split(' ')[0]}}</span>
        </li>
        <li>
          <span class="key">时间段</span>
          <span class="value">{{$store.state.beginTime.split(' ')[1]+ '-' + $store.state.endTime.split(' ')[1]}}</span>
        </li>
        <li>
          <span class="key">诊金</span>
          <span class="value">{{$store.state.Price/100}}元</span>
        </li>
      </ul>
    </div>
    <div class="notice">温馨提示：微信暂不支持医保结算！</div>
    <mt-button class="confirmBtn" type="primary" @click="confirm">确认挂号</mt-button>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'confirm',
  components: { CustomerInfoCard: () => import('@/base/CustomerInfoCard/CustomerInfoCard') },
  data () {
    return {
      patCardNo: '',
      visitName: '',
      visitCardNo: '',
      temporaryCardNo: '',
      temporaryCardPatname: ''
    }
  },
  methods: {
    getVisitName (visitName) {
      this.visitName = visitName
    },
    getVisitCardNo (visitCardNo) {
      this.visitCardNo = visitCardNo
    },
    payComfirm (ledgerSn) {
      this.$post('/api/doctor/payComfirm', {ledgerSn})
        .then(res => {
          console.log(res)
          this.wxPay(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    wxPay (config) {
      let self = this
      wx.ready(function () {
        wx.chooseWXPay({
          timestamp: config.timestamp,
          nonceStr: config.nonceStr,
          package: config.package,
          signType: config.signType,
          paySign: config.paySign,
          success: function (res) {
            self.$toast({ message: '挂号成功', duration: 1500, className: 'toast' })
            self.$router.go(-4)
          },
          cancel: function (res) {
            self.$toast({ message: '请及时支付挂号费', duration: 1500, className: 'toast' })
            self.$router.go(-4)
          }
        })
      })
    },
    confirm () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '微信端目前只支持自费病人，暂不支持医保结算！如需医保缴费，请前往窗口处排队处理！'
      })
        .then(() => {
          let configdata = {
            beginTime: this.$store.state.beginTime,
            patCardNo: this.visitCardNo,
            deptCode: this.$store.state.deptCode.toString(),
            doctorCode: this.$store.state.doctorCode.toString()
          }
          this.$post('/api/doctor/register', configdata)
            .then(res => {
              if (res.code === 0) {
                this.$toast({
                  message: '提交成功',
                  duration: 1000,
                  className: 'toast'
                })
                this.payComfirm(res.data.LedgerSn)
              } else {
                this.$toast({
                  message: res.msg,
                  duration: 1000,
                  className: 'toast'
                })
              }
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.confirm
  @include main()
  .orderInfo
    margin-top: 22px
    background: $color-white
    ul > li
      height: 88px
      padding: 0 54px 0 43px
      display: flex
      justify-content: space-between
      align-items: center
      border-bottom: 1px solid $color-border
      .key
        color: $color-title-black
        font-size: 30px
        font-weight: bold
      .value
        color: $color-value-grey
        font-size: 30px
  .notice
    font-size: 30px
    margin: 30px
  .confirmBtn
    margin: 0 12.5px 180px
    width: 725px
    height: 80px
    background: $color-primary
    font-size: 30px
</style>
