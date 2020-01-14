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
        <div class="orderCard" @click="getDetail(item.hisOrdNum)">
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
              <!-- <div class="item">
                <span class="key">院区</span>
                <span class="value">：{{ item.hostpitalName }}</span>
              </div> -->
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
            <span class="price">{{ item.regFee / 100 }}元</span>
            <span class="orderTime"
              >{{ timeFormat(item.beginTime) }}-{{
                timeFormat(item.endTime)
              }}</span
            >
            <span
              :class="{
                backRegist: item.backRegistInd === '1',
                noBackRegist: item.backRegistInd === '0'
              }"
              >{{ status(item.backRegistInd, item.visit_status) }}</span
            >
          </div>
        </div>
      </div>
    </van-list>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
    <van-dialog
      v-model="dialogShow"
      title="订单详情"
      show-cancel-button
      :closeOnClickOverlay="true"
      @confirm="cancelRegister"
      confirmButtonColor="#09cf74"
      confirmButtonText="退号"
    >
      <ul class="detail">
        <li>
          <label>订单号：</label><span>{{ cardDetail.hisOrdNum }}</span>
        </li>
        <li>
          <label>创建时间：</label
          ><span>{{
            cardDetail.createDate && cardDetail.createDate.split(" ")[0]
          }}</span>
        </li>
        <li>
          <label>就诊科室：</label><span>{{ cardDetail.deptName }}</span>
        </li>
        <li>
          <label>就诊医生：</label><span>{{ cardDetail.doctorName }}</span>
        </li>
        <li>
          <label>就诊日期：</label
          ><span>{{
            cardDetail.scheduleDate && cardDetail.scheduleDate.split(" ")[0]
          }}</span>
        </li>
        <li>
          <label>就诊时间：</label
          ><span
            >{{ cardDetail.beginTime && timeFormat(cardDetail.beginTime) }} -
            {{ cardDetail.endTime && timeFormat(cardDetail.endTime) }}
          </span>
        </li>
        <li>
          <label>患者：</label><span>{{ cardDetail.patName }}</span>
        </li>
        <li>
          <label>卡号：</label><span>{{ cardDetail.patCardNo }}</span>
        </li>
        <li>
          <label>卡号类型：</label
          ><span
            >{{ cardDetail.patCardType === "1" ? "就诊卡" : "社保卡" }}
          </span>
        </li>
        <li>
          <label>挂号费用：</label
          ><span>{{ "￥" + cardDetail.regFee / 100 }}</span>
        </li>
        <li>
          <label>当前状态：</label
          ><span>{{ status(cardDetail.backRegistInd, cardDetail.visit_status) }}</span>
        </li>
      </ul>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'regOrder',
  data () {
    return {
      orderList: [],
      page: 0,
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完所有数据
      isLoading: false, // 是否处于下拉刷新状态
      isShowNoData: false,
      dialogShow: false,
      cardDetail: {}
    }
  },
  created () {
    this.getOrderList()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight // 视口大小
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
    getDetail (hisOrdNum) {
      this.$post('/api/pat/findRegisterInfo', { hisOrdNum })
        .then(res => {
          this.cardDetail = res.data
          this.dialogShow = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    timeFormat (time) {
      return time
        .split(' ')[1]
        .split(':')
        .slice(0, 2)
        .join(':')
    },
    cancelRegister () {
      // console.log(this.cardDetail.hisOrdNum)
      this.$post('/api/register/cancelRegister', {
        hisOrderNum: this.cardDetail.hisOrdNum
      }).then(res => {
        if (res.code === 0) {
          this.$toast({ message: '退号成功', duration: 1500, className: 'toast' })
          this.getOrderList()
        }
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
      span
        color: $color-white
        font-size: 24px
        padding: 3px 11px
        border-radius: 5px
      .price
        background: #f69343
      .orderTime
        margin-top: 10px
        background: #5adba3
      .backRegist
        margin-top: 10px
        background: #f69343
      .noBackRegist
        margin-top: 10px
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
