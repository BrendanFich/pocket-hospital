<template>
  <div class="bindCard">
    <h2>就诊卡信息</h2>
    <div @click="showOption(0)" class="selectItem">
      <mt-field label="卡类型" v-model="cardTypeWord" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="卡号" placeholder="请输入7位数卡号" type="number" v-model="cardNum" :disableClear="true"></mt-field>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="name" :disableClear="true"></mt-field>

    <div @click="showOption(1)" class="selectItem">
      <mt-field label="证件类型" v-model="paperwork" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="证件号码" placeholder="请输入证件号码" type="string" v-model="idNum" :disableClear="true"></mt-field>
    <mt-actionsheet :actions="actions1" v-model="sheet1Visible"></mt-actionsheet>
    <mt-actionsheet :actions="actions2" v-model="sheet2Visible"></mt-actionsheet>
    <div class="attention">
      <h2>注意事项</h2>
      <p>
        每个微信号可建多个档，每个档仅可以绑定一张就诊卡或医保卡，建档和绑卡时使用的信息须保持一致，就诊卡需要到医院窗口办理。
      </p>
    </div>

    <mt-button type="primary" class="btn" @click.native="handleClick">确定</mt-button>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/base/Tabbar/Tabbar'
import util from '@/assets/js/util'

export default {
  name: 'bindCard',
  data () {
    return {
      sheet1Visible: false,
      sheet2Visible: false,
      cardTypeWord: this.$route.params.cardTypeWord,
      paperwork: '二代身份证',
      cardNum: '',
      idNum: '',
      name: '',
      actions1: [
        { name: '就诊卡', method: this.sCardStyle0 },
        { name: '社保卡', method: this.sCardStyle1 }
      ],
      actions2: [
        { name: '二代身份证', method: this.sPaperwork0 },
        { name: '港澳居民身份证', method: this.sPaperwork1 },
        { name: '台湾居民身份证', method: this.sPaperwork2 },
        { name: '护照', method: this.sPaperwork3 }
      ]
    }
  },
  components: { Tabbar },
  created () {
    this.idNum = this.$route.params.patIdNo ? this.$route.params.patIdNo : ''
    this.name = this.$route.params.patName ? this.$route.params.patName : ''
    this.$store.commit('updateUserPatInfo')
  },
  computed: {
    cardType () {
      return this.cardTypeWord === '就诊卡' ? '1' : '2'
    },
    patIdType () {
      if (this.paperwork === this.actions2[0].name) {
        return '1'
      }
      if (this.paperwork === this.actions2[1].name) {
        return '2'
      }
      if (this.paperwork === this.actions2[2].name) {
        return '3'
      }
      if (this.paperwork === this.actions2[3].name) {
        return '4'
      }
    }
  },
  methods: {
    showOption (index) {
      if (index === 0) {
        this.sheet1Visible = true
      }
      if (index === 1) {
        this.sheet2Visible = true
      }
    },
    sCardStyle0 () {
      this.cardTypeWord = this.actions1[0].name
    },
    sCardStyle1 () {
      this.cardTypeWord = this.actions1[1].name
    },
    sPaperwork0 () {
      this.paperwork = this.actions2[0].name
    },
    sPaperwork1 () {
      this.paperwork = this.actions2[1].name
    },
    sPaperwork2 () {
      this.paperwork = this.actions2[2].name
    },
    sPaperwork3 () {
      this.paperwork = this.actions2[3].name
    },
    handleClick () {
      const duration = 1500
      const className = 'toast'
      const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      let allPatInfo = this.$store.state.patInfoBinded.concat(this.$store.state.patInfoNobind)
      if (this.cardNum && this.name && this.idNum) {
        if (allPatInfo !== []) {
          allPatInfo.forEach(item => {
            if (item.patIdNo === this.idNum) {
              console.log(item.mPIId)
              this.patientId = item.mPIId
            }
          })
        }
        let reqData = {
          patientId: parseInt(this.patientId),
          cardType: this.cardType,
          patCardNo: this.cardNum,
          patName: this.name,
          patIdType: this.patIdType,
          patIdNo: this.idNum
        }
        if (this.cardNum.length !== 7) {
          this.$toast({ message: '就诊卡号为7位数', duration, className })
        } else if (!p.test(this.idNum) && this.paperwork === '身份证') {
          this.$toast({ message: '身份证号有误', duration, className })
        } else {
          util.http
            .post('/api/pat/bindCard', reqData)
            .then(res => {
              if (res.code === 0) {
                if (res.data.Code === '-1' && res.data.Message === '卡号已存在') {
                  this.$toast({ message: res.data.Message, duration, className })
                } else {
                  this.$store.commit('updateUserInfo')
                  this.$toast({ message: '绑定成功', duration, className })
                  this.$router.push({ path: '/mine/cardManage' })
                }
              } else if (res.code === 500 && res.msg === '卡号已绑定') {
                this.$toast({ message: res.msg, duration, className })
              } else if (res.code === 400 && res.msg === 'PatientId参数必填;') {
                this.$toast({ message: '未建档，请先建档', duration: 2000, className })
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        this.$toast({ message: '请完整填写所有信息', duration, className })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.bindCard
  @include page($color-page-background)
  h2
    color: $color-word-grey
    font-size: 24px
    padding: 25px 40px
  .mint-field
    /deep/ .mint-cell-wrapper
      padding: 0
      height: 88px
      font-size: 30px
      font-weight: bold
      .mint-cell-title
        color: #44a0f5
        width: 168px
        padding-left: 40px
  .selectItem
    position: relative
    .isLink
      color: #5adba3
      font-size: 30px
      position: absolute
      top: 27px
      right: 66px
  /deep/ .mint-actionsheet-listitem,/deep/ .mint-actionsheet-button
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
    margin: 0 auto
    margin-top: 54px
    margin-left: 12.5px
    width: 725px
    height: 80px
    border-radius: 10px
    background: $color-primary
    color: $color-white
    font-size: 26px
</style>
