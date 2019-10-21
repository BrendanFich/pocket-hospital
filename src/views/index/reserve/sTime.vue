<template>
  <div class="sTime">
    <div class="doctorInfo">
      <div class="baseInfo">
        <img src="@/assets/img/图层 826 拷贝 2.png" alt />
        <div>
          <div class="name">杨辉</div>
          <div class="department">内分泌科(门)</div>
        </div>
      </div>
      <div class="intro">
        主任医师，擅长治疗内分泌失调，免疫力低下。曾在中山大学
        研究院专业研修学习。已在岗位十年经验。
      </div>
    </div>
    <div class="workTime">
      <ul>
        <li v-for="(item,index) in workTimeList" :key="index">
          <div class="itemContent" @click="select(item.remaining,item.time)">
            <div class="time">
              <img src="@/assets/img/时间.png" />
              <span>{{item.time}}</span>
            </div>
            <div class="remaining">
              <span :class="{over: item.remaining<=0}">剩余 {{item.remaining}}</span>
              <span :class="{over: item.remaining<=0}" class="icon">&gt;</span>
              <span :class="{overShow: item.remaining<=0}" class="overMsg">已约满</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import util from '@/utils/util'
import moment from 'moment'

export default {
  name: 'sTime',
  data () {
    return {
      // workTimeList: [
      //   { time: '09:00 - 10:00', remaining: 23 },
      //   { time: '10:00 - 11:00', remaining: 0 },
      //   { time: '11:00 - 12:00', remaining: 23 }
      // ],
      workTimeList: {
        deptCode: '336',
        doctorCode: '659',
        doctorName: '钟志峰',
        doctorTitle: '主治医师',
        scheduleDate: moment(new Date()).format('YYYY-MM-DD'),
        timeFlag: '1',
        hasDetailTime: '',
        beginTime: '',
        endTime: '',
        workStatus: '1',
        regFee: '20',
        totalNum: '5',
        leftNum: '3'
      }
    }
  },
  created () {
    this.getRegSource()
  },
  methods: {
    getRegSource () {
      util.http
        .post('/api/doctor/getRegSource', {
          doctorCode: this.$route.params.doctorCode,
          endDate: this.$route.params.date
        })
        .then(res => {
          // this.showDoctors = res.data.Records
          // console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    linkTo (remaining) {
      if (remaining <= 0) {
        return ''
      } else {
        return '/reserve/confirm'
      }
    },
    select (remaining, time) {
      if (remaining > 0) {
        this.$store.commit('changeTime', time)
        this.$router.push('/reserve/confirm')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sTime {
  background: #f2f2f2;
  height: 100vh;
  .doctorInfo {
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .baseInfo {
      width: 690px;
      margin: 19px 0 25px 0;
      display: flex;
      justify-content: start;
      align-items: center;
      img {
        width: 102px;
        margin-right: 23px;
      }
      div {
        .name {
          font-size: 30px;
          color: #333333;
          font-weight: bold;
        }
        .department {
          margin-top: 12px;
          font-size: 24px;
          font-weight: 400;
          color: #999999;
        }
      }
    }
    .intro {
      margin-bottom: 24px;
      width: 690px;
      font-size: 24px;
      line-height: 36px;
      font-weight: 400;
      color: #333333;
    }
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
