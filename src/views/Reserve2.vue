<template>
  <div class="reserve2">
    <div class="container">
      <div class="selectedInfo">
        <span class="department">内分泌科(门)</span>
        <span class="selectedDate">已选:{{date}}</span>
      </div>
      <week-slider
        class="week_slider"
        @dateClick="dateClickhandler"
        :defaultDate="date"
        :showYear="false"
        activeBgColor="#09CF74"
      ></week-slider>
      <div class="doctorItems">
        <div class="item" v-for="(item,index) in doctorItems" :key="index">
          <div class="doctorInfo">
            <img slot="icon" src="@/assets/预约挂号_slices/图层 826 拷贝 2.png" />
            <div class="textInfo">
              <span class="name">{{item.name}}</span>
              <span class="title">{{item.title}}</span>
              <br />
              <span class="workTime">{{item.workTime}}</span>
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
    <SimpleTabbar></SimpleTabbar>
  </div>
</template>

<script>
import moment from 'moment'
import weekSlider from '../components/weekSlider'
import SimpleTabbar from '../components/SimpleTabbar'

export default {
  name: 'Reserve2',
  data () {
    return {
      tbSelected: '',
      date: moment(new Date()).format('YYYY-MM-DD'),
      doctorItems: [
        {
          name: '杨辉',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 10
        },
        {
          name: '杨辉',
          title: '主任医师',
          workTime: '下午',
          avatarUrl: '',
          remaining: 2
        },
        {
          name: '杨辉',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 0
        },
        {
          name: '杨辉',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 0
        },
        {
          name: '杨辉',
          title: '主任医师',
          workTime: '下午',
          avatarUrl: '',
          remaining: 2
        },
        {
          name: '杨辉',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 0
        },
        {
          name: '杨辉',
          title: '主任医师',
          workTime: '上午',
          avatarUrl: '',
          remaining: 0
        }
      ]
    }
  },
  components: { weekSlider, SimpleTabbar },
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
  .container {
    margin-top: 80px;
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
            height: 102px;
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
