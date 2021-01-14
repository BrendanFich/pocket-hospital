<template>
  <div class="cardInfo">
    <div class="card-qrcode">
      <div id="qrCode" @click="refreshCode">
        <vue-qr :logoSrc="imageUrl" :logoScale="logoScale" :text="qrcodeText" :margin="8" :logoMargin="2" :colorDark="colorDark" :correctLevel="3"></vue-qr>
      </div>
    </div>
    <van-cell-group>
      <van-cell title="卡类型" :value="cardInfo.visitCardType" />
      <van-cell title="卡号" :value="cardInfo.visitCardNo"/>
      <van-cell title="姓名" :value="hiddenSomeName(cardInfo.patName)"/>
      <van-cell title="性别" :value="cardInfo.patSex"/>
      <van-cell title="证件号码" :value="hiddenSomeNum(cardInfo.patIdNo)"/>
      <van-cell title="手机号" :value="hiddenSomePhone(cardInfo.patMobile)"/>
    </van-cell-group>
    <!-- <van-field name="switch" label="设为默认就诊人">
      <template #input>
        <van-switch v-model="isDefualt" size="20" />
      </template>
    </van-field> -->
    <van-button type="info" class="btn" color="#59dca4" @click="setDefault">设为默认</van-button>
    <van-button type="info" class="btn" color="#658cfe" @click="toCardBag" v-if="cardInfo.visitCardType.includes('电子健康卡') && cardInfo.patIdType === '1'">进入卡包</van-button>
    <van-button type="info" class="btn" color="#59dca4" @click="levelUp" v-else>升级</van-button>
    <van-button type="default" class="btn redBtn" @click="untie">解绑</van-button>
  </div>
</template>

<script>
import vueQr from 'vue-qr'

export default {
  name: 'cardInfo',
  components: {
    vueQr
  },
  data () {
    return {
      cardInfo: {},
      cardType: '院内就诊卡',
      qrcodeText: '',
      qrcodeColor: '',
      timer: null,
      isDefualt: true,
      imageUrl: require('./img/logo_.png'),
      colorDark: '#000',
      logoScale: 0.29
    }
  },
  created () {
    console.log(this.$route.params)

    this.cardInfo = this.$route.params
  },
  mounted () {
    if (this.cardInfo.visitCardType.indexOf('电子健康卡') === -1) {
      this.$nextTick(() => {
        this.bindQRCode(this.$route.params.visitCardNo)
      })
    }
    this.refreshCode(false)
    if (this.cardInfo.visitCardType.indexOf('电子健康卡') !== -1 && this.$store.state.autoFreshQrcode) {
      this.timer = setInterval(() => { this.refreshCode() }, 3 * 60 * 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  watch: {
    qrcodeText (val) {
      this.bindQRCode(val)
    },
    '$store.state.healthCardBaseUrl' () { // 刷新页面时，刷新二维码
      this.refreshCode()
    }
  },
  methods: {
    refreshCode (tip = true) {
      if (this.cardInfo.visitCardType.indexOf('电子健康卡') === -1) return
      if (!this.$store.state.healthCardBaseUrl) return
      this.$post(this.$store.state.healthCardBaseUrl + '/web/qrcodequery', {
        healthCardId: this.cardInfo.visitCardNo,
        idType: this.cardInfo.patIdType,
        idNumber: this.cardInfo.patIdNo,
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
    },
    levelUp () {
      var data = {
        Hometel: this.cardInfo.patMobile,
        Idcardno: this.cardInfo.patIdNo,
        PatName: this.cardInfo.patName,
        PatSex: this.cardInfo.patSex,
        Usercode: this.cardInfo.userCode,
        Username: this.cardInfo.userName,
        VisitCardNo: this.cardInfo.visitCardNo,
        Addressdetail: this.cardInfo.addressDetail === ' ' ? '' : this.cardInfo.addressDetail,
        DateOfBirth: this.getBirthFormIdNo(this.cardInfo.patIdNo),
        Nation: this.cardInfo.nation === ' ' ? '未知' : this.cardInfo.nation
      }
      this.$post('/manager/jkcard/newcard',
        [data])
        .then(res => {
          if (res.Code === '0') {
            this.$toast({
              type: 'success',
              message: '升级成功',
              onClose: () => {
                this.$router.replace({path: '/mine/cardManage'})
              },
              duration: 500
            })
          } else {
            this.$dialog.confirm({
              title: '升级失败',
              message: '是否手动添加健康卡？'
            }).then(() => {
              this.toBandCardHtml(
                {
                  name: this.cardInfo.patName,
                  idType: '01',
                  idNumber: this.cardInfo.patIdNo,
                  birthday: this.getBirthFormIdNo(this.cardInfo.patIdNo),
                  nation: this.cardInfo.nation === ' ' ? '' : this.cardInfo.nation,
                  gender: this.cardInfo.patSex,
                  phone1: this.cardInfo.patMobile,
                  address: this.cardInfo.addressDetail === ' ' ? '' : this.cardInfo.addressDetail
                }
              )
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.$toast.fail(error)
        })
    },
    toBandCardHtml (cardInfo) {
      this.$post('/api/health/addcard/geturl')
        .then(res => {
          if (res.code === 0) {
            window.location = res.data + '?' + JSON.stringify(cardInfo)
          } else {
            alert('获取跳转地址失败')
          }
        })
    },
    setDefault () {
      this.$post('/api/pat/changeCard',
        {
          patCardNo: this.cardInfo.visitCardNo,
          patName: this.cardInfo.patName
        })
        .then(async res => {
          if (res.code === 0) {
            await this.setDefaultCard()
            this.$toast({
              type: 'success',
              message: '设置成功',
              onClose: () => {
                this.$router.replace({path: '/mine/cardManage'})
              },
              duration: 600
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    setDefaultCard () {
      return new Promise((resolve, reject) => {
        this.$post('/api/user/vx_info')
          .then(res => {
            if (res.data.info.visitCardNo) {
              let index = res.data.info.pat_list.findIndex(i => {
                return i.visitCardNo === res.data.info.visitCardNo
              })
              this.$store.commit('setDefaultCard', index > -1 ? res.data.info.pat_list[index] : {})
              resolve()
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    async toCardBag () {
      let orderId = await this.getOrderId()
      this.$post('/api/health/cardbag/geturl', {orderId})
        .then(res => {
          if (res.code === 0) {
            window.location.href = res.data
          } else {
            this.$toast({ message: res.msg, duration: 1500, className: 'toast' })
          }
        })
        .catch(error => {
          this.$toast({ message: error, duration: 1500, className: 'toast' })
        })
    },
    getOrderId () {
      return new Promise((resolve, reject) => {
        this.$post(this.$store.state.healthCardBaseUrl + '/web/cardbagorderid', {
          qrCodeText: this.qrcodeText
        })
          .then(res => {
            if (res.code === 0) {
              resolve(res.data.orderId)
            } else {
              this.$toast({ message: res.msg, duration: 1500, className: 'toast' })
            }
          }).catch(error => {
            this.$toast({ message: error, duration: 1500, className: 'toast' })
          })
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
            this.$toast({
              type: 'success',
              message: '解绑成功',
              onClose: () => {
                this.$router.replace({path: '/mine/cardManage'})
              },
              duration: 600
            })
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
    },
    getBirthFormIdNo (idNo) {
      if (idNo.length === 15) { // 15位身份证
        return '19' + idNo.substring(6, 8) + '-' + idNo.substring(8, 10) + '-' + idNo.substring(10, 12)
      } else if (idNo.length === 18) { // 18位身份证
        return idNo.substring(6, 10) + '-' + idNo.substring(10, 12) + '-' + idNo.substring(12, 14)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.cardInfo
  font-family: PingFangSC-Medium, 'PINGFANG MEDIUM'
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
      img
        height: 380px
        width: 380px
  h2
    color: $color-word-grey
    font-size: 24px
    padding: 25px 40px
  >>>.van-cell__value
    min-width: 81%
  >>>.van-cell:not(:last-child)::after
    right: 16px
  >>>.van-field__label
    width: 120px
  >>>.van-field__control--custom
    justify-content: flex-end
    .van-switch
      margin-right: 16px
    .van-switch--on
      background-color: #2ce794
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
