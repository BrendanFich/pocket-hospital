<template>
  <div class="unpayItem">
    <div v-if="$route.params.paymentStatus === '0'">
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
    <div v-else>
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
            <span class="column1">{{ item.item_name }}</span>
            <span class="column2">¥{{ (item.item_price/100).toFixed(2) }}</span>
            <span class="column3">{{ Math.round(item.item_num) }}</span>
            <span class="column3 ">¥{{ (item.payoff_total_fee/100).toFixed(2) }}</span>
          </li>
        </ul>
      </div>
      <div class="detail">
        <div class="title">缴费详情</div>
        <van-cell title="订单号" :value="this.$route.params.hisOrdNum" />
        <van-cell title="总金额" :value="'¥' + (allInfo.totalAmt/100).toFixed(2)" />
        <van-cell title="医保部分金额" :value="'¥' + (allInfo.medInsAmt/100).toFixed(2)" />
        <van-cell title="自费部分金额" :value="'¥' + (allInfo.selfAmt/100).toFixed(2)"></van-cell>
        <van-cell title="支付状态" :value="statusWord"></van-cell>
      </div>
      <div class="btnBox" v-if="statusWord === '未支付'">
        <van-button type="primary" block round @click="pay">确认支付</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'

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
    if (this.$route.params.paymentStatus === '0') {
      this.getUnpayItem()
      this.creatOrder()
    } else {
      this.getPayItem()
    }
  },
  computed: {
    statusWord () {
      switch (this.$route.params.paymentStatus) {
        case '1' :
          return '已支付'
        case '0' :
          return '未支付'
        case '2' :
          return '退款中'
        case '-2' :
          return '已退款'
        case '-1' :
          return '已完成'
      }
    }
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
    getPayItem () {
      this.$post('/api/out_visit/order/items', {
        ledger_sn: this.$route.params.ledgerSn
      })
        .then(res => {
          this.list = res.data
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
      wx.ready(function () {
        wx.chooseWXPay({
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
