<template>
  <div class="sDayDoc">
    <div class="container">
      <div class="selectedInfo">
        <span class="department">{{$store.state.deptName}}</span>
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
  </div>
</template>

<script>
import Week from '@/base/Week/Week'
import DocAvatar from '@/base/DocAvatar/DocAvatar'
export default {
  name: 'sDayDoc',
  components: { Week, DocAvatar },
  data () {
    return {
      date: '',
      scheduleList: []
    }
  },
  computed: {
  },

  methods: {
    changeDate (val) {
      this.date = val
      this.getRegSource(val)
    },
    select (item) {
      if (item.leftNum > 0) {
        this.$store.commit('updateDeptCode', item.deptCode)
        this.$store.commit('updateDoctorCode', item.doctorCode)
        this.$store.commit('updateTimeFlag', item.timeFlag)
        this.$store.commit('updateBeginTime', item.beginTime)
        this.$router.push('/reserve/sTime')
      }
    },
    getRegSource (date) {
      this.$post('/api/doctor/getRegSource', {
        deptCode: this.$store.state.deptCode.toString(),
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
            color: $color-primary
            float: right
            margin-right: 48px
            font-weight: 400
  /deep/.mt-tabbar
    height: 98px
</style>
