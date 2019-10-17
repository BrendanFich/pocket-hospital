<template>
  <div class="sDayDoc">
    <div class="container">
      <div class="selectedInfo">
        <span class="department">{{deptInfo.deptName}}</span>
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
          @click="select(item.remaining, item.name)"
          v-for="(item,index) in showDoctors"
          :key="index"
        >
          <div class="doctorInfo">
            <img slot="icon" src="@/assets/img/图层 826 拷贝 2.png" />
            <div class="textInfo">
              <span class="name">{{item.name}}</span>
              <span class="title">{{item.title}}</span>
              <br />
              <span class="workTime" :class="{ pm: item.workTime === '下午'}">{{item.workTime}}</span>
            </div>
          </div>
          <div class="remaining">
            <span :class="{over: item.remaining<=0}">剩余 {{item.remaining}}</span>
            <span :class="{over: item.remaining<=0}" class="icon">&gt;</span>
            <span :class="{overShow: item.remaining<=0}" class="overMsg">已约满</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import weekSlider from '@/components/weekSlider'
import util from '@/utils/util'

export default {
  name: 'sDayDoc',
  data () {
    return {
      tbSelected: '',
      deptInfo: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      showDoctors: [
        {
          'deptCode': '',
          'doctorCode': '',
          'scheduleDate': '',
          'timeFlag': '',
          'hasDetailTime': '',
          'beginTime': '',
          'endTime': '',
          'workStatus': '',
          'regFee': '',
          'totalNum': '',
          'leftNum': ''
        },
        {
          'deptCode': '',
          'doctorCode': '',
          'scheduleDate': '',
          'timeFlag': '',
          'hasDetailTime': '',
          'beginTime': '',
          'endTime': '',
          'workStatus': '',
          'regFee': '',
          'totalNum': '',
          'leftNum': ''
        }
      ],
      changdaoDoctors: [
        {
          name: '杨辉1',
          title: '主任医师',
          workTime: '下午',
          avatarUrl: '',
          remaining: 10
        },
        {
          name: '陈辉2',
          title: '主任医师',
          workTime: '下午',
          avatarUrl: '',
          remaining: 2
        },
        {
          name: '杨辉3',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 0
        }
      ],
      guDoctors: [
        {
          name: '张三1',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 10
        },
        {
          name: '张三2',
          title: '主任医师',
          workTime: '下午',
          avatarUrl: '',
          remaining: 2
        },
        {
          name: '张三3',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 0
        }
      ],
      pifuDoctors: [
        {
          name: '李四1',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 10
        },
        {
          name: '李四2',
          title: '主任医师',
          workTime: '下午',
          avatarUrl: '',
          remaining: 2
        },
        {
          name: '李四3',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 0
        }
      ],
      erhoubiDoctors: [
        {
          name: '王五1',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 10
        },
        {
          name: '王五2',
          title: '主任医师',
          workTime: '下午',
          avatarUrl: '',
          remaining: 2
        },
        {
          name: '王五3',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 0
        }
      ],
      neifenmiDoctors: []
    }
  },
  computed: {
    // 当天医生上班列表
    // showDoctors () {
    //   if (this.$store.state.selectedDept === '肠道专科') return this.changdaoDoctors
    //   if (this.$store.state.selectedDept === '骨内科') return this.guDoctors
    //   if (this.$store.state.selectedDept === '皮肤科') return this.pifuDoctors
    //   if (this.$store.state.selectedDept === '内分泌科') return this.neifenmiDoctors
    //   if (this.$store.state.selectedDept === '耳鼻喉科') return this.erhoubiDoctors
    //   return {}
    // }
  },
  components: { weekSlider },
  methods: {
    dateClickhandler (e) {
      this.date = e
      console.log(this.date)
    },
    select (remaining, name) {
      this.$store.commit('changeDoc', name)
      if (remaining > 0) {
        this.$router.push('/reserve/sTime')
      }
    }
  },
  created () {
    util.http
      .post('/api/doctor/dept_info', {
        deptCode: '00' + this.$store.state.selectedDept
      })
      .then(res => {
        this.deptInfo = res.data.Records[0]
      })
      .catch(error => {
        console.log(error)
      })
    // util.http
    //   .post('/api/doctor/getRegSource', {deptCode: this.deptInfo.deptCode})
    //   .then(res => {
    //     this.showDoctors = res.data.Records
    //     console.log(res)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    util.http
      .post('/api/doctor/doc_info')
      .then(res => {
        // this.showDoctors = res.data.Records
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
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
      text-align: center;
      .noData {
        width: 366px;
        margin-top: 50px;
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
        .remaining {
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
