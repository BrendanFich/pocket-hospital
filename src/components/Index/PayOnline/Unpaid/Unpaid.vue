<template>
  <div class="list-content" id="list-content">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      :offset="10"
    >
      <div class="list-item" v-for="(item, index) in unpaidList" :key="index">
        <mt-cell @click.native="getDetailInfo(item.ledgerSn)">
          <div class="leftInfo">
            <div class="name">{{ item.patName }}</div>
            <div class="patCardNo">{{ item.PatCardNo }}</div>
            <div class="serial_number">
              订单号：
              <span class="value">{{ item.outPatId }}</span>
            </div>
            <div class="department">
              开单科室：
              <span class="value">{{ item.paymentDeptName }}</span>
            </div>
          </div>
          <div class="rightInfo">
            <span class="tag" :class="{green: item.paymentStatus === '1', orange: item.paymentStatus === '0'}">{{ statusWord(item.paymentStatus) }}</span>
            <span class="price">{{ item.paymentFee/100 }}元</span>
            <div class="date">{{ item.paymentDate.split(' ')[0] }}</div>
          </div>
        </mt-cell>
      </div>
    </van-list>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
      <van-dialog
        v-model="dialogShow"
        title="订单详情"
        show-cancel-button
        :closeOnClickOverlay="true"
        @confirm="confirm"
        confirmButtonColor="#09cf74"
        :confirmButtonText='confirmButtonText'
      >
        <ul class="detail">
          <li>
            <label>患者：</label><span>{{ detailInfo.patName }}</span>
          </li>
          <li>
            <label>卡号：</label><span>{{ detailInfo.PatCardNo }}</span>
          </li>
          <li>
            <label>卡号类型：</label
            ><span>{{ detailInfo.patCardType === "1" ? "就诊卡" : "社保卡" }}</span>
          </li>
          <li>
            <label>订单号：</label><span>{{ detailInfo.outPatId }}</span>
          </li>

          <li>
            <label>缴费时间：</label
            ><span>{{
              detailInfo.paymentDate && detailInfo.paymentDate.split(" ")[0]
            }}</span>
          </li>
          <li>
            <label>缴费金额：</label
            ><span>{{ "￥" + detailInfo.paymentFee / 100 }}</span>
          </li>
          <li>
            <label>开单科室：</label><span>{{ detailInfo.paymentDeptName }}</span>
          </li>
          <li>
            <label>开单医生：</label><span>{{ detailInfo.paymentDoctorName }}</span>
          </li>
          <li>
            <label>订单状态：</label><span>{{ statusWord(detailInfo.paymentStatus) }}</span>
          </li>
      </ul>
      </van-dialog>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'

export default {
  name: 'paid',
  data () {
    return {
      unpaidList: [],
      page: 0,
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完所有数据
      isLoading: false, // 是否处于下拉刷新状态
      isShowNoData: false,
      dialogShow: false,
      ledgerSn: '',
      detailInfo: {}
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight // 视口大小
    document.getElementById('list-content').style.height =
      winHeight + 'px'
      // winHeight - (120 * Math.min(document.documentElement.clientWidth / 750, 2)) + 'px'
      // 调整上拉加载框高度,由于使用rem的原因此处不能只用减120px
  },
  computed: {
    confirmButtonText () {
      if (this.detailInfo.paymentStatus === '0') {
        return '确认支付'
      } else {
        return '确认'
      }
    }
  },
  methods: {
    confirm () {
      if (this.detailInfo.paymentStatus === '0') {
        this.pay()
      }
    },
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
    getUnpaidList () {
      this.$post('/api/doctor/payInfoList', {
        page: this.page,
        size: 10
      })
        .then(res => {
          this.unpaidList = [...this.unpaidList, ...res.data]
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
      this.getUnpaidList()
    },
    getDetailInfo (ledgerSn) {
      this.ledgerSn = ledgerSn
      this.$post('/api/doctor/payInfo', { ledgerSn })
        .then(res => {
          if (res.code === 0) {
            this.detailInfo = res.data.Records
            this.dialogShow = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    pay () {
      let self = this
      this.$post('/api/doctor/payComfirm', { ledgerSn: this.ledgerSn })
        .then(res => {
          wx.ready(function () {
            wx.chooseWXPay({
              timestamp: res.data.timestamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success: res => {
                self.getUnpaidList()
              }
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    refund () {
      console.log('退款')
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
      .price,.refunding,.tag
        float: right
        width: 80px
        padding: 8px 7px
        background: #d8d8d8
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
        text-align: right
        clear: both
        color: $color-value-grey
        font-size: 24px
      .green
        background: $color-primary
      .orange
        background: #f69343
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
      width: 200px
</style>
