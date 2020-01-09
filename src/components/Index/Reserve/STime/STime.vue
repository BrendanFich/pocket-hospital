<template>
  <div class="sTime">
    <div class="doctorInfo">
      <div class="baseInfo">
        <div class="avatar">
          <img :src="getAvatar(docInfo.doctorName)" @error="setDefualtImg" />
        </div>
        <div class="text">
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
import { apiBaseUrl } from '@/assets/js/config'
import defualtImg from './img/greenAvatar.png'

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
    getAvatar (name) {
      return apiBaseUrl + '/upload/doctor/' + name + '.jpg'
    },
    setDefualtImg (e) {
      e.target.src = defualtImg
    },
    resetTimeFormat (beginTime, endTime) {
      let begin = beginTime.split(' ')[1].toString()
      let end = endTime.split(' ')[1].toString()
      return begin + '-' + end
    },
    getDocInfo () {
      this.$post('/api/doctor/doc_info', {deptCode: this.$store.state.deptCode, doctorCode: this.$store.state.doctorCode})
        .then(res => {
          if (res.code === 0 && res.data.Records[0]) {
            this.docInfo = res.data.Records[0]
            this.$store.commit('updateDoctorName', this.docInfo.doctorName)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRegSource () {
      this.$post('/api/doctor/getRegSource', {
        doctorCode: this.$store.state.doctorCode.toString(),
        deptCode: this.$store.state.deptCode.toString(),
        date: this.$store.state.beginTime.split(' ')[0]
      })
        .then(res => {
          // this.workTimeList = res.data.filter((item) => {
          //   return item.timeFlag === this.$store.state.timeFlag
          // })
          this.workTimeList = res.data
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
      if (item.leftNum > 0) {
        this.$store.commit('updateBeginTime', item.beginTime)
        this.$store.commit('updateEndTime', item.endTime)
        this.$store.commit('updatePrice', item.Price)
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
      .avatar
        width: 102px
        height: 102px
        overflow: hidden
        border-radius: 50%
        img
          width: 102px
          margin-right: 20px
      .text
        margin-left: 23px
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
