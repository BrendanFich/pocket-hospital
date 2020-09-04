<template>
  <div class="unpayList">
    <CustomerInfoCard @visitCardNo="getPatCardNo"></CustomerInfoCard>
    <div class="list">
      <van-cell center class="item" v-for="(item,index) in list" :key="index"
      :to="{name: 'unpayItem', params: {patCardNo, hisOrdNum: item.hisOrdNum}}">
        <div slot="title">诊断日期：{{item.diagDate.split(' ')[0]}}</div>
        <ul class="default" slot="label">
          <li>科室：{{item.deptName}}</li>
          <li>医生：{{item.doctorName}}</li>
          <li>缴费类型：{{item.payName}}</li>
        </ul>
        <div slot="default" class="price">¥ {{(item.totalAmt/100).toFixed(2)}}</div>
      </van-cell>
    </div>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'unpayList',
  components: { CustomerInfoCard: () => import('@/base/CustomerInfoCard/CustomerInfoCard') },
  data () {
    return {
      patCardNo: '',
      list: [],
      isShowNoData: false
    }
  },
  methods: {
    getPatCardNo (val) {
      this.patCardNo = val
      this.getOrderList()
    },
    getOrderList () {
      this.$post('/api/out_visit/un_pay_order/list', {patCardNo: this.patCardNo}).then(res => {
        this.list = res.data.filter(i => i.hisOrdNum)
        if (this.list.length === 0) {
          this.isShowNoData = true
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.unpayList
  @include main()
  width: 100%
  .list
    margin-top: 20px
    .item
      background: #fff
      border-bottom: 1px solid $color-border
      font-size: 25px
      li
        font-size: 25px
      .price
        float: right
        min-width: 80px
        text-align: center
        padding: 5px 7px
        background: $color-primary
        color: #fff
        border-radius: 10px
        font-size: 23px
</style>
