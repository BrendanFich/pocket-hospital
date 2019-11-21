<template>
  <div class="sTime">
    <div class="doctorInfo">
      <div class="baseInfo">
        <img src="./img/avatar100x101.png" alt />
        <div>
          <div class="name">{{docInfo.doctorName}}</div>
          <div class="department">{{docInfo.deptName}}</div>
        </div>
      </div>
      <div class="intro">
        {{(docInfo.doctorIntrodution === "" || docInfo.doctorIntrodution === null) ? '暂无简介' : docInfo.doctorIntrodution}}
      </div>
    </div>
    <div class="workTime">
      <ul>
        <li v-for="(item,index) in workTimeList" :key="index">
          <div class="itemContent" @click="select(item)">
            <div class="time">
              <img src="./img/clock.png" />
              <span>{{resetTimeFormat(item.beginTime, item.endTime)}}</span>
            </div>
            <div class="leftNum">
              <span :class="{over: item.leftNum<=0}">剩余 {{item.leftNum}}</span>
              <span :class="{over: item.leftNum<=0}" class="icon">&gt;</span>
              <span :class="{overShow: item.leftNum<=0}" class="overMsg">已约满</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import util from '@/assets/js/util'
// import moment from 'moment'

export default {
  name: 'sTime',
  data () {
    return {
      docInfo: {},
      workTimeList: []
    }
  },
  created () {
    this.getDocInfo()
    this.getRegSource()
  },
  computed: {
  },
  methods: {
    resetTimeFormat (beginTime, endTime) {
      let begin = beginTime.split(' ')[1].toString()
      let end = endTime.split(' ')[1].toString()
      return begin + '-' + end
    },
    getDocInfo () {
      util.http
        .post('/api/doctor/doc_info', {deptCode: this.$store.state.selectedDeptCode, doctorCode: (parseInt(this.$route.params.doctorCode) - 2).toString()})
        .then(res => {
          this.docInfo = res.data.Records[0]
          this.$store.commit('changeDoc', {docCode: this.docInfo.doctorCode, docName: this.docInfo.doctorName})
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRegSource () {
      // let self = this
      let timeFlag
      if (this.$route.params.timeFlagNo === '1') {
        timeFlag = '上午班'
      }
      if (this.$route.params.timeFlagNo === '2') {
        timeFlag = '下午班'
      }
      util.http
        .post('/api/doctor/getRegSource', {
          doctorCode: this.$route.params.doctorCode,
          deptCode: this.$store.state.selectedDeptCode,
          endDate: this.$route.params.date
        })
        .then(res => {
          this.workTimeList = res.data[Object.keys(res.data)[0]].filter((item) => {
            return item.timeFlag === timeFlag
          })
          console.log(this.workTimeList)
        })
        .catch(error => {
          console.log(error)
        })
    },
    linkTo (leftNum) {
      if (leftNum <= 0) {
        return ''
      } else {
        return '/reserve/confirm'
      }
    },
    select (item) {
      let beginTime = item.beginTime.split(' ')[1].toString().split(':')
      beginTime.pop()
      let endTime = item.endTime.split(' ')[1].toString().split(':')
      endTime.pop()
      let time = beginTime + '-' + endTime
      let timeFlag
      if (item.timeFlag === '上午班') {
        timeFlag = '1'
      } else if (item.timeFlag === '下午班') {
        timeFlag = '2'
      } else {
        timeFlag = '3'
      }
      if (item.leftNum > 0) {
        this.$store.commit('changeTime', time)
        this.$store.commit('changeBeginTime', beginTime.join(':'))
        this.$store.commit('changeEndTime', endTime.join(':'))
        this.$store.commit('setPrice', item.Price)
        this.$store.commit('changeTimeFlag', timeFlag)
        this.$router.push('/reserve/confirm')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.sTime
  @include page($color-page-background)
  .doctorInfo
    background: $color-white
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    .baseInfo
      width: 690px
      margin: 19px 0 25px 0
      display: flex
      justify-content: start
      align-items: center
      img
        width: 102px
        margin-right: 23px
      div
        .name
          font-size: 30px
          color: $color-title-black
          font-weight: bold
        .department
          margin-top: 12px
          font-size: 24px
          font-weight: 400
          color: $color-word-grey
    .intro
      margin-bottom: 24px
      width: 690px
      font-size: 24px
      line-height: 36px
      font-weight: 400
      color: $color-title-black
  .workTime
    background: $color-white
    margin-top: 8px
    ul > li
      padding-left: 31px
      padding-right: 47px
      border-bottom: 1px solid #ededed
      .itemContent
        display: flex
        justify-content: space-between
        align-items: center
        height: 88px
        .time
          display: flex
          align-items: center
          color: $color-title-black
          font-size: 30px
          img
            width: 24px
            margin-right: 16px
      .leftNum
        font-size: 24px
        color: $color-primary
        .over
          display: none
        .overMsg
          display: none
          color: $color-word-grey
          float: right
        .overShow
          display: inline
        .icon
          color: $color-word-grey
          float: right
          margin-left: 38px
</style>
