<template>
  <div class="gSTime">
    <div class="doctorIntroCard">
      <DocAvatar :name="docInfo.doctorName" />
      <div class="docInfo">
        <p class="doctorName">{{ docInfo.doctorName }}史诗撒所</p>
        <p class="doctorTitle">
          {{ docInfo.deptName }} {{ docInfo.doctorTitle }}
          史诗撒所
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
      <div class="noSchedule" v-if="noSchedule">当天无排班</div>
      <div
          class="item"
          @click="select(item)"
          v-for="(item,index) in scheduleList"
          :key="index"
        >
          <div class="doctorInfo">
            <DocAvatar :name="item.Doctor" />
            <div class="textInfo">
              <span class="name">{{item.Doctor}}</span>
              <br />
              <span class="title">{{item.EmpTitle}}</span>
            </div>
          </div>
          <div class="leftNum">
            <span v-if="item.leftNum > 0">剩余 {{item.leftNum}}<span class="icon">&gt;</span></span>
            <span class="overMsg" v-else>已约满</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Week from '@/base/Week/Week'
import DocAvatar from '@/base/DocAvatar/DocAvatar'
export default {
  name: 'gSTime',
  components: { Week, DocAvatar },
  data () {
    return {
      docInfo: {},
      date: '',
      allworkTime: [],
      img: '',
      noSchedule: false,
      scheduleList: [],
      defaultCardNo: ''
    }
  },
  computed: {
    showWorkTime () {
      return this.allworkTime.filter(item => {
        return item.scheduleDate.indexOf(this.date) !== -1
      })
    },
    star () {
      if (this.docInfo.score) {
        return Math.round(this.docInfo.score) / 2
      } else {
        return 5
      }
    }
  },
  created () {
    this.getDocInfo()
    this._getDefualtCardNo()
  },
  methods: {
    _getDefualtCardNo () {
      this.$post('/api/user/vx_info').then(res => {
        if (res.code === 0) {
          this.defaultCardNo = res.data.info.visitCardNo
        }
      }).catch((error) => {
        console.log(error)
      })
    },
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
        deptCode: this.$store.state.deptCode.toString(),
        doctorCode: this.$store.state.doctorCode.toString()
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
        patCardNo: this.$store.state.defaultNo,
        date
      })
        .then(res => {
          this.scheduleList = res.data
          if (res.data.length === 0) {
            this.noSchedule = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    select (item) {
      if (item.leftNum > 0) {
        this.$store.commit('updateDeptCode', item.deptCode)
        this.$store.commit('updateDoctorCode', item.doctorCode)
        this.$store.commit('updateTimeFlag', item.timeFlag)
        this.$store.commit('updateBeginTime', item.beginTime)
        this.$router.push('/reserve/sTime')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.gSTime
  @include main()
  .doctorIntroCard
    background: $color-white
    height: 210px
    padding: 30px 50px 40px 30px
    border-bottom: 1px solid $color-border
    display: flex
    margin-bottom: 20px
    .docInfo
      flex: 1
      text-align: start
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 3
      overflow: hidden
      .doctorName
        font-size: 30px
        color: $color-title-black
        font-weight: bold
        line-height: 42px
      .doctorTitle
        font-size: 24px
        color: $color-title-black
        line-height: 40px
      .star
        padding: 5px 0 10px 0
        img
          width: 20px
      .textIntro
        font-size: 24px
        line-height: 36px
        color: $color-word-grey
  .workTime
    background: $color-white
    margin-top: 8px
    .noSchedule
      background: $color-page-background
      text-align: center
      margin-top: 40px
      color: $color-word-grey
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
>>>.van-icon-star
  font-size: 15px
</style>
