<template>
  <div class="paidItem">
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
      <van-cell title="订单号" :value="info.outPatId" />
      <van-cell title="总金额" :value="info.original_fee && ('¥' + (info.original_fee/100).toFixed(2))" />
      <van-cell title="医保部分金额" :value="info.medical_insurance_fee && ('¥' + (info.medical_insurance_fee/100).toFixed(2))" />
      <van-cell title="自费部分金额" :value="info.paymentFee && ('¥' + (info.paymentFee/100).toFixed(2))"></van-cell>
      <van-cell title="支付状态" :value="statusWord(info.paymentStatus)"></van-cell>
    </div>
    <div class="medicineInfo">
      <img class="medicineImg" src="./img/medicine.png" alt="">
      <div class="text">{{info.remarks}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'paidItem',
  data () {
    return {
      list: [],
      info: {}
    }
  },
  created () {
    this.getPayItem()
    this.getPayOffInfo()
  },
  computed: {

  },
  methods: {
    statusWord (paymentStatus) {
      switch (paymentStatus) {
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
    getPayOffInfo () {
      this.$post('/api/user/pay_off/get', {
        ledger_sn: this.$route.params.ledgerSn
      })
        .then(res => {
          this.info = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.paidItem
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
  .medicineInfo
    padding: 20px
    font-size: 28px
    line-height: 38px
    display: flex
    .medicineImg
      width: 32px
      height: 32px
      margin: 4px
    .text
      flex: 1
</style>
