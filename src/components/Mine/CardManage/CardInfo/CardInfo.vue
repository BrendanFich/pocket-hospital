<template>
  <div class="cardInfo">
    <div class="card-qrcode">
      <div id="qrCode" ref="qrCodeDiv" @click="refreshCode"></div>
    </div>
    <van-cell-group>
      <van-cell title="卡类型" :value="cardInfo.visitCardType" />
      <van-cell title="卡号" :value="cardInfo.visitCardNo"/>
      <van-cell title="姓名" :value="cardInfo.patName"/>
      <van-cell title="性别" :value="cardInfo.patSex"/>
      <van-cell title="证件号码" :value="cardInfo.patIdNo"/>
      <van-cell title="手机号" :value="cardInfo.patMobile"/>
    </van-cell-group>

    <van-button type="info" class="btn" color="linear-gradient(to right, #33cab9, #2ce794)" @click="setDefault">设为默认</van-button>
    <van-button type="default" class="btn redBtn" @click="untie">解绑</van-button>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'cardInfo',
  data () {
    return {
      cardInfo: {},
      cardType: '院内就诊卡',
      qrcodeText: '',
      timer: null
    }
  },
  created () {
    this.cardInfo = this.$route.params
    this.cardInfo.patIdNo = this.hiddenSomeNum(this.cardInfo.patIdNo)
    this.cardInfo.patName = this.hiddenSomeName(this.cardInfo.patName)
    this.cardInfo.patMobile = this.hiddenSomePhone(this.cardInfo.patMobile)
    this.qrcodeText = this.cardInfo.visitCardNo
    if (this.cardInfo.visitCardType.indexOf('电子健康卡') !== -1) {
      this.timer = setInterval(() => { this.refreshCode() }, 3 * 60 * 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  watch: {
    qrcodeText (val) {
      this.bindQRCode(val)
    }
  },
  methods: {
    refreshCode () {
      if (this.cardInfo.visitCardType.indexOf('电子健康卡') === -1) return
      let idType = this.cardInfo.patIdType === ' ' ? '01' : this.cardInfo.patIdType
      this.$post(this.$store.state.healthCardBaseUrl + '/web/qrcodequery', {
        healthCardId: this.cardInfo.visitCardNo,
        idType,
        idNumber: this.cardInfo.patIdNo,
        codeType: '0'
      })
        .then(res => {
          if (res.code === 0) {
            this.$refs.qrCodeDiv.innerHTML = ''
            this.qrcodeText = res.data.qrCodeText
            this.$toast({ message: '刷新成功', duration: 1500, className: 'toast' })
          }
        })
        .catch(error => {
          console.log(error)
          this.$toast({ message: '刷新二维码失败', duration: 1500, className: 'toast' })
        })
    },
    bindQRCode (qrcodeText) {
      let width = document.getElementById('qrCode').clientWidth
      return new QRCode(this.$refs.qrCodeDiv, {
        text: qrcodeText,
        width: width,
        height: width,
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L// 容错率，L/M/H
      })
    },
    setDefault () {
      this.$post('/api/pat/changeCard',
        {
          patCardNo: this.cardInfo.visitCardNo,
          patName: this.cardInfo.patName
        })
        .then(res => {
          if (res.code === 0) {
            this.$store.commit('updateDefaultNo', this.cardInfo.visitCardNo)
            this.$toast({ message: '设置成功', duration: 1500, className: 'toast' })
            this.$router.go(-2)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    untie () {
      this.$post('/api/pat/cancelCard', {
        PatientId: Number(this.cardInfo.patId),
        CardType: this.cardInfo.visitCardType,
        patCardNo: this.cardInfo.visitCardNo
      })
        .then(res => {
          if (res.code === 0) {
            this.$toast({ message: '解绑成功', duration: 1500, className: 'toast' })
            this.$router.go(-1)
          }
        })
    },
    // 身份证脱敏
    hiddenSomeNum (idNo) {
      return idNo.replace(/^(.{4})(?:\d+)(.{4})$/, '$1**********$2')
    },
    // 手机脱敏
    hiddenSomePhone (phoneNo) {
      return phoneNo.replace(phoneNo.substring(3, 7), '****')
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
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.cardInfo
  background: $color-page-background
  padding-top: 90px
  padding-bottom: 120px
  height: calc(100% - 90px)
  .card-qrcode
    background: $color-page-background
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
      height: 380px
      width: 380px
      margin: 20px auto
  h2
    color: $color-word-grey
    font-size: 24px
    padding: 25px 40px
  >>>.van-cell__value
    min-width: 70%
  .van-cell:not(:last-child)::after
    right: 16px
  .selectItem
    position: relative
    .isLink
      color: #5adba3
      font-size: 30px
      position: absolute
      top: 27px
      right: 66px
  /deep/ .mint-actionsheet-listitem
    height: 80px
    font-size: 30px
    line-height: 80px
  .attention
    margin-top: 40px
    p
      width: 670px
      margin: 0 auto
      font-size: 24px
      color: $color-word-grey
      line-height: 36px
  .btn
    margin-top: 30px
    margin-left: 50px
    width: 660px
    height: 80px
    border-radius: 10px
    color: $color-white
    font-size: 26px
  .redBtn
    color: #ef372a
    border: 1px solid #ef372a
</style>
