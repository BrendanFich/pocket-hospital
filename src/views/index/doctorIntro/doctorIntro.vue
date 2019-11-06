<template>
  <div class="doctorIntro">
    <div style="background: #fff;">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in deptList" :key="index">
          <div class="icon" :style="{background: color[index%5]}">{{item.deptName.substring(0,1)}}</div>
          <div class="department">{{item.deptName}}</div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="title">医生简介</div>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="(item,index) in deptList" :key="index" :id="index">
        <img class="noData" v-if="docList.length === 0"  src="@/assets/img/暂无数据.png" />
        <ul style="background: #fff;">
          <li class="doctorIntroCard" v-for="(doctor,dindex) in docList" :key="dindex">
            <img class="avatar" src="@/assets/img/图层 826 拷贝 5.png" />
            <div class="doctorInfo">
              <p class="doctorName">{{doctor.doctorName}}</p>
              <p class="doctorTitle">{{doctor.doctorTitle}} {{doctor.title}}</p>
              <div class="star">
                <img v-for="n in doctor.star" :key="n" src="@/assets/img/星星 拷贝 8.png" />
              </div>
              <p class="textIntro">{{doctor.doctorIntrodution === null ? '暂无介绍' :doctor.doctorIntrodution }}</p>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import util from '@/assets/js/util'
let vm = null
export default {
  name: 'doctorIntro',
  data () {
    return {
      selected: 0,
      swiperOption: {
        slidesPerView: 5.5,
        slideToClickedSlide: true,
        on: {
          tap: function () {
            const clickedIndex = this.clickedIndex
            vm.handleClickSlide(clickedIndex)
          }
        }
      },
      color: ['#E3B461', '#E36A61', '#98E361', '#61E3B4', '#619BE3'],
      deptList: [],
      docList: []
    }
  },
  computed: {
    // showDocList() {
    //   return this.docList.slice()
    // }
  },
  created () {
    vm = this
    this.getDeptList()
    this.getDocInfo()
  },
  methods: {
    handleClickSlide (index) {
      console.log(this.deptList[index].deptCode)
      this.selected = index
      this.getDocInfo(this.deptList[index].deptCode)
    },
    getDeptList () {
      util.http
        .post('/api/doctor/allDeptInfo')
        .then(res => {
          this.deptList = res.data.Records.slice(0, 20)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getDocInfo (deptCode) {
      if (deptCode === undefined) {
        deptCode = '00336'
        console.log(deptCode)
      }
      util.http
        .post('/api/doctor/doc_info', {deptCode: deptCode})
        .then(res => {
          this.docList = res.data.Records
          console.log(res.data.Records)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.doctorIntro {
  background: #f2f2f2;
  height: 100vh;
  text-align: center;
  .noData {
    width: 366px;
    margin-top: 50px;
  }
  /deep/ .swiper-wrapper {
    padding: 0 20px;
  }
  .swiper-slide {
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 70px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      font-size: 30px;
    }
    .department {
      height: 22px;
      margin-top: 15px;
      font-size: 20px;
      color: #666666;
    }
  }
  .title {
    font-size: 24px;
    color: #999999;
    line-height: 88px;
    margin-left: 30px;
  }
  .doctorIntroCard {
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
      text-align: start;
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
        color: #999999;
      }
    }
  }
}
</style>
