<template>
  <div class="guidance2">
    <div class="doctorIntroCard">
      <img class="avatar" src="@/assets/img/图层 826 拷贝 5.png" />
      <div class="doctorInfo">
        <p class="doctorName">杨辉</p>
        <p class="doctorTitle">内分泌科 主任医师</p>
        <div class="star">
          <img v-for="n in 5" :key="n" src="@/assets/img/星星 拷贝 8.png" />
        </div>
        <p class="textIntro">擅长免疫性皮肤病，男性内分泌不平衡，由内分泌引起的各种疾病。</p>
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
        <li v-for="(item,index) in workTimeList" :key="index">
          <router-link to="/reserve4" class="itemContent">
            <div class="time">
              <img src="@/assets/img/时间.png" />
              <span>{{item.time}}</span>
            </div>
            <div class="remaining">
              <span :class="{over: item.remaining<=0}">剩余 {{item.remaining}}</span>
              <span :class="{over: item.remaining<=0}" class="icon">&gt;</span>
              <span :class="{overShow: item.remaining<=0}" class="overMsg">已约满</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import weekSlider from '../components/weekSlider'
export default {
  name: 'Guidance2',
  data () {
    return {
      date: moment(new Date()).format('YYYY-MM-DD'),
      workTimeList: [
        { time: '09:00 - 10:00', remaining: 23 },
        { time: '10:00 - 11:00', remaining: 0 },
        { time: '11:00 - 12:00', remaining: 23 }
      ]
    }
  },
  components: { weekSlider },
  methods: {
    dateClickhandler (e) {
      this.date = e
      console.log(this.date)
    }
  }
}
</script>

<style lang="scss" scoped>
.guidance2 {
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
