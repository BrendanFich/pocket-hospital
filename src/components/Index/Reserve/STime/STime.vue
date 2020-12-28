<template>
  <div class="sTime">
    <div class="doctorInfo">
      <div class="baseInfo">
        <div class="avatar" v-if="docInfo.doctorName">
          <DocAvatar :name="docInfo.doctorName" />
        </div>
        <div class="text">
          <div class="name">
            {{ docInfo.doctorName }}
            <span class="title"
              >(诊金:{{
                workTimeList[0] && workTimeList[0].Price / 100
              }}元)</span
            >
          </div>
          <div class="department">
            {{ docInfo.deptName }} | {{ docInfo.doctorTitle }}
          </div>
          <van-rate
            :value="Math.round((docInfo.score === '' ? 10 : docInfo.score) / 2)"
            readonly
            style="margin-top:5px"
          />
        </div>
      </div>
    </div>
    <van-tabs v-model="active" color="#09cf74">
      <van-tab title="挂号">
        <div v-if="morningList.length > 0">
          <div class="TimeLabel">上午班</div>
          <div class="workTime">
            <ul>
              <li v-for="(item, index) in morningList" :key="index">
                <div class="itemContent" @click="select(item)">
                  <div class="time">
                    <img src="./img/clock.png" />
                    <span>{{
                      resetTimeFormat(item.beginTime, item.endTime)
                    }}</span>
                  </div>
                  <div class="leftNum">
                    <span :class="{ over: item.leftNum <= 0 }"
                      >剩余 {{ item.leftNum }}</span
                    >
                    <span :class="{ over: item.leftNum <= 0 }" class="icon"
                      >&gt;</span
                    >
                    <span
                      :class="{ overShow: item.leftNum <= 0 }"
                      class="overMsg"
                      >已约满</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="noonList.length > 0">
          <div class="TimeLabel">中午班</div>
          <div class="workTime">
            <ul>
              <li v-for="(item, index) in noonList" :key="index">
                <div class="itemContent" @click="select(item)">
                  <div class="time">
                    <img src="./img/clock.png" />
                    <span>{{
                      resetTimeFormat(item.beginTime, item.endTime)
                    }}</span>
                  </div>
                  <div class="leftNum">
                    <span :class="{ over: item.leftNum <= 0 }"
                      >剩余 {{ item.leftNum }}</span
                    >
                    <span :class="{ over: item.leftNum <= 0 }" class="icon"
                      >&gt;</span
                    >
                    <span
                      :class="{ overShow: item.leftNum <= 0 }"
                      class="overMsg"
                      >已约满</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="afternoonList.length > 0">
          <div class="TimeLabel">下午班</div>
          <div class="workTime">
            <ul>
              <li v-for="(item, index) in afternoonList" :key="index">
                <div class="itemContent" @click="select(item)">
                  <div class="time">
                    <img src="./img/clock.png" />
                    <span>{{
                      resetTimeFormat(item.beginTime, item.endTime)
                    }}</span>
                  </div>
                  <div class="leftNum">
                    <span :class="{ over: item.leftNum <= 0 }"
                      >剩余 {{ item.leftNum }}</span
                    >
                    <span :class="{ over: item.leftNum <= 0 }" class="icon"
                      >&gt;</span
                    >
                    <span
                      :class="{ overShow: item.leftNum <= 0 }"
                      class="overMsg"
                      >已约满</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="nightList.length > 0">
          <div class="TimeLabel">晚班</div>
          <div class="workTime">
            <ul>
              <li v-for="(item, index) in nightList" :key="index">
                <div class="itemContent" @click="select(item)">
                  <div class="time">
                    <img src="./img/clock.png" />
                    <span>{{
                      resetTimeFormat(item.beginTime, item.endTime)
                    }}</span>
                  </div>
                  <div class="leftNum">
                    <span :class="{ over: item.leftNum <= 0 }"
                      >剩余 {{ item.leftNum }}</span
                    >
                    <span :class="{ over: item.leftNum <= 0 }" class="icon"
                      >&gt;</span
                    >
                    <span
                      :class="{ overShow: item.leftNum <= 0 }"
                      class="overMsg"
                      >已约满</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="介绍">
        <div class="intro">
          {{
            docInfo.doctorIntrodution === "" ||
            docInfo.doctorIntrodution === null
              ? "暂无介绍"
              : docInfo.doctorIntrodution
          }}
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import DocAvatar from '@/base/DocAvatar/DocAvatar'
export default {
  name: 'sTime',
  components: { DocAvatar },
  data () {
    return {
      active: 0,
      docInfo: {},
      workTimeList: []
    }
  },
  created () {
    this.getDocInfo()
    this.getRegSource()
  },
  computed: {
    morningList () {
      return this.workTimeList.length !== 0
        ? this.workTimeList.filter(
          item => item.timeFlag === '上午班'
        ) : []
    },
    noonList () {
      return this.workTimeList.length !== 0
        ? this.workTimeList.filter(
          item => item.timeFlag === '中午班'
        ) : []
    },
    afternoonList () {
      return this.workTimeList.length !== 0
        ? this.workTimeList.filter(
          item => item.timeFlag === '下午班'
        ) : []
    },
    nightList () {
      return this.workTimeList.length !== 0
        ? this.workTimeList.filter(
          item => item.timeFlag === '晚班'
        ) : []
    }
  },
  methods: {
    resetTimeFormat (beginTime, endTime) {
      let begin = beginTime.split(' ')[1].toString()
      let end = endTime.split(' ')[1].toString()
      return begin + '-' + end
    },
    getDocInfo () {
      this.$post('/api/doctor/doc_info', {
        deptCode: this.$store.state.deptCode,
        doctorCode: this.$store.state.doctorCode
      })
        .then(res => {
          if (res.code === 0 && res.data[0]) {
            this.docInfo = res.data[0]
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
        patCardNo: this.$store.state.defaultNo,
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
  min-height: calc(100vh - 180px)
  margin: 90px 0
  background: $color-page-background
  .doctorInfo
    background: $color-white
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    margin-bottom: 2px
    .baseInfo
      width: 690px
      margin: 19px 0 10px 0
      display: flex
      justify-content: start
      align-items: center
      .text
        margin-left: 23px
        .name
          padding-top: 10px
          font-size: 30px
          color: $color-title-black
          font-weight: bold
        .title
          font-size: 24px
          color: $color-title-grey
          font-weight: bold
        .department
          margin-top: 12px
          font-size: 24px
          font-weight: 400
          color: $color-word-grey
  .intro
    padding: 20px
    width: 690px
    font-size: 30px
    line-height: 36px
    font-weight: 400
    color: $color-title-black
  .TimeLabel
    margin: 20px 30px
    @include font(28px, 400, #999)
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
>>>.van-icon-star,>>>.van-icon-star-o
  font-size: 14px
</style>
