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
      <van-tabs v-model="active" color="#09cf74" swipeable @click="clickTab">
        <van-tab title="合计" class="orderInfo">
          <ul>
            <li>
              <span class="key">费用总金额</span>
              <span class="value">{{ dailyListInfo.totalFee }}</span>
            </li>
            <li>
              <span class="key">甲类金额</span>
              <span class="value">{{ dailyListInfo.feeA }}</span>
            </li>
            <li>
              <span class="key">乙类金额</span>
              <span class="value">{{ dailyListInfo.feeB }}</span>
            </li>
            <li>
              <span class="key">丙类金额</span>
              <span class="value">{{ dailyListInfo.bedFee }}</span>
            </li>
            <li>
              <span class="key">西药费</span>
              <span class="value">{{ dailyListInfo.westMedFee }}</span>
            </li>
            <li>
              <span class="key">成药费</span>
              <span class="value">{{ dailyListInfo.readyMedFee }}</span>
            </li>
            <li>
              <span class="key">草药费</span>
              <span class="value">{{ dailyListInfo.herbMedFee }}</span>
            </li>
            <li>
              <span class="key">诊疗费</span>
              <span class="value">{{ dailyListInfo.treatFee }}</span>
            </li>
            <li>
              <span class="key" style="font-weight: bold">合计</span>
              <span class="value" style="font-weight: bold">{{
                dailyListInfo.itemTotalFee
              }}</span>
            </li>
          </ul>
        </van-tab>
        <van-tab title="明细">
          <!-- <ul style="margin-top: 5px; background: #fff">
            <li v-for="(item, index) in detail" :key="index">
              <span class="key">{{item.ChargeStandardNm}}</span>
              <span class="value">{{ item.Amt }}</span>
            </li>
          </ul> -->
          <ul class="table">
            <li class="tableHead">
              <span class="column1">项目名称</span>
              <span class="column2">单价(元)</span>
              <span class="column3">数量</span>
              <span class="column4">金额(元)</span>
            </li>
            <div class="list-content" id="list-content">
              <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                :offset="10"
              >
                <li class="tableData" v-for="(item, index) in detail" :key="index">
                  <span class="column1">{{ item.ChargeStandardNm }}</span>
                  <span class="column2">¥{{ Number(item.Price).toFixed(2) }}</span>
                  <span class="column3">{{ Number(item.Quantity).toFixed(2) }}</span>
                  <span class="column4 ">¥{{ Number(item.Amt).toFixed(2) }}</span>
                </li>
              </van-list>
            </div>
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
      detail: [],
      page: 1,
      loading: false,
      finished: false,
      isLoading: false
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
  },
  mounted () {

  },
  computed: {
    dateformat () {
      return dayjs(this.date).format('YYYY-MM-DD')
    }
  },
  methods: {
    clickTab (name) {
      if (name) {
        this.$nextTick(() => {
          let winHeight = document.querySelector('.van-tabs').clientHeight
          let footerHeight = document.querySelector('.footer').clientHeight
          console.log(document.querySelector('.van-tabs'))
          console.log(document.querySelector('.footer'))
          console.log(winHeight)
          console.log(footerHeight)
          document.getElementById('list-content').style.height =
          winHeight -
        (40 * 2 * Math.min(document.documentElement.clientWidth / 750, 2) + 44 +
        2 * Math.min(footerHeight / 750, 2)) +
        'px'
        })
      }
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
        end: date,
        page: this.page,
        size: 10
      })
        .then(res => {
          if (res.code === 0) {
            this.detail = [...this.detail, ...res.data]
            this.loading = false
            if (res.page.totalPage <= res.page.currentPage) {
              this.finished = true
              console.log(this.finished)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onLoad () {
      this.page += 1
      this._getDetail()
    }
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
    .top
      margin-bottom: 20px
    .orderInfo
      background: $color-white
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
    .van-tabs
      height: 66%
      background: $color-white
      /deep/ .van-tabs__content
        border-top: 5px solid #f2f2f2
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
  #list-content
    flex: 1
    overflow-y: scroll
    -webkit-overflow-scrolling : touch
    &::-webkit-scrollbar
      display: none
  .table
    .tableHead
      @include font(25px, 400, $color-value-grey)
      line-height: 34px
    .tableData
      @include font(25px, 400, $color-black)
      line-height: 40px
      &:nth-child(2n+2)
        background: #EEFFEE
    span
      padding: 20px 15px
    .column1
      flex: 1
    .column2
      width: 120px
      text-align: right
    .column3
      width: 70px
      text-align: center
    .column4
      min-width: 120px
      text-align: right
    li
      display: flex
      justify-content: end
      align-items: center
      border-bottom: 1px solid $color-border
      padding: 0
  .noData
    width: 280px
    margin: 0 auto
    margin-left: 260px
</style>
