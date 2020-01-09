<template>
  <div class="paid">
    <img class="noData" v-if="paidList.length === 0" src="./img/noData.png" />
    <mt-loadmore
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore"
    >
      <ul>
        <li
          v-for="(item, index) in paidList"
          :key="index"
          @click="enterInfo(item.ledgerSn)"
        >
          <mt-cell>
            <div class="leftInfo">
              <div class="name">{{ item.patName }}</div>
              <div class="patCardNo">{{ item.PatCardNo }}</div>
              <div class="serial_number">
                订单号：
                <span class="value">{{ item.ledgerSn }}</span>
              </div>
              <div class="department">
                开单科室：
                <span class="value">{{ item.paymentDeptName }}</span>
              </div>
            </div>
            <div class="rightInfo">
              <div>
                <div class="refunding" v-if="item.paymentStatus === '2'">
                  退款中
                </div>
                <div class="refunded" v-if="item.paymentStatus === '-2'">
                  已退款
                </div>
                <div class="price">{{ item.paymentFee }}元</div>
              </div>
              <div class="date">{{ item.paymentDate }}</div>
            </div>
          </mt-cell>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: 'paid',
  data () {
    return {
      paidList: [],
      size: 8,
      allLoaded: false
    }
  },
  created () {
    this.getPaidList()
  },
  methods: {
    enterInfo (ledgerSn) {
      this.$router.push({ name: 'outOrderInfo', params: { ledgerSn } })
    },
    getPaidList () {
      this.$post('/api/doctor/payInfoList', {
        pay_status: '1',
        page: 1,
        size: this.size
      })
        .then(res => {
          this.paidList = res.data
          this.allLoaded = res.page.count <= res.page.pageSize
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadBottom () {
      this.size += 8
      this.getPaidList()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.paid
  background: $color-page-background
  height: calc(100vh - 120px)
  overflow-y: auto
  >>>.mint-cell-wrapper
    border-bottom: 1px solid $color-border
    padding: 10px
    .mint-cell-title
      flex: none
    .mint-cell-value
      flex: 1
      padding: 0 20px
      display: flex
      justify-content: space-between
      .leftInfo
        .name
          display: inline-block
          margin-right: 13px
          line-height: 66px
          font-size: 30px
          color: $color-primary
          font-weight: bold
        .patCardNo
          display: inline-block
          font-size: 24px
          color: $color-value-grey
        .serial_number
          line-height: 48px
          font-size: 26px
          color: $color-title-black
          .value
            color: $color-word-grey
        .department
          line-height: 48px
          font-size: 26px
          color: $color-title-black
      .rightInfo
        text-align: center
        .price,.refunding
          float: right
          width: 80px
          padding: 12px 10px
          background: #f69343
          color: #fff
          border-radius: 10px
          font-size: 26px
          margin-bottom: 16px
          margin-left: 5px
        .refunded
          background: $color-primary
          float: right
          width: 80px
          padding: 12px 10px
          color: #fff
          border-radius: 10px
          font-size: 26px
          margin-bottom: 16px
          margin-left: 5px
        .date
          clear: both
          color: $color-value-grey
          font-size: 24px
  .noData
        width: 366px
        margin: 100px 200px
</style>
