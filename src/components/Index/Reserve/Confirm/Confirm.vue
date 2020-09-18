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
    <!-- <div class="count-down-tip" v-if="ledgerSn">请在{{ `${day}天 ${hr}小时 ${min}分钟 ${sec}分钟` }}内支付完成</div> -->
    <count-down :endTime="endTime" endText="已经结束了" :callback="callback"></count-down>
    <mt-button class="confirmBtn" type="primary" @click="confirm" v-if="!ledgerSn">确认预约</mt-button>
    <mt-button class="confirmBtn" type="primary" @click="payComfirm" v-if="ledgerSn">确认支付</mt-button>
  </div>
</template>

<script>
import CountDown from '@/base/CountDown/CountDown'
import wx from 'weixin-js-sdk'
export default {
  name: 'confirm',
  components: { CustomerInfoCard: () => import('@/base/CustomerInfoCard/CustomerInfoCard'), CountDown },
  data () {
    return {
      endTime: Date.parse(new Date()) + 15 * 60 * 1000,
      ledgerSn: '',
      patCardNo: '',
      visitName: '',
      visitCardNo: '',
      temporaryCardNo: '',
      temporaryCardPatname: ''
    }
  },
  methods: {
    callback () {

    },
    getVisitName (visitName) {
      this.visitName = visitName
    },
    getVisitCardNo (visitCardNo) {
      this.visitCardNo = visitCardNo
    },
    payComfirm () {
      this.countdown()
      this.$post('/api/doctor/payComfirm', {ledgerSn: this.ledgerSn})
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
              message: '预约成功',
              duration: 1000,
              className: 'toast'
            })
            this.ledgerSn = res.data.LedgerSn
            // this.payComfirm(res.data.LedgerSn)
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
    },
    timeFormat (param) {
      return param < 10 ? '0' + param : param
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
  .confirmBtn
    margin: 0 12.5px
    margin-top: 92px
    width: 725px
    height: 80px
    background: $color-primary
    font-size: 30px
</style>
