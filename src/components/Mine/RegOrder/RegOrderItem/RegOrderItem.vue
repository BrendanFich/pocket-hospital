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
    <div class="detail">
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
    </div>
    <div class="btnBox" v-if="status() === '已支付'">
      <van-button type="default" block round @click="cancelRegister">取消预约</van-button>
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
      patCardNo: ''
    }
  },
  created () {
    this.getPatCardNo()
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
    getPatCardNo () {
      this.$post('/api/user/vx_info')
        .then(res => {
          this.patCardNo = res.data.info.visitCardNo
        })
        .catch(err => {
          console.log(err)
        })
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
    pay () {
      let self = this
      this.$post('/api/doctor/payComfirm', { ledgerSn: this.$route.params.ledgerSn })
        .then(res => {
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
    },
    payComfirm (ledgerSn) {
      this.$post('/api/doctor/payComfirm', { ledgerSn })
        .then(res => {
          this.wxPay(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.regOrderItem
  background: $color-page-background
  height: 100vh
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
    margin-top: 20px
    background: #fff
    .title
      padding: 20px 20px
      @include font(30px, 800, $color-title-black)
      border-bottom: 5px solid $color-primary
    .notice
      color: $color-primary
  .btnBox
    margin: 40px
</style>
