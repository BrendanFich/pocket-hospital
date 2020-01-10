<template>
  <div class="list-content" id="list-content">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      :offset="10"
    >
      <div
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
      </div>
    </van-list>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'paid',
  data () {
    return {
      paidList: [],
      size: 0,
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完所有数据
      isLoading: false, // 是否处于下拉刷新状态
      isShowNoData: false
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight // 视口大小
    document.getElementById('list-content').style.height =
      winHeight - (120 * Math.min(document.documentElement.clientWidth / 750, 2)) + 'px'
      // 调整上拉加载框高度,由于使用rem的原因此处不能只用减120px
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
          if (res.data.length === 0) {
            this.isShowNoData = true
          }
          this.loading = false
          if (res.page.count <= this.size) {
            this.finished = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onLoad () {
      this.size += 8
      this.getPaidList()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.list-content
  overflow-y: scroll // 很重要
  -webkit-overflow-scrolling : touch // 解决view滑动速度慢或者卡顿问题
  &::-webkit-scrollbar
    display: none
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
.mint-loadmore-bottom
  span
    display: inline-block
    transition: .2s linear
    vertical-align: middle
    span.is-rotate
      transform: rotate(180deg)
</style>
