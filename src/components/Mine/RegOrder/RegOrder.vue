<template>
  <div class="regOrder">
    <img class="noData" v-if="orderList.length === 0" src="./img/noData.png" />
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        @bottom-status-change="handleBottomChange"
        ref="loadmore">
        <ul>
          <li v-for="(item, index) in orderList" :key="index" @click="detail(item.hisOrdNum)">
            <div class="paidTime">下单日期：{{item.createDate}}</div>
            <div class="orderCard">
              <div class="left">
                <img src="./img/orderIcon.png" alt />
                <div class="baseInfo">
                  <div>
                    <span class="name">{{item.patName}}</span>
                    <span class="num">{{item.patCardNo}}</span>
                  </div>
                  <div class="item">
                    <span class="key">日期</span>
                    <span class="value">：{{item.scheduleDate.split(' ')[0]}}</span>
                  </div>
                  <div class="item">
                    <span class="key">院区</span>
                    <span class="value">：{{item.hostpitalName}}</span>
                  </div>
                  <div class="item">
                    <span class="key">科室</span>
                    <span class="value">：{{item.deptName}}</span>
                  </div>
                  <div class="item">
                    <span class="key">医生</span>
                    <span class="value">：{{item.doctorName}}</span>
                  </div>
                </div>
              </div>
              <div class="right">
                <span class="price">{{item.regFee}}元</span>
                <span class="orderTime">{{timeFormat(item.beginTime)}}-{{timeFormat(item.endTime)}}</span>
                <span :class="{noArrival: item.visitFlag ==='0',arrivaled: item.visitFlag ==='1' || item.visitFlag === '-1'}">{{status(item.visitFlag)}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake" style="text-align: center"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'regOrder',
  data () {
    return {
      orderList: [],
      size: 8,
      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false
    }
  },
  created () {
    this.getOrderList()
  },
  mounted () {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top
  },
  methods: {
    getOrderList () {
      this.$post('/api/pat/findAllRegister', {
        pay_status: '0',
        page: 1,
        size: this.size
      })
        .then(res => {
          console.log(res)
          // this.orderList = res.data.Records.sort(util.compareTime('createDate'))
          this.orderList = res.data
          this.allLoaded = res.page.count <= this.size
          this.$refs.loadmore.onBottomLoaded()
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleBottomChange (status) {
      console.log('handleBottomChange ', status)
      this.bottomStatus = status
    },
    loadBottom () {
      this.size += 8
      this.getOrderList()
    },
    status (code) {
      let text = ''
      switch (code) {
        case '0':
          text = '未报到'
          break
        case '1':
          text = '已报到'
          break
        case '-1':
          text = '已就诊'
      }
      return text
    },
    detail (hisOrdNum) {
      util.http
        .post('/api/pat/findRegisterInfo', {hisOrdNum})
        .then(res => {
          console.log(res)
          let status
          if (res.data.Records.visitFlag === '0') {
            status = '未报到'
          } else if (res.data.Records.visitFlag === '1') {
            status = '已报道'
          } else {
            status = '已就诊'
          }
          let text = `
      <div>
        <p style="color: #5adba3;">订单详情</p>
        <p>订单流水号: ${res.data.Records.hisOrdNum}</p>
        <p>创建时间: ${res.data.Records.createDate}</p>
        <p>就诊科室：${res.data.Records.deptName}</p>
        <p>就诊医生：${res.data.Records.doctorName}</p>
        <p>就诊日期：${res.data.Records.scheduleDate}</p>
        <p>就诊时间：${res.data.Records.beginTime}-${res.data.Records.endTime}</p>
        <p>病人姓名：${res.data.Records.patName}</p>
        <p>病人卡号：${res.data.Records.patCardNo}</p>
        <p>卡号类型：${res.data.Records.patCardType === '1' ? '就诊卡' : '社保卡'}</p>
        <p>挂号费用：${res.data.Records.regFee}</p>
        <p>当前状态：${status}</p>
      </div>
      `
          this.$messagebox('提示', text)
        })
        .catch(error => {
          console.log(error)
        })
    },
    timeFormat (time) {
      return time.split(' ')[1].split(':').slice(0, 2).join(':')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.regOrder
  background: $color-page-background
  height: 100vh
  .page-loadmore-wrapper
    overflow-y: scroll // 很重要
    -webkit-overflow-scrolling : touch // 解决view滑动速度慢或者卡顿问题
    .mint-loadmore
      margin-bottom: -50px
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
      .noArrival
        margin-top: 10px
        background: #f69343
      .arrivaled
        margin-top: 10px
        background: #5adba3
.mint-loadmore-bottom
  span
    display: inline-block
    transition: .2s linear
    vertical-align: middle
    span.is-rotate
      transform: rotate(180deg)
</style>
