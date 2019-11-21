<template>
  <div class="confirm">
    <CustomerInfoCard v-on:sendCardNo='getPatCardNo'></CustomerInfoCard>
    <div class="orderInfo">
      <ul>
        <li>
          <span class="key">院区</span>
          <span class="value">全院</span>
        </li>
        <li>
          <span class="key">科室</span>
          <span class="value">{{$store.state.selectedDeptName}}</span>
        </li>
        <li>
          <span class="key">医生</span>
          <span class="value">{{$store.state.selectedDocName}}</span>
        </li>
        <li>
          <span class="key">就诊日期</span>
          <span class="value">{{$store.state.selectedDate}}</span>
        </li>
        <li>
          <span class="key">时间段</span>
          <span class="value">{{$store.state.beginTime+ '-' + $store.state.endTime}}</span>
        </li>
        <li>
          <span class="key">诊查费</span>
          <span class="value">{{$store.state.price}}</span>
        </li>
      </ul>
    </div>
    <mt-button class="confirmBtn" type="primary" @click="confirm">确认挂号</mt-button>
  </div>
</template>

<script>
import CustomerInfoCard from '@/base/CustomerInfoCard/CustomerInfoCard'
import util from '@/assets/js/util'
import wx from 'weixin-js-sdk'
export default {
  name: 'confirm',
  components: { CustomerInfoCard },
  data () {
    return {
      patCardNo: ''
    }
  },
  methods: {
    getPatCardNo (patCardNo) {
      this.patCardNo = patCardNo
    },
    payComfirm (ledgerSn) {
      util.http
        .post('/api/doctor/payComfirm', {ledgerSn})
        .then(res => {
          console.log(res)
          this.wxPay(res.data.Records)
        })
        .catch(error => {
          console.log(error)
        })
    },
    wxPay (config) {
      let self = this
      wx.ready(function () {
        wx.chooseWXPay({
          timestamp: config.timeStamp,
          nonceStr: config.nonceStr,
          package: config.package,
          signType: config.signType,
          paySign: config.paySign,
          success: function (res) {
            self.$toast({ message: '挂号成功', duration: 1500, className: 'toast' })
            self.$router.push('/index')
          },
          cancel: function (res) {
            self.$toast({ message: '挂号成功，请及时支付挂号费', duration: 1500, className: 'toast' })
            self.$router.push('/index')
          }
        })
      })
    },
    confirm () {
      let configdata = {
        deptCode: this.$store.state.selectedDeptCode,
        deptName: this.$store.state.selectedDeptName,
        doctorName: this.$store.state.selectedDocName,
        doctorCode: '0' + this.$store.state.selectedDocCode.toString(),
        scheduleDate: this.$store.state.selectedDate,
        timeFlag: this.$store.state.timeFlag,
        regFee: this.$store.state.price.toString(),
        patName: this.$store.state.visitName,
        patCardNo: this.patCardNo,
        beginTime: this.$store.state.beginTime,
        endTime: this.$store.state.endTime,
        hostpitalName: '全院',
        patCardType: (this.$store.state.visitCardNo === '') ? '2' : '1'
      }
      this.$indicator.open()
      util.http
        .post('/api/doctor/currentDayRegister', configdata)
        .then(res => {
          if (res.code === 0) {
            this.payComfirm(res.data.Records[0].LedgerSn)
            this.$indicator.close()
          } else {
            this.$indicator.close()
            if (res.msg === '当前有正在进行的预约挂号..') {
              this.$toast({
                message: res.msg,
                duration: 1000,
                className: 'toast'
              })
            } else {
              this.$toast({
                message: '提交失败',
                duration: 1000,
                className: 'toast'
              })
            }
          }
        })
        .catch(error => {
          this.$indicator.close()
          this.$toast({
            message: '提交失败',
            duration: 1000,
            className: 'toast'
          })
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.confirm
  @include page($color-page-background)
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
