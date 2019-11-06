<template>
  <div class="sDayDoc">
    <div class="container">
      <div class="selectedInfo">
        <span class="department">{{$route.params.deptName}}</span>
        <span class="selectedDate">已选:{{date}}</span>
      </div>
      <week-slider
        class="week_slider"
        @dateClick="dateClickhandler"
        :defaultDate="date"
        :showYear="false"
        activeBgColor="#09CF74"
        todayBgColor="#eee"
      ></week-slider>
      <div class="doctorItems">
        <img class="noData" v-if="showDoctors.length === 0" src="@/assets/img/暂无数据.png" />
        <div
          class="item"
          @click="select(item.leftNum, item.doctorCode, item.doctorName)"
          v-for="(item,index) in showDoctors"
          :key="index"
        >
          <div class="doctorInfo">
            <img slot="icon" src="@/assets/img/图层 826 拷贝 2.png" />
            <div class="textInfo">
              <span class="name">{{item.Doctor}}</span>
              <span class="title">{{item.doctorTitle}}</span>
              <br />
              <span
                class="workTime"
                :class="{ pm: item.timeFlag === '2'}"
              >{{item.timeFlag === '2' ? '下午' : '上午'}}</span>
            </div>
          </div>
          <div class="leftNum">
            <span :class="{over: item.leftNum<=0}">剩余 {{item.leftNum}}</span>
            <span :class="{over: item.leftNum<=0}" class="icon">&gt;</span>
            <span :class="{overShow: item.leftNum<=0}" class="overMsg">已约满</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import weekSlider from '@/components/weekSlider'
import util from '@/assets/js/util'

export default {
  name: 'sDayDoc',
  data () {
    return {
      tbSelected: '',
      deptInfo: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      doctors: [
        // {
        //   ChargeItemId: 244807,
        //   Doctor: '侯发明',
        //   Price: 110,
        //   beginTime: '2019-10-29 14:30:00',
        //   deptCode: 173,
        //   doctorCode: 28,
        //   endTime: '2019-10-29 14:59:59',
        //   hasDetailTime: 0,
        //   leftNum: 1,
        //   scheduleDate: '2019-10-29 00:00:00',
        //   timeFlag: '下午班',
        //   totalNum: 1,
        //   workStatus: '出诊'
        // },
        // {
        //   ChargeItemId: 244807,
        //   Doctor: '侯发明',
        //   Price: 110,
        //   beginTime: '2019-10-30 14:30:00',
        //   deptCode: 173,
        //   doctorCode: 28,
        //   endTime: '2019-10-30 14:59:59',
        //   hasDetailTime: 0,
        //   leftNum: 2,
        //   scheduleDate: '2019-10-30 00:00:00',
        //   timeFlag: '下午班',
        //   totalNum: 1,
        //   workStatus: '出诊'
        // },
        // {
        //   ChargeItemId: 244807,
        //   Doctor: '侯发明',
        //   Price: 110,
        //   beginTime: '2019-10-31 14:30:00',
        //   deptCode: 173,
        //   doctorCode: 28,
        //   endTime: '2019-10-31 14:59:59',
        //   hasDetailTime: 0,
        //   leftNum: 3,
        //   scheduleDate: '2019-10-31 00:00:00',
        //   timeFlag: '下午班',
        //   totalNum: 1,
        //   workStatus: '出诊'
        // },
        // {
        //   ChargeItemId: 244807,
        //   Doctor: '侯发明',
        //   Price: 110,
        //   beginTime: '2019-11-01 14:30:00',
        //   deptCode: 173,
        //   doctorCode: 28,
        //   endTime: '2019-11-01 14:59:59',
        //   hasDetailTime: 0,
        //   leftNum: 4,
        //   scheduleDate: '2019-11-01 00:00:00',
        //   timeFlag: '下午班',
        //   totalNum: 1,
        //   workStatus: '出诊'
        // },
        // {
        //   ChargeItemId: 244807,
        //   Doctor: '侯发明',
        //   Price: 110,
        //   beginTime: '2019-11-02 14:30:00',
        //   deptCode: 173,
        //   doctorCode: 28,
        //   endTime: '2019-11-02 14:59:59',
        //   hasDetailTime: 0,
        //   leftNum: 5,
        //   scheduleDate: '2019-11-02 00:00:00',
        //   timeFlag: '下午班',
        //   totalNum: 1,
        //   workStatus: '出诊'
        // }
      ]
    }
  },
  computed: {
    showDoctors () {
      return this.doctors.filter((item) => {
        return item.scheduleDate.indexOf(this.date) !== -1
      })
    }
  },
  components: { weekSlider },
  methods: {
    dateClickhandler (e) {
      this.date = e
      // this.getRegSource()
      console.log(this.date)
    },
    select (leftNum, doctorCode, doctorName) {
      // this.$store.commit('changeDoc', {doctorCode, doctorName: 'ss'})
      if (leftNum > 0) {
        this.$router.push({
          name: 'sTime',
          params: { doctorCode: doctorCode, date: this.date }
          // params: { doctorCode: '020', date: this.date }
        })
      }
    },
    getRegSource () {
      util.http
        .post('/api/doctor/getRegSource', {
          deptCode: this.$route.params.deptCode
          // endDate: this.date 加日期接口无响应
        })
        .then(res => {
          console.log(res)
          this.doctors = res.data.Records
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
    this.getRegSource()
    this.$store.commit('changeDate', this.date)
  },
  watch: {
    date (newDate, oldDate) {
      this.$store.commit('changeDate', newDate)
    }
  }
}
</script>

<style lang="scss" scoped>
.sDayDoc {
  background: #fff;
  height: 100vh;
  .container {
    .selectedInfo {
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .department {
        margin-left: 45px;
        color: #333333;
        font-size: 26px;
        font-weight: bold;
      }
      .selectedDate {
        margin-right: 31px;
        color: #999999;
        font-size: 26px;
        font-weight: bold;
      }
    }
    .doctorItems {
      width: 100%;
      .noData {
        width: 366px;
        margin: 100px 200px;
      }
      .item {
        height: 120px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ededed;
        .doctorInfo {
          margin-left: 37px;
          display: flex;
          justify-content: start;
          align-items: center;
          img {
            width: 102px;
          }
          .textInfo {
            margin-left: 24px;
            .name {
              color: #333333;
              font-size: 28px;
              font-weight: bold;
            }
            .title {
              font-size: 24px;
              color: #cccccc;
              font-weight: bold;
            }
            .workTime {
              display: inline-block;
              padding: 3px 4px;
              background: #09cf74;
              color: #fff;
              border-radius: 5px;
              font-size: 24px;
              margin-top: 8px;
            }
            .pm {
              background: #f5b252;
            }
          }
        }
        .leftNum {
          width: 185px;
          font-size: 24px;
          color: #09cf74;
          font-weight: 400;
          .over {
            display: none;
          }
          .overMsg {
            display: none;
            font-size: 24px;
            color: #999999;
            font-weight: 400;
            float: right;
            margin-right: 48px;
          }
          .overShow {
            display: inline;
          }
          .icon {
            color: #999999;
            float: right;
            margin-right: 48px;
            font-weight: 400;
          }
        }
      }
    }
  }
  /deep/.mt-tabbar {
    height: 98px;
  }
}
</style>
