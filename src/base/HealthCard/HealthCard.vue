<template>
  <div class="health-card" @click="toCardInfo">
    <img class="card-bg" src="./img/cardnewbg.png" alt="" />
    <div class="card-top-info">
      <div class="card-top-org">广东省卫生健康委员会</div>
      <div class="card-top-title">
        <img src="./img/icon2.png" alt="" />
        <span>{{cardInfo.visitCardType}}</span>
      </div>
    </div>
    <div class="card-detail-info">
      <div class="card-user-info">
        <span class="card-user-name">{{hiddenSomeName(cardInfo.patName)}}</span>
        <span class="card-user-id">{{hiddenSomeNum(cardInfo.patIdNo)}}</span>
      </div>
      <div class="card-qrcode">
        <div id="qrCode" ref="qrCodeDiv"></div>
      </div>
    </div>
    <div class="card-footer">中华人民共和国国家卫生健康委员会监制</div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'HealthCard',
  data () {
    return {
    }
  },
  props: {
    cardInfo: {
      type: Object,
      required: true
    }
  },
  computed: {},
  created () {
    this.$nextTick(function () {
      this.bindQRCode()
    })
  },
  methods: {
    toCardInfo () {
      let params = {
        visitCardType: this.cardInfo.visitCardType || ' ',
        patName: this.cardInfo.patName || ' ',
        patSex: this.cardInfo.patSex || ' ',
        visitCardNo: this.cardInfo.visitCardNo || ' ',
        patIdNo: this.cardInfo.patIdNo || ' ',
        patMobile: this.cardInfo.patMobile || ' ',
        patId: this.cardInfo.patId || ' ',
        patIdType: this.cardInfo.patIdType || ' '
      }
      this.$router.push({
        name: 'cardInfo',
        params
      })
    },
    bindQRCode () {
      let width = document.getElementById('qrCode').clientWidth
      return new QRCode(this.$refs.qrCodeDiv, {
        text: this.cardInfo.visitCardNo,
        width: width,
        height: width,
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L, // 容错率，L/M/H
        logoSrc: '/img/logo_.png',
        logoScale: '500'
      })
    },
    // 身份证脱敏
    hiddenSomeNum (idNo) {
      return idNo.replace(/^(.{4})(?:\d+)(.{4})$/, '$1**********$2')
    },
    // 姓名脱敏
    hiddenSomeName (fullName) {
      if (fullName.length === 2) {
        return fullName.substring(0, 1) + '*' // 截取name 字符串截取第一个字符，
      } else if (fullName.length === 3) {
        return fullName.substring(0, 1) + '*' + fullName.substring(2, 3)// 截取第一个和第三个字符
      } else if (fullName.length > 3) {
        return fullName.substring(0, 1) + '*' + '*' + fullName.substring(3, fullName.length)// 截取第一个和大于第4个字符
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.health-card
  display: block
  height: 3.5rem * 3.3
  width: 6.2rem * 3.3
  position: relative
  color: #000000
  .card-bg
    height: 100%
    width: 100%
    position: absolute
  .card-top-info
    position: absolute
    top: .23rem * 3.3
    width: calc(100% - .27rem * 3.3 - .34rem * 3.3)
    padding: 0 .27rem * 3.3 0 .34rem * 3.3
    display: flex
    justify-content: space-between
    align-items: center
    .card-top-org
      font-size: .18rem * 3.3
      line-height: .25rem * 3.3
    .card-top-title
      display: flex
      align-items: center
      font-size: .3rem * 3.3
      line-height: .42rem * 3.3
      color: #2B2B2B
      img
        height: .55rem * 3.3
        width: .55rem * 3.3
        margin-right: .08rem * 3.3
  .card-detail-info
    position: absolute
    top: 1.24rem * 3.3
    width: calc(100% - .34rem * 3.3 - .15rem * 3.3)
    padding: 0 .15rem * 3.3 0 .34rem * 3.3
    display: flex
    justify-content: space-between
    align-items: flex-end
    .card-user-info
      font-size: .36rem * 3.3
      color: #2B2B2B
      .card-user-name
        height: .5rem * 3.3
        display: flex
        align-items: center
      .card-need-real-name
        background: #D0021B
        border-radius: .165rem * 3.3
        width: 1.02rem * 3.3
        height: .33rem * 3.3
        color: #fff
        font-size: .24rem * 3.3
        text-align: center
        margin-left: .08rem * 3.3
      .card-user-id
        font-size: .3rem * 3.3
        line-height: .3rem * 3.3
        display: block
        padding-top: .12rem * 3.3
    .card-qrcode
      background: #FFFFFF
      padding: .02rem * 3.3
      position: relative
      .card-qrcode-logo
        height: .44rem * 3.3
        width: .44rem * 3.3
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
      #qrCode
        height: 1.54rem * 3.3
        width: 1.54rem * 3.3

  .card-footer
    position: absolute
    font-size: .18rem * 3.3
    bottom: .16rem * 3.3
    left: 50%
    transform: translateX(-50%)
    white-space: nowrap
    letter-spacing: 0
    line-height: .25rem * 3.3
</style>
