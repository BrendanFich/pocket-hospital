<template>
  <div class="gSTime">
    <div class="doctorIntroCard">
      <img class="avatar" :src="img" />
      <div class="docInfo">
        <p class="doctorName">{{ docInfo.doctorName }}</p>
        <p class="doctorTitle">
          {{ docInfo.deptName }} {{ docInfo.doctorTitle }}
        </p>
        <van-rate v-model="star" readonly />
        <p class="textIntro">
          {{
            docInfo.doctorIntrodution ? docInfo.doctorIntrodution : "暂无介绍"
          }}
        </p>
      </div>
    </div>
    <Week v-on:changeDate="changeDate"></Week>
    <div class="workTime">
      <ul>
        <li v-for="(item, index) in showWorkTime" :key="index">
          <div @click="linkTo(item)" class="itemContent">
            <div class="time">
              <img src="./img/clock.png" />
              <span
                >{{ item.beginTime.split(" ")[1] }}-{{
                  item.endTime.split(" ")[1]
                }}</span
              >
            </div>
            <div class="remaining">
              <span :class="{ over: item.leftNum <= 0 }"
                >剩余 {{ item.leftNum }}</span
              >
              <span :class="{ over: item.leftNum <= 0 }" class="icon"
                >&gt;</span
              >
              <span :class="{ overShow: item.leftNum <= 0 }" class="overMsg"
                >已约满</span
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Week from '@/base/Week/Week'

export default {
  name: 'gSTime',
  data () {
    return {
      docInfo: {},
      date: '',
      allworkTime: [],
      img: ''
    }
  },
  computed: {
    showWorkTime () {
      return this.allworkTime.filter(item => {
        return item.scheduleDate.indexOf(this.date) !== -1
      })
    },
    star () {
      return Math.round(this.docInfo.score) / 2
    }
  },
  components: { Week },
  created () {
    this.getDocInfo()
  },
  methods: {
    changeDate (val) {
      this.date = val
      this.getRegSource(val)
    },
    linkTo (leftNum) {
      if (leftNum <= 0) {
        return ''
      } else {
        return '/reserve/confirm'
      }
    },
    getDocInfo () {
      this.$post('/api/doctor/doc_info', {
        deptCode: this.$store.state.deptCode,
        doctorCode: this.$store.state.doctorCode
      })
        .then(res => {
          if (res.code === 0 && res.data[0]) {
            this.docInfo = res.data[0]
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRegSource (date) {
      this.$post('/api/doctor/getRegSource', {
        doctorCode: this.$store.state.doctorCode.toString(),
        deptCode: this.$store.state.deptCode.toString(),
        date
      })
        .then(res => {
          this.workTimeList = res.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.gSTime
  @include page($color-page-background)
  .doctorIntroCard
    background: $color-white
    height: 195px
    padding: 30px 50px 40px 30px
    border-bottom: 1px solid $color-border
    display: flex
    .avatar
      width: 100px
      height: 100px
      margin-right: 24px
    .docInfo
      flex: 1
      .doctorName
        font-size: 30px
        color: $color-title-black
        font-weight: bold
        line-height: 42px
      .doctorTitle
        font-size: 24px
        color: $color-title-black
        line-height: 34px
      .star
        padding: 5px 0 10px 0
        img
          width: 20px
      .textIntro
        font-size: 24px
        line-height: 36px
        color: $color-title-black
  .week_slider
    margin-top: 18px
    background: $color-white
  .workTime
    background: $color-white
    margin-top: 8px
    ul > li
      padding-left: 31px
      padding-right: 47px
      border-bottom: 1px solid $color-border
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
      .remaining
        font-size: 24px
        color: $color-primary
        .over
          display: none
        .overMsg
          display: none
          color: $color-title-black
          float: right
        .overShow
          display: inline
        .icon
          color: $color-title-black
          float: right
          margin-left: 38px
</style>
