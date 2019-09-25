<template>
  <div class="reserve2">
    <div class="container">
      <div class="selectedInfo">
        <span class="department">{{$route.params.dname}}</span>
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
        <router-link class="item" to="/reserve3" v-for="(item,index) in showDoctors" :key="index">
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
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import weekSlider from '../components/weekSlider'
export default {
  name: 'Reserve2',
  data () {
    return {
      tbSelected: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
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
      neifenmiDoctors: [
        {
          name: '陈六1',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 10
        },
        {
          name: '陈六2',
          title: '主任医师',
          workTime: '下午',
          avatarUrl: '',
          remaining: 2
        },
        {
          name: '陈六3',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 0
        }
      ]
    }
  },
  computed: {
    showDoctors () {
      if (this.$route.params.dname === '肠道专科') return this.changdaoDoctors
      if (this.$route.params.dname === '骨内科') return this.guDoctors
      if (this.$route.params.dname === '皮肤科') return this.pifuDoctors
      if (this.$route.params.dname === '内分泌科') return this.neifenmiDoctors
      if (this.$route.params.dname === '耳鼻喉科') return this.erhoubiDoctors
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
.reserve2 {
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
            .pm{
              background: #F5B252;
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
