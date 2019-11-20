<template>
  <div class="gSTime">
    <div class="doctorIntroCard">
      <img class="avatar" src="./img/avatar100x101.png" />
      <div class="doctorInfo">
        <p class="doctorName">{{doctorInfo.doctorName}}</p>
        <p class="doctorTitle">{{doctorInfo.deptName}} {{doctorInfo.doctorTitle}}</p>
        <div class="star">
          <img v-for="n in 5" :key="n" src="./img/starOn.png" />
        </div>
        <p class="textIntro">{{doctorInfo.doctorIntrodution ? doctorInfo.doctorIntrodution : '擅长免疫性皮肤病，男性内分泌不平衡，由内分泌引起的各种疾病。'}}</p>
      </div>
    </div>
    <week-slider
      class="week_slider"
      @dateClick="dateClickhandler"
      :defaultDate="date"
      :showYear="false"
      activeBgColor="#09CF74"
    ></week-slider>
    <div class="workTime">
      <ul>
        <li v-for="(item,index) in showWorkTime" :key="index">
          <div @click="linkTo(item)" class="itemContent">
            <div class="time">
              <img src="./img/clock.png" />
              <span>{{item.beginTime.split(' ')[1]}}-{{item.endTime.split(' ')[1]}}</span>
            </div>
            <div class="remaining">
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
import moment from 'moment'
import WeekSlider from '@/base/WeekSlider/WeekSlider'
import util from '@/assets/js/util'

export default {
  name: 'gSTime',
  data () {
    return {
      doctorInfo: {},
      date: moment(new Date()).format('YYYY-MM-DD'),
      allworkTime: []
    }
  },
  computed: {
    showWorkTime () {
      return this.allworkTime.filter((item) => {
        return item.scheduleDate.indexOf(this.date) !== -1
      })
    }
  },
  components: { WeekSlider },
  created () {
    this.getDoctorInfo()
    this.getRegSource()
  },
  methods: {
    dateClickhandler (e) {
      this.date = e
    },
    linkTo (item) {
      let timeFlag
      if (item.timeFlag === '上午班') {
        timeFlag = '1'
      } else if (item.timeFlag === '下午班') {
        timeFlag = '2'
      } else {
        timeFlag = '3'
      }
      if (item.leftNum > 0) {
        this.$store.commit('changeDate', this.date)
        this.$store.commit('changeTime', item.scheduleDate.split(' ')[0])
        this.$store.commit('changeBeginTime', item.beginTime.split(' ')[1])
        this.$store.commit('changeEndTime', item.endTime.split(' ')[1])
        this.$store.commit('setPrice', item.Price)
        this.$store.commit('changeTimeFlag', timeFlag)
        this.$router.push('/reserve/confirm')
      }
    },
    getDoctorInfo () {
      util.http
        .post('/api/doctor/doc_info', { deptCode: this.$route.params.deptCode, doctorCode: this.$route.params.doctorCode })
        .then(res => {
          this.doctorInfo = res.data.Records[0]
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRegSource () {
      util.http
        .post('/api/doctor/getRegSource', { deptCode: '173', doctorCode: '020' })
        .then(res => {
          this.allworkTime = res.data.Records.filter(item => {
            return moment(item.beginTime, 'YYYY-MM-DD HH:mm:ss').valueOf() + 1800000 > Date.parse(new Date())
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.gSTime {
  background: #f2f2f2;
  height: 100vh;
  .doctorIntroCard {
    background: #fff;
    height: 195px;
    padding: 30px 50px 40px 30px;
    border-bottom: 1px solid#dedede;
    display: flex;
    .avatar {
      width: 100px;
      height: 100px;
      margin-right: 24px;
    }
    .doctorInfo {
      flex: 1;
      .doctorName {
        font-size: 30px;
        color: #333333;
        font-weight: bold;
        line-height: 42px;
      }
      .doctorTitle {
        font-size: 24px;
        color: #333333;
        line-height: 34px;
      }
      .star {
        padding: 5px 0 10px 0;
        img {
          width: 20px;
        }
      }
      .textIntro {
        font-size: 24px;
        line-height: 36px;
        color: #999999;
      }
    }
  }
  .week_slider {
    margin-top: 18px;
    background: #fff;
  }
  .workTime {
    background: #fff;
    margin-top: 8px;
    ul > li {
      padding-left: 31px;
      padding-right: 47px;
      border-bottom: 1px solid #ededed;
      .itemContent {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 88px;
        .time {
          display: flex;
          align-items: center;
          color: #333333;
          font-size: 30px;
          img {
            width: 24px;
            margin-right: 16px;
          }
        }
      }
      .remaining {
        font-size: 24px;
        color: #09cf74;
        .over {
          display: none;
        }
        .overMsg {
          display: none;
          color: #999999;
          float: right;
        }
        .overShow {
          display: inline;
        }
        .icon {
          color: #999999;
          float: right;
          margin-left: 38px;
        }
      }
    }
  }
}
</style>
