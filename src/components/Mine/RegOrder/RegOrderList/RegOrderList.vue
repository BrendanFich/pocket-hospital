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
          <div class="left">
            <img src="./img/orderIcon.png" alt />
            <div class="baseInfo">
              <div>
                <span class="name">{{ item.patName }}</span>
                <span class="num">{{ item.patCardNo }}</span>
              </div>
              <div class="item">
                <span class="key">日期</span>
                <span class="value"
                  >：{{ item.scheduleDate.split(" ")[0] }}</span
                >
              </div>
              <div class="item">
                <span class="key">时段</span>
                <span class="value"
                  >：{{ timeFormat(item.beginTime) }}-{{
                timeFormat(item.endTime)
              }}</span
                >
              </div>
              <div class="item">
                <span class="key">科室</span>
                <span class="value">：{{ item.deptName }}</span>
              </div>
              <div class="item">
                <span class="key">医生</span>
                <span class="value">：{{ item.doctorName }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <span class="orange">{{ item.regFee / 100 }}元</span>
            <span
              :class="{
                green: item.visit_status === '挂号'
              }"
              >{{ item.visit_status }}</span
            >
            <!-- <span class="orange" v-if="status(item.backRegistInd, item.visit_status) === '挂号'">等待支付</span> -->
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
  created () {
    this.getOrderList()
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
          if (res.data.length === 0) {
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
    status (backRegistInd, visitStatus) {
      if (backRegistInd === '1') {
        return '已退号'
      } else {
        return visitStatus
      }
    },
    timeFormat (time) {
      return time
        .split(' ')[1]
        .split(':')
        .slice(0, 2)
        .join(':')
    },
    cancelRegister () {
      if (this.cardDetail.backRegistInd === '0') {
        this.$post('/api/register/cancelRegister', {
          hisOrderNum: this.cardDetail.hisOrdNum
        })
          .then(res => {
            if (res.code === 0) {
              this.$toast({
                message: '退号成功',
                duration: 1500,
                className: 'toast'
              })
              this.getOrderList()
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.list-content
  background: $color-page-background
  overflow-y: scroll // 很重要
  -webkit-overflow-scrolling : touch // 解决view滑动速度慢或者卡顿问题
  &::-webkit-scrollbar
    display: none
  .noData
    width: 366px
    margin-top: 50px
    margin-left: 200px
  .paidTime
    color: $color-word-grey
    font-size: 24px
    padding: 25px 30px
  .orderCard
    height: 170px
    background: $color-white
    padding: 30px 50px 30px 40px
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
