<template>
  <div class="sDayDoc">
    <div class="container">
      <div class="selectedInfo">
        <span class="department">{{$route.params.deptName}}</span>
        <span class="selectedDate">已选:{{date}}</span>
      </div>
      <week v-on:changeDate='changeDate'></week>
      <div class="doctorItems">
        <img class="noData" v-if="showDoctors.length === 0" src="./img/noData.png" />
        <div
          class="item"
          @click="select(item)"
          v-for="(item,index) in showDoctors"
          :key="index"
        >
          <div class="doctorInfo">
            <img slot="icon" src="./img/avatar100x101.png" />
            <div class="textInfo">
              <span class="name">{{item.doctorName}}</span>
              <span class="title">{{item.doctorTitle}}</span>
              <br />
              <span
                class="workTime"
                :class="{ pm: item.pmTotalNum > 0}"
              >{{item.pmTotalNum > 0 ? '下午' : '上午'}}</span>
            </div>
          </div>
          <div class="leftNum">
            <span>剩余 {{item.amTotalNum || item.pmTotalNum}}</span>
            <span class="icon">&gt;</span>
            <!-- <span :class="{overShow: item.totalNum<=0}" class="overMsg">已约满</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Week from '@/base/Week/Week'
import util from '@/assets/js/util'

export default {
  name: 'sDayDoc',
  data () {
    return {
      tbSelected: '',
      deptInfo: '',
      date: '',
      showDoctors: []
    }
  },
  computed: {
    computedDoctors () {
      return this.doctors.filter((item) => {
        return item.scheduleDate.indexOf(this.date) !== -1
      })
    }
  },
  components: { Week },
  methods: {
    changeDate (val) {
      this.date = val
      this.getRegSource(val)
    },
    select (item) {
      let timeFlagNo = ''
      if (item.amTotalNum) {
        timeFlagNo = '1'
      }
      if (item.pmTotalNum) {
        timeFlagNo = '2'
      }
      if ((item.amTotalNum || item.pmTotalNum) > 0) {
        this.$router.push({
          name: 'sTime',
          params: { doctorCode: item.doctorCode, date: this.date, timeFlagNo }
        })
      }
    },
    getRegSource (date) {
      let self = this
      util.http
        .post('/api/doctor/getRegSource', {
          deptCode: this.$route.params.deptCode,
          endDate: date
        })
        .then(res => {
          let doctors = []
          let resData = res.data
          Object.keys(resData).forEach(function (key) {
            let item = {}
            item.doctorName = key
            item.amTotalNum = 0
            item.pmTotalNum = 0
            item.doctorCode = resData[key][0].doctorCode
            resData[key].forEach(function (el) {
              if (el.timeFlag === '上午班') {
                item.amTotalNum = item.amTotalNum + 1
              }
              if (el.timeFlag === '下午班') {
                item.pmTotalNum = item.pmTotalNum + 1
              }
            })
            doctors.push(item)
          })
          let showDoctors = []
          doctors.forEach(function (el) {
            if (el.amTotalNum > 0) {
              showDoctors.push({doctorName: el.doctorName, amTotalNum: el.amTotalNum, doctorCode: el.doctorCode})
            }
            if (el.pmTotalNum > 0) {
              showDoctors.push({doctorName: el.doctorName, pmTotalNum: el.pmTotalNum, doctorCode: el.doctorCode})
            }
          })
          self.showDoctors = showDoctors
          console.log(showDoctors)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getRegSource(this.date)
    this.$store.commit('changeDate', this.date)
  },
  watch: {
    date (newDate, oldDate) {
      this.$store.commit('changeDate', newDate)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.sDayDoc
  @include page($color-white)
  .container
    .selectedInfo
      height: 100px
      display: flex
      justify-content: space-between
      align-items: center
      .department
        margin-left: 45px
        color: $color-title-black
        font-size: 26px
        font-weight: bold
      .selectedDate
        margin-right: 31px
        color: $color-word-grey
        font-size: 26px
        font-weight: bold
    .doctorItems
      width: 100%
      .noData
        width: 366px
        margin: 100px 200px
      .item
        height: 120px
        display: flex
        justify-content: space-between
        align-items: center
        border-bottom: 1px solid $color-border
        .doctorInfo
          margin-left: 37px
          display: flex
          justify-content: start
          align-items: center
          img
            width: 102px
          .textInfo
            margin-left: 24px
            .name
              color: $color-title-black
              font-size: 28px
              font-weight: bold
            .title
              font-size: 24px
              color: $color-title-grey
              font-weight: bold
            .workTime
              display: inline-block
              padding: 3px 4px
              background: $color-primary
              color: $color-white
              border-radius: 5px
              font-size: 24px
              margin-top: 8px
            .pm
              background: #f5b252
        .leftNum
          width: 185px
          font-size: 24px
          color: $color-primary
          font-weight: 400
          .over
            display: none
          .overMsg
            display: none
            font-size: 24px
            color: $color-word-grey
            font-weight: 400
            float: right
            margin-right: 48px
          .overShow
            display: inline
          .icon
            color: $color-word-grey
            float: right
            margin-right: 48px
            font-weight: 400
  /deep/.mt-tabbar
    height: 98px
</style>
