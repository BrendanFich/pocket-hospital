<template>
  <div class="sDayDoc">
    <div class="container">
      <div class="selectedInfo">
        <span class="department">{{$route.params.deptName}}</span>
        <span class="selectedDate">已选:{{date}}</span>
      </div>
      <week v-on:changeDate='changeDate'></week>
      <div class="doctorItems">
        <img class="noData" v-if="scheduleList.length === 0" src="./img/noData.png" />
        <div
          class="item"
          @click="select(item)"
          v-for="(item,index) in scheduleList"
          :key="index"
        >
          <div class="doctorInfo">
            <img slot="icon" src="./img/avatar100x101.png" />
            <div class="textInfo">
              <span class="name">{{item.Doctor}}</span>
              <span class="title">{{item.doctorTitle}}</span>
              <br />
              <span
                class="workTime"
                :class="{ am: item.timeFlag === '下午班', pm: item.timeFlag === '下午班', night: item.timeFlag === '晚班', noon: item.timeFlag === '中午班'}"
              >{{item.timeFlag}}</span>
            </div>
          </div>
          <div class="leftNum">
            <span v-if="item.leftNum > 0">剩余 {{item.leftNum}}<span class="icon">&gt;</span></span>
            <span class="overMsg" v-else>已约满</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Week from '@/base/Week/Week'

export default {
  name: 'sDayDoc',
  data () {
    return {
      date: '',
      scheduleList: []
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
      if (item.leftNum > 0) {
        this.$router.push({
          name: 'sTime',
          params: { doctorCode: item.doctorCode, date: this.date, timeFlagNo: item.timeFlag }
        })
      }
    },
    getRegSource (date) {
      this.$post('/api/doctor/getRegSource', {
        deptCode: this.$route.params.deptCode,
        date
      })
        .then(res => {
          this.scheduleList = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
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
        margin: 100px 0 0 200px
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
              color: $color-white
              border-radius: 5px
              font-size: 24px
              margin-top: 8px
              background: $color-primary
            .pm
              background: #f5b252
            .noon
              background: red
            .night
              background: #2b89f7
        .leftNum
          width: 185px
          font-size: 24px
          color: $color-primary
          font-weight: 400
          .over
            display: none
          .overMsg
            font-size: 24px
            color: $color-word-grey
            font-weight: 400
            float: right
            margin-right: 48px
          .icon
            color: $color-word-grey
            float: right
            margin-right: 48px
            font-weight: 400
  /deep/.mt-tabbar
    height: 98px
</style>
