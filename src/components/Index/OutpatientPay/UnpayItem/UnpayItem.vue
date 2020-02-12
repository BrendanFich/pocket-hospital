<template>
  <div class="unpayItem">
    <div class="tableContent">
      <div class="title">处方单</div>
      <ul>
        <li class="tableHead">
          <span class="column1">项目名称</span>
          <span class="column2">单价(元)</span>
          <span class="column3">数量</span>
          <span class="column3">金额(元)</span>
        </li>
        <li class="tableData" v-for="(item, index) in list" :key="index">
          <span class="column1">{{ item.itemName }}</span>
          <span class="column2">¥{{ (item.itemPrice/100).toFixed(2) }}</span>
          <span class="column3">{{ Math.round(item.itemNum) }}</span>
          <span class="column3 ">¥{{ (item.itemTotalAmt/100).toFixed(2) }}</span>
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
    this.creatOrder()
  },
  computed: {
  },
  methods: {
    creatOrder () {
      this.$post('/api/out_visit/order/create', {
        patCardNo: this.$route.params.patCardNo,
        hisOrdNum: this.$route.params.hisOrdNum
      })
        .then(res => {
          if (res.code === 0) {
            console.log('创建订单成功')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
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
    pay () {
      this.$post('/api/out_visit/order/create', {
        patCardNo: this.$route.params.patCardNo,
        hisOrdNum: this.$route.params.hisOrdNum
      })
        .then(res => {
          this.payComfirm(res.data.LedgerSn)
        })
    },
    payComfirm (ledgerSn) {
      this.$post('/api/doctor/payComfirm', {ledgerSn})
        .then(res => {
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
    padding: 40px
</style>
