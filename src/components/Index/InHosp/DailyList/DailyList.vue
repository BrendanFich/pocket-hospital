<template>
  <div class="dailyList">
    <div class="list">
      <div class="top">
        <div class="orderInfo">
          <ul>
            <li>
            <span class="key">费用日期</span>
            <span class="value">{{ dateformat }}</span>
            </li>
          </ul>
        </div>
        <img class="noData" v-if="noData" src="./img/noData.png"/>
        <div class="orderInfo" v-else>
          <ul>
            <li>
              <span class="key">住院科室</span>
              <span class="value">{{ dailyListInfo.deptName }}</span>
            </li>
            <li>
              <span class="key">结算类别</span>
              <span class="value">{{ dailyListInfo.settleType }}</span>
            </li>
            <li>
              <span class="key">病床号</span>
              <span class="value">{{ dailyListInfo.bedNo }}</span>
            </li>
          </ul>
        </div>
      </div>
      <van-tabs v-model="active" color="#09cf74" swipeable v-if="!noData">
        <van-tab title="合计">
          <ul>
            <li>
              <span class="key">费用总金额</span>
              <span class="value">{{ moneyComputed(dailyListInfo.totalFee) }}</span>
            </li>
            <li>
              <span class="key">甲类金额</span>
              <span class="value">{{ moneyComputed(dailyListInfo.feeA) }}</span>
            </li>
            <li>
              <span class="key">乙类金额</span>
              <span class="value">{{ moneyComputed(dailyListInfo.feeB) }}</span>
            </li>
            <li>
              <span class="key">丙类金额</span>
              <span class="value">{{ moneyComputed(dailyListInfo.bedFee) }}</span>
            </li>
            <li>
              <span class="key">西药费</span>
              <span class="value">{{ moneyComputed(dailyListInfo.westMedFee) }}</span>
            </li>
            <li>
              <span class="key">成药费</span>
              <span class="value">{{ moneyComputed(dailyListInfo.readyMedFee) }}</span>
            </li>
            <li>
              <span class="key">草药费</span>
              <span class="value">{{ moneyComputed(dailyListInfo.herbMedFee) }}</span>
            </li>
            <li>
              <span class="key">诊疗费</span>
              <span class="value">{{ moneyComputed(dailyListInfo.treatFee) }}</span>
            </li>
            <li>
              <span class="key" style="font-weight: bold">合计</span>
              <span class="value" style="font-weight: bold">{{
                moneyComputed(dailyListInfo.itemTotalFee)
              }}</span>
            </li>
          </ul>
        </van-tab>
        <van-tab title="明细">
          <ul style="margin-top: 5px; background: #fff">
            <li v-for="(item, index) in detail" :key="index">
              <span class="key">{{item.ChargeStandardNm}}</span>
              <span class="value">{{ item.Amt }}</span>
            </li>
          </ul>
          <ul class="table">
            <li class="tableHead">
              <span class="column1">项目名称</span>
              <span class="column2">单价(元)</span>
              <span class="column3">数量</span>
              <span class="column4">金额(元)</span>
            </li>
            <li class="tableData" v-for="(item, index) in detail" :key="index">
              <span class="column1">{{ item.ChargeStandardNm }}</span>
              <span class="column2">¥{{ item.Price }}</span>
              <span class="column3">{{ item.Quantity }}</span>
              <span class="column4 ">¥{{ item.Amt }}</span>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
      <div class="footer">
        <van-button icon="arrow-left" type="primary" @click="beforeDate"
          >前一天</van-button
        >
        <van-button type="primary" @click="showCalendar"
          >选择日期<van-icon name="arrow-up"
        /></van-button>
        <van-button type="primary" @click="afterDate"
          >后一天 <van-icon name="arrow"
        /></van-button>
      </div>
    </div>
    <van-calendar
      v-model="show"
      @confirm="onConfirm"
      color="#07c160"
      :min-date="defaultStart"
      :max-date="defaultEnd"
      :default-date="defaultDate"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  components: {},
  data () {
    return {
      active: 0,
      dailyListInfo: {},
      visitName: '',
      visitCardNo: '',
      patIdNo: '',
      inVisitId: '',
      date: '',
      show: false,
      defaultStart: '',
      defaultEnd: '',
      defaultDate: '',
      noData: false,
      detail: []
    }
  },
  computed: {
    dateformat () {
      return dayjs(this.date).format('YYYY-MM-DD')
    }
  },
  methods: {
    moneyComputed (val) {
      return (Number(val) / 100).toFixed(2)
    },
    back () {
      this.$router.go(-1)
    },
    getInfo () {
      return new Promise((resolve, reject) => {
        this.$post('/api/user/vx_info')
          .then(res => {
            if (res.code === 0) {
              this.visitName = res.data.info.visitName
              this.visitCardNo = res.data.info.visitCardNo
              if (res.data.info.pat_list.length > 0) {
                this.patIdNo = res.data.info.pat_list.filter(
                  item => item.visitCardNo === this.visitCardNo
                )[0].patIdNo
              } else {
                this.patIdNo = ''
              }
              this.$post('/api/invisit/getInPatInfo', {
                pat_name: this.visitName,
                id_card_no: this.patIdNo
              })
                .then(res => {
                  if (res.code === 0) {
                    this.inVisitId = res.data.InVisitId
                    resolve()
                  } else {
                    this.dailyListInfo = {}
                    this.$toast('无住院信息')
                    resolve()
                  }
                })
                .catch(error => {
                  console.log(error)
                })
            }
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    getVisitDaliyOne (date) {
      if (!this.inVisitId) {
        this.$toast('无住院信息')
        this.noData = true
        return
      }
      if (dayjs(dayjs().format('YYYY-MM-DD')).isBefore(date)) {
        this.$toast('未生成' + date + '清单')
        return
      }
      this.$post('/api/invisit/getVisitDaliyOne', {
        pat_card_no: this.visitCardNo,
        pat_card_type: '1',
        in_visit_id: this.inVisitId,
        begin: date,
        end: date
      })
        .then(res => {
          if (res.code === 0) {
            this.date = dayjs(date).toDate()
            this.dailyListInfo = res.data[0]
          } else {
            this.dailyListInfo = []
            this.noData = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    showCalendar () {
      this.defaultDate = dayjs(this.date).toDate()
      this.show = true
    },
    beforeDate () {
      this.getVisitDaliyOne(dayjs(this.date).subtract(1, 'd').format('YYYY-MM-DD'))
    },
    afterDate () {
      this.getVisitDaliyOne(dayjs(this.date).add(1, 'd').format('YYYY-MM-DD'))
    },
    onConfirm (val) {
      this.show = false
      this.getVisitDaliyOne(dayjs(val).format('YYYY-MM-DD'))
    },
    _getDetail (key) {
      // if (!key) return
      let date = dayjs(this.date).format('YYYY-MM-DD')
      this.$post('/api/invisit/getVisitDaliyOneDetail', {
        in_visit_id: this.inVisitId,
        begin: date,
        end: date
      })
        .then(res => {
          if (res.code === 0) {
            this.detail = res.data
          } else {
            this.detail = []
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  async created () {
    this.date = dayjs()
    this.defaultDate = this.date.toDate()
    this.defaultStart = dayjs()
      .subtract(1, 'y')
      .toDate()
    this.defaultEnd = dayjs()
      .add(1, 'y')
      .toDate()
    await this.getInfo()
    this.getVisitDaliyOne(dayjs(this.date).format('YYYY-MM-DD'))
    this._getDetail()
  }

}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.dailyList
  @include main()
  .list
    height: calc(100% - 140px)
    ul > li
      height: 78px
      padding: 0 54px 0 43px
      display: flex
      justify-content: space-between
      align-items: center
      border-bottom: 1px solid $color-border
      .key
        color: $color-title-black
        font-size: 30px
      .value
        color: $color-value-grey
        font-size: 30px
    .top
      height: 28%
      .orderInfo
        background: $color-white
        margin-bottom: 20px
    .van-tabs
      height: 66%
      background: $color-white
      /deep/ .van-tabs__content
        border-top: 5px solid #f2f2f2
        height: calc(100% - 46px)
        overflow: auto
    .footer
      height: 6%
      padding-bottom: 98px
      background: #f2f2f2
      padding: 16px
      width: calc(100% - 32px)
      display: flex
      justify-content: space-between
      align-items: center
      .van-button
        height: 32px
        border-radius: 5px
        line-height: 18px
  .table
    .tableHead
      @include font(25px, 400, $color-value-grey)
      line-height: 34px
    .tableData
      @include font(25px, 400, $color-black)
      line-height: 32px
      &:nth-child(2n+2)
        background: #EEFFEE
    span
      padding: 20px
    .column1
      flex: 1
    .column2
      width: 100px
      text-align: right
    .column3
      width: 50px
      text-align: center
    .column4
      min-width: 100px
      text-align: right
    li
      display: flex
      justify-content: end
      align-items: center
      border-bottom: 1px solid $color-border
  .noData
    width: 280px
    margin: 0 auto
    margin-left: 260px
</style>
