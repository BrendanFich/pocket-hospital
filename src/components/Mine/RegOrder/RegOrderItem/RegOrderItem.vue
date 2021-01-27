<template>
  <div class="regOrderItem">
    <div class="detail">
      <div class="title">挂号信息</div>
      <van-cell title="科室" :value="regInfo.deptName" />
      <van-cell title="医生" :value="regInfo.doctorName" />
      <van-cell
        title="预约日期"
        :value="regInfo.scheduleDate && regInfo.scheduleDate.split(' ')[0]"
      />
      <van-cell
        title="预约时间"
        :value="timeFormat(regInfo.beginTime,regInfo.endTime)
        "
      />
      <van-cell title="挂号人" :value="regInfo.patName" />
      <van-cell title="挂号费" :value="'¥' + regInfo.regFee / 100" />
      <van-cell title="排队号" :value="regInfo.visit_display_no" />
    </div>
    <div class="detail" style="margin-top:15px">
      <div class="title">缴费详情</div>
      <van-cell
        title="医院名称"
        :value="regInfo.hostpitalName"
      />
      <van-cell title="订单号" :value="$route.params.hisOrdNum" />
      <van-cell
        title="支付状态"
        :value="status()"
      ></van-cell>
    </div>
    <div class="btnBox" v-if="status() === '未支付'">
      <van-button type="primary"  block round @click="pay">确认支付</van-button>
      <!-- <van-button  block round @click="cancelRegister" style="margin-top:15px">退号</van-button> 挂号未支付的不能退号-->
    </div>
    <div class="btnBox" v-if="status() === '已支付'">
      <van-button type="default" block round @click="cancelRegister">退号</van-button>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'regOrderItem',
  data () {
    return {
      regInfo: {},
      allInfo: {},
      ledgerSn: '',
      patCardNo: '',
      cardInfo: {}
    }
  },
  created () {
    this.getPayItem()
  },
  methods: {
    status (backRegistInd, visitFlag) {
      if (this.regInfo.backRegistInd === '1') {
        return '已退号'
      } else {
        if (this.regInfo.visit_id) {
          return '已支付'
        } else {
          return '未支付'
        }
      }
    },
    cancelRegister () {
      this.$post('/api/register/cancelRegister', {
        hisOrderNum: this.regInfo.hisOrdNum
      })
        .then(res => {
          if (res.code === 0) {
            this.$toast({
              message: '退号成功',
              duration: 1500,
              className: 'toast'
            })
            this.getPayItem()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    timeFormat (beginTime, endTime) {
      if (beginTime && endTime) {
        return beginTime.split(' ')[1].split(':').slice(0, 2).join(':') + '-' + endTime.split(' ')[1].split(':').slice(0, 2).join(':')
      }
    },
    getPayItem () {
      this.$post('/api/pat/findRegisterInfo', {
        hisOrdNum: this.$route.params.hisOrdNum
      })
        .then(res => {
          this.regInfo = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getBirthFormIdNo (idNo) {
      if (idNo.length === 15) { // 15位身份证
        return '19' + idNo.substring(6, 8) + '-' + idNo.substring(8, 10) + '-' + idNo.substring(10, 12)
      } else if (idNo.length === 18) { // 18位身份证
        return idNo.substring(6, 10) + '-' + idNo.substring(10, 12) + '-' + idNo.substring(12, 14)
      }
    },
    levelUpNotice () {
      this.$dialog.confirm({
        title: '提示',
        message: '当前卡非健康卡，支付需升级！是否前往升级？'
      }).then(() => {
        this.toBandCardHtml(
          {
            name: this.$store.state.defaultCard.patName,
            idType: '01',
            idNumber: this.$store.state.defaultCard.patIdNo,
            birthday: this.getBirthFormIdNo(this.$store.state.defaultCard.patIdNo),
            nation: this.$store.state.defaultCard.nation,
            gender: this.$store.state.defaultCard.patSex,
            phone1: this.$store.state.defaultCard.patMobile,
            address: this.$store.state.defaultCard.addressDetail
          }
        )
      }).catch(() => {
      })
    },
    toBandCardHtml (cardInfo) {
      this.$post('/api/health/addcard/geturl')
        .then(res => {
          if (res.code === 0) {
            console.log(res.data + encodeURIComponent('?cardinfo=') + btoa(encodeURI(JSON.stringify(cardInfo))))
            window.location = res.data + encodeURIComponent('?cardinfo=') + btoa(encodeURI(JSON.stringify(cardInfo)))
          } else {
            alert('获取跳转地址失败')
          }
        })
    },
    pay () {
      let self = this
      console.log(this.$store.state.defaultCard.visitCardNo.length < 64)
      if (this.$store.state.defaultCard.visitCardNo.length < 64 && this.$store.state.visitCardBanding === '1') {
        this.levelUpNotice()
      } else {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '微信端目前只支持自费病人，暂不支持医保结算！如需医保缴费，请前往窗口处排队处理！'
        })
          .then(() => {
            this.$post('/api/doctor/payComfirm', { ledgerSn: this.$route.params.ledgerSn })
              .then(res => {
                if (Number(res.data.totalFee) !== Number(this.regInfo.regFee)) {
                  this.$toast({ message: '支付金额有误，请重试', duration: 1500, className: 'toast' })
                  return
                }
                wx.ready(function () {
                  wx.chooseWXPay({
                    timestamp: res.data.timestamp,
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: res.data.signType,
                    paySign: res.data.paySign,
                    success: res => {
                      self.getPayItem()
                    }
                  })
                })
              })
              .catch(error => {
                console.log(error)
              })
          })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.regOrderItem
  background: $color-page-background
  padding-top: 90px
  height: calc(100vh - 98px)
  overflow: auto
  &::-webkit-scrollbar
    display: none
  .tableContent
    background: #fff
    .title
      padding: 20px 20px
      @include font(30px, 800, $color-title-black)
      border-bottom: 5px solid $color-primary
    .tableHead
      @include font(25px, 400, $color-value-grey)
    .tableData
      @include font(25px, 400, $color-black)
    span
      padding: 20px
    .column1
      width: 200px
    .column2,.column3,.column4
      flex: 1
      text-align: center
    li
      display: flex
      justify-content: space-between
      align-items: center
      border-bottom: 1px solid $color-border
  .detail
    background: #fff
    .title
      padding: 20px 20px
      @include font(30px, 800, $color-title-black)
      border-bottom: 5px solid $color-primary
    .notice
      color: $color-primary
  .btnBox
    padding: 40px 40px 28px
</style>
