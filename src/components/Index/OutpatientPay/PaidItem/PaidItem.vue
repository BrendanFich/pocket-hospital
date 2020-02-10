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
      <van-cell title="订单号" :value="this.$route.params.hisOrdNum" />
      <van-cell title="总金额" :value="'¥' + ($route.params.originalFee/100).toFixed(2)" />
      <van-cell title="医保部分金额" :value="'¥' + ($route.params.medicalInsuranceFee/100).toFixed(2)" />
      <van-cell title="自费部分金额" :value="'¥' + ($route.params.paymentFee/100).toFixed(2)"></van-cell>
      <van-cell title="支付状态" :value="statusWord"></van-cell>
    </div>
    <div class="medicineInfo">
      {{$route.params.remarks}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'paidItem',
  data () {
    return {
      list: [],
      ledgerSn: ''
    }
  },
  created () {
    this.getPayItem()
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
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.paidItem
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
  .medicineInfo
    margin: 20px
  .btnBox
    margin: 40px
</style>
