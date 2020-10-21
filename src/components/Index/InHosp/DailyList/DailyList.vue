<template>
  <div class="dailyList">
    <div class="list">
      <img class="noData" v-if="dailyListInfo === {}" src="./img/noData.png" />
      <div v-for="(item, index) in dailyListInfo" :key="index">
        <div class="orderInfo">
          <ul>
            <li>
            <span class="key">费用日期</span>
            <span class="value">{{ item.itemDate }}</span>
            </li>
            <li>
              <span class="key">住院科室</span>
              <span class="value">{{ item.deptName }}</span>
            </li>
            <li>
              <span class="key">结算类别</span>
              <span class="value">{{ item.settleType }}</span>
            </li>
            <li>
              <span class="key">病床号</span>
              <span class="value">{{ item.bedNo }}</span>
            </li>
            <li>
              <span class="key">费用总金额</span>
              <span class="value">{{ moneyComputed(item.totalFee) }}</span>
            </li>
            <li>
              <span class="key">甲类金额</span>
              <span class="value">{{ moneyComputed(item.feeA) }}</span>
            </li>
            <li>
              <span class="key">乙类金额</span>
              <span class="value">{{ moneyComputed(item.feeB) }}</span>
            </li>
            <li>
              <span class="key">丙类金额</span>
              <span class="value">{{ moneyComputed(item.bedFee) }}</span>
            </li>
            <li>
              <span class="key">西药费</span>
              <span class="value">{{ moneyComputed(item.westMedFee) }}</span>
            </li>
            <li>
              <span class="key">成药费</span>
              <span class="value">{{ moneyComputed(item.readyMedFee) }}</span>
            </li>
            <li>
              <span class="key">草药费</span>
              <span class="value">{{ moneyComputed(item.herbMedFee) }}</span>
            </li>
            <li>
              <span class="key">诊疗费</span>
              <span class="value">{{ moneyComputed(item.treatFee) }}</span>
            </li>
            <li>
              <span class="key" style="font-weight: bold">合计</span>
              <span class="value" style="font-weight: bold">{{
                moneyComputed(item.itemTotalFee)
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer" v-if="dailyListInfo.length>0">
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
      dailyListInfo: [],
      visitName: '',
      visitCardNo: '',
      patIdNo: '',
      inVisitId: '',
      date: '',
      show: false,
      defaultStart: '',
      defaultEnd: '',
      defaultDate: ''
    }
  },
  watch: {},
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
                  this.inVisitId = res.data.InVisitId
                  if (res.data.CardNo) {
                    this.$toast('无住院信息')
                  }
                  resolve()
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
      console.log(date)
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
            this.dailyListInfo = res.data
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
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.dailyList
  @include main()
  .list
    .orderInfo
      background: $color-white
      ul > li
        height: 88px
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
  .footer
    margin-bottom: 98px
    padding: 20px
    display: flex
    justify-content: space-between
    align-items: center
    .van-button
      height: 38px
      border-radius: 5px
      line-height: 20px
</style>
