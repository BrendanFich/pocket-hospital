<template>
  <div class="customerInfoCard">
    <div class="firstUse" v-if="isShowBandTips">
      <router-link class="text" to="/mine/cardManage">
        添加就诊人，点击绑定
      </router-link>
    </div>

    <div class="banded" v-else>
      <div @click="showQRcode">
        <img src="./img/greenAvatar.png" />
        <div class="textInfo">
          <span class="name">{{defualtCard.patName}} <span class="status">默认</span></span>
          <p class="cardNumber">{{defualtCard.visitCardNo.length >= 64 ? '健康卡号：' : '就诊卡号：'}}{{defualtCard.visitCardNo.substring(0, 64)}}</p>
        </div>
      </div>
      <router-link to="/mine/cardManage">
        <span class="changeCard">就诊人管理></span>
      </router-link>
    </div>
    <van-popup v-model="show">
      <div class="card-qrcode">
        <div id="qrCode" @click="refreshCode">
          <vue-qr :logoSrc="imageUrl" :logoScale="logoScale" :text="qrcodeText" :margin="8" :logoMargin="2" :colorDark="colorDark" :correctLevel="3"></vue-qr>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'customerInfoCard',
  data () {
    return {
      defualtCard: {},
      imageUrl: require('./img/logo_.png'),
      logoScale: 0.29,
      patIdNo: '',
      inPatId: '',
      isShowBandTips: false,
      show: false
    }
  },
  props: {
    temporaryCardNo: String,
    temporaryCardPatname: String
  },
  computed: {
    healthCardBaseUrl () {
      return localStorage.getItem('healthCardBaseUrl')
    }
  },
  created () {
    if (this.temporaryCardNo) {
      this.$emit('visitName', this.temporaryCardPatname)
      this.$emit('visitCardNo', this.temporaryCardNo)
    } else {
      this.$post('/api/user/vx_info').then(res => {
        if (res.code === 0) {
          this.defualtCard = Array.isArray(res.data.info.pat_list) && res.data.info.pat_list.find(i => {
            return res.data.info.visitCardNo === i.visitCardNo
          })
          this.$emit('getDefualtCard', this.defualtCard)
          if (res.data.info.visitName === '') {
            this.isShowBandTips = true
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  methods: {
    showQRcode () {
      if (this.defualtCard.visitCardNo.length >= 64 && this.healthCardBaseUrl) {
        this.refreshCode()
      } else {
        this.bindQRCode(this.defualtCard.visitCardNo)
      }
      this.show = true
    },
    refreshCode (tip = true) {
      this.$post(this.healthCardBaseUrl + '/web/qrcodequery', {
        healthCardId: this.defualtCard.visitCardNo,
        idType: this.defualtCard.patIdType,
        idNumber: this.defualtCard.patIdNo,
        codeType: '0' // 0动态码 1静态码
      })
        .then(res => {
          if (res.code === 0) {
            this.qrcodeColor = res.data.color
            this.qrcodeText = res.data.qrCodeText
            tip && this.$toast({ message: '刷新成功', duration: 1500, className: 'toast' })
          }
        })
        .catch(error => {
          console.log(error)
          this.$toast({ message: '刷新二维码失败', duration: 1500, className: 'toast' })
        })
    },
    bindQRCode (qrcodeText) {
      this.qrcodeText = qrcodeText
      if (this.qrcodeColor === 0) {
        this.colorDark = '#000000'
      } else if (this.qrcodeColor === 1) {
        this.colorDark = '#6bb169'
      } else if (this.qrcodeColor === 2) {
        this.colorDark = '#f5c443'
      } else if (this.qrcodeColor === 3) {
        this.colorDark = '#e93423'
      } else {
        this.colorDark = '#000000'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.customerInfoCard
  .banded
    padding: 47px 50px 46px 31px
    background: #fff
    display: flex
    align-items: center
    justify-content: space-between
    div
      display: flex
      align-items: center
      img
        width: 104px
        margin-right: 30px
      .textInfo
        display: flex
        align-items: start
        flex-direction: column
        justify-content: space-around
        .name
          color: #666666
          font-size: 30px
          font-weight: bold
        .status
          margin-left: 17px
          font-size: 24px
          color: #ffffff
          background: #f69343
          padding: 3px 12px
          border-radius: 5px
        .cardNumber
          word-wrap: break-word
          width: 360px
          margin-top: 12px
          font-size: 24px
          color: #999999
    .changeCard
      color: #09cf74
      font-size: 24px
  .firstUse
    height: 150px
    background: #09cf74
    display: flex
    justify-content: center
    align-items: center
    .text
      font-size: 30px
      color: #fff
      border: 3px solid #fff
      padding: 20px 30px
      border-radius: 30px
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
      img
        height: 380px
        width: 380px
</style>
