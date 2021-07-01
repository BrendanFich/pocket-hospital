<template>
  <div class="unpayItem">
    <div class="tableContent">
      <div class="title">处方单</div>
      <ul>
        <li class="tableHead">
          <span class="column1">项目名称</span>
          <span class="column2">单价(元)</span>
          <span class="column3">数量</span>
          <span class="column4">金额(元)</span>
        </li>
        <li class="tableData" v-for="(item, index) in list" :key="index">
          <span class="column1">{{ item.itemName }}</span>
          <span class="column2">¥{{ (item.itemPrice/100).toFixed(2) }}</span>
          <span class="column3">{{ Math.round(item.itemNum) }}</span>
          <span class="column4 ">¥{{ (item.itemTotalAmt/100).toFixed(2) }}</span>
        </li>
      </ul>
    </div>
    <div class="detail">
      <div class="title">缴费详情</div>
      <van-cell title="订单号" :value="this.$route.params.hisOrdNum" />
      <van-cell title="总金额" :value="'¥' + (allInfo.totalAmt/100).toFixed(2)" />
      <van-cell title="医保部分金额" :value="'¥' + (allInfo.medInsAmt/100).toFixed(2)" />
      <van-cell title="自费部分金额" :value="'¥' + (allInfo.selfAmt/100).toFixed(2)"></van-cell>
    </div>
    <div class="btnBox">
      <van-button type="primary" block round @click="pay">确认支付</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unpayItem',
  data () {
    return {
      list: [],
      allInfo: {},
      ledgerSn: ''
    }
  },
  created () {
    this.getUnpayItem()
    console.log(this.$store.state)
  },
  computed: {
    visitCardBanding () {
      return localStorage.getItem('visitCardBanding')
    }
  },
  methods: {
    getUnpayItem () {
      this.$post('/api/out_visit/un_pay_order_item/list', {
        patCardNo: this.$route.params.patCardNo,
        hisOrdNum: this.$route.params.hisOrdNum
      })
        .then(res => {
          this.list = res.data.items
          this.allInfo = res.data
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
        console.log(this.$store.state.defaultCardNo)
        this.toBandCardHtml(
          {
            name: this.$store.state.defaultCardPatName,
            idType: '01',
            idNumber: this.$store.state.defaultCardPatIdNo,
            birthday: this.getBirthFormIdNo(this.$store.state.defaultCardPatIdNo),
            nation: this.$store.state.defaultCardNation,
            gender: this.$store.state.defaultCardPatSex,
            phone1: this.$store.state.defaultCardPatMobile,
            address: this.$store.state.defaultCardAddressDetail
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
    async pay () {
      if (!this.$store.state.defaultCardNo) {
        await this.setDefaultCard()
      }
      console.log(this.$store.state.defaultCardNo)
      if (this.$store.state.defaultCardNo.length < 64 && this.visitCardBanding === '0') {
        this.levelUpNotice()
      } else {
        this.$post('/api/out_visit/order/create', {
          patCardNo: this.$route.params.patCardNo,
          hisOrdNum: this.$route.params.hisOrdNum
        })
          .then(res => {
            if (res.code === 0 && res.data.LedgerSn) {
              this.payComfirm(res.data.LedgerSn)
            }
          })
      }
    },
    setDefaultCard () {
      return new Promise((resolve, reject) => {
        this.$post('/api/user/vx_info')
          .then(res => {
            if (res.data.info.visitCardNo) {
              let index = res.data.info.pat_list.findIndex(i => {
                return i.visitCardNo === res.data.info.visitCardNo
              })
              console.log(index > -1 ? res.data.info.pat_list[index] : {})
              this.$store.commit('setDefaultCard', index > -1 ? res.data.info.pat_list[index] : {})
            }
            resolve(true)
          })
          .catch(error => {
            console.log(error)
            resolve(true)
          })
      })
    },
    payComfirm (ledgerSn) {
      this.$post('/api/doctor/payComfirm', {ledgerSn})
        .then(res => {
          console.log(Number(res.data.totalFee))
          console.log(Number(this.allInfo.selfAmt))
          if (res.data.code === 0) {
            if (res.data.totalFee !== 1 && Number(res.data.totalFee) !== Number(this.allInfo.selfAmt)) {
              this.$toast({ message: '支付金额有误，请重试', duration: 1500, className: 'toast' })
              return
            }
          }
          this.wxPay(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    wxPay (config) {
      let self = this
      this.$wx.ready(function () {
        self.$wx.chooseWXPay({
          timestamp: config.timestamp,
          nonceStr: config.nonceStr,
          package: config.package,
          signType: config.signType,
          paySign: config.paySign,
          success: function (res) {
            self.$toast({ message: '支付成功', duration: 1500, className: 'toast' })
            self.$router.go(-2)
          },
          cancel: function (res) {
          }
        })
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.unpayItem
  background: $color-page-background
  min-height: 100vh
  .tableContent
    background: #fff
    .title
      padding: 20px 20px
      @include font(30px, 800, $color-title-black)
      border-bottom: 5px solid $color-primary
    .tableHead
      @include font(25px, 400, $color-value-grey)
      line-height: 34px
      padding-top: 20px
    .tableData
      @include font(25px, 400, $color-black)
      line-height: 32px
      &:nth-child(2n+2)
        background: #EEFFEE
    span
      padding: 20px
    .column1
      flex: 1
    .column2
      width: 100px
      text-align: right
    .column3
      width: 50px
      text-align: center
    .column4
      min-width: 100px
      text-align: right
    li
      display: flex
      justify-content: end
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
    padding: 40px
    margin-bottom: 98px
</style>
