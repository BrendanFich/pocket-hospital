<template>
  <div class="list-content" id="list-content">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      :offset="10"
    >
      <div v-for="(item, index) in orderList" :key="index">
        <div class="paidTime">下单日期：{{ item.createDate }}</div>
        <router-link
          class="orderCard"
          :to="{
            name: 'regOrderItem',
            params: {
              hisOrdNum: item.hisOrdNum,
              ledgerSn: item.psOrdNum
            }
          }"
        >
          <img src="./img/orderIcon.png" alt />
          <div class="right">
            <div class="baseInfo">
              <span class="name">{{ item.patName }}</span>
              <span class="num">{{ item.patCardNo }}</span>
            </div>
            <div class="detail">
              <div>
                <div class="item">
                  <span class="key">日期：</span>
                  <span class="value"
                    >{{ item.scheduleDate.split(" ")[0] }}</span
                  >
                </div>
                <div class="item">
                  <span class="key">科室：</span>
                  <span class="value">{{ item.deptName }}</span>
                </div>
                <div class="item">
                  <span class="key">金额：</span>
                  <span class="value">{{ item.regFee / 100 }}元</span>
                </div>
              </div>
              <div>
                <div class="item">
                  <span class="key">时段</span>
                  <span class="value"
                    >：{{ timeFormat(item.beginTime) }}-{{
                  timeFormat(item.endTime)
                }}</span
                  >
                </div>
                <div class="item">
                  <span class="key">医生：</span>
                  <span class="value">{{ item.doctorName }}</span>
                </div>
                <div class="item">
                  <span class="key">状态：</span>
                  <span class="value"> {{ item.visit_status }} </span>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </van-list>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'regOrder',
  data () {
    return {
      orderList: [],
      page: 0,
      loading: false,
      finished: false,
      isLoading: false,
      isShowNoData: false,
      cardDetail: {}
    }
  },
  computed: {
    confirmButtonText () {
      if (this.cardDetail.backRegistInd === '1') {
        return '确认'
      } else {
        return '退号'
      }
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('list-content').style.height = winHeight + 'px'
  },
  methods: {
    getOrderList () {
      this.$post('/api/pat/findAllRegister', {
        pay_status: '0',
        page: this.page,
        size: 10
      })
        .then(res => {
          this.orderList = [...this.orderList, ...res.data]
          if (this.orderList.length === 0) {
            this.isShowNoData = true
          }
          this.loading = false
          if (res.page.totalPage <= res.page.currentPage) {
            this.finished = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onLoad () {
      this.page += 1
      this.getOrderList()
    },
    timeFormat (time) {
      return time
        .split(' ')[1]
        .split(':')
        .slice(0, 2)
        .join(':')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.list-content
  @include main()
  margin-bottom: 90px
  overflow-y: scroll // 很重要
  -webkit-overflow-scrolling : touch // 解决view滑动速度慢或者卡顿问题
  &::-webkit-scrollbar
    display: none
  .paidTime
    color: $color-word-grey
    font-size: 24px
    padding: 25px 30px
  .orderCard
    height: 154px
    background: $color-white
    padding: 30px 50px 30px 40px
    display: flex
    justify-content: space-between
    align-items: center
    img
      width: 43px
      margin-right: 30px
    .right
      flex: 1
      display: flex
      justify-content: center
      flex-direction: column
      align-items: start
      .baseInfo
        .name
          color: #5adba3
          font-size: 26px
          font-weight: bold
        .num
          font-size: 24px
          color: $color-title-grey
          display: inline-block
          line-height: 100%
          margin-left: 12px
          max-width: 280px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
      .detail
        font-size: 24px
        line-height: 36px
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: start
        width: 100%
        margin-top: 10px
        .key
          color: $color-word-grey
        .value
          color: $color-value-grey
        .orange
          color: #f69343
        .green
          color: #5adba3
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
