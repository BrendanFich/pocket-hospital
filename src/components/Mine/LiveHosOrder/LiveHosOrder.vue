<template>
  <div class="list-content" id="list-content">
    <div v-for="(item, index) in orderList" :key="index">
      <div class="paidTime">下单日期：{{ item.paymentDate }}</div>
      <div
        class="orderCard"
      >
        <div class="left">
          <img src="./img/money.png" alt />
          <div class="baseInfo">
            <div>
              <span class="name">{{ item.patName }}</span>
              <span class="num">{{ item.PatCardNo }}</span>
            </div>
            <div class="item">
              <span class="key">院区</span>
              <span class="value">：全院</span>
            </div>
            <div class="item">
              <span class="key">类型</span>
              <span class="value">: 住院费预交金</span>
            </div>
          </div>
        </div>
        <div class="right">
          <span class="orange">{{ item.paymentFee / 100 }}元</span>
          <span
            :class="{
              green: item.paymentStatus === '0'
            }"
            >{{item.paymentStatus ? '已支付' : '未支付'}}</span
          >
        </div>
      </div>
    </div>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'regOrder',
  data () {
    return {
      orderList: [],
      isShowNoData: false,
      cardDetail: {}
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      this.$post('/api/invisit/getVisitPayInfo')
        .then(res => {
          this.orderList = res.data.Records
          if (this.orderList.length === 0) {
            this.isShowNoData = true
          }
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
.list-content
  background: $color-page-background
  height: calc(100vh - 180px)
  margin: 90px 0
  overflow-y: scroll // 很重要
  -webkit-overflow-scrolling : touch // 解决view滑动速度慢或者卡顿问题
  &::-webkit-scrollbar
    display: none
  .paidTime
    color: $color-word-grey
    font-size: 24px
    padding: 25px 30px
  .orderCard
    height: 170px
    background: $color-white
    padding: 0 50px 0 40px
    display: flex
    justify-content: space-between
    align-items: center
    .left
      display: flex
      justify-content: flex-start
      align-items: center
      img
        width: 43px
        margin-right: 30px
      .baseInfo
        font-size: 24px
        line-height: 36px
        .key
          color: $color-word-grey
        .value
          color: $color-value-grey
        .name
          color: #5adba3
          font-size: 26px
          font-weight: bold
          line-height: 50px
        .num
          font-size: 24px
          color: $color-title-grey
          display: inline-block
          margin-left: 12px
    .right
      display: flex
      flex-direction: column
      align-items: flex-end
      justify-content: center
      span
        color: $color-white
        font-size: 24px
        line-height: 30px
        padding: 3px 11px
        margin: 5px 0
        border-radius: 5px
        background: #f69343
      .orange
        background: #f69343
      .green
        background: #5adba3
.mint-loadmore-bottom
  span
    display: inline-block
    transition: .2s linear
    vertical-align: middle
    span.is-rotate
      transform: rotate(180deg)
>>>.van-dialog__header
  padding-top: 15px
  color: $color-primary
.detail
  margin-top: 25px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  >li
    display: flex
    height: 50px
    label
      width: 200px
      color: #999
    span
      width: 250px
</style>
