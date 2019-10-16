<template>
  <div class="doctorIntro">
    <div style="background: #fff;">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in departments" :key="index">
          <div class="icon" :style="{background: item.bgcolor}">{{item.name.substring(0,1)}}</div>
          <div class="department">{{item.name}}</div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="title">医生简介</div>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="(item,index) in departments" :key="index" :id="index">
        <img class="noData" v-if="!item.doctors" src="@/assets/img/暂无数据.png" />
        <ul style="background: #fff;">
          <li class="doctorIntroCard" v-for="(doctor,dindex) in item.doctors" :key="dindex">
            <img class="avatar" src="@/assets/img/图层 826 拷贝 5.png" />
            <div class="doctorInfo">
              <p class="doctorName">{{doctor.name}}</p>
              <p class="doctorTitle">{{item.name}} {{doctor.title}}</p>
              <div class="star">
                <img v-for="n in doctor.star" :key="n" src="@/assets/img/星星 拷贝 8.png" />
              </div>
              <p class="textIntro">{{doctor.intro}}</p>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
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
      departments: [
        {
          name: '内分泌专科',
          bgcolor: '#E3B461',
          doctors: [
            {
              avatarUrl: '',
              name: '杨辉',
              title: '主任医师',
              star: 5,
              intro:
                '擅长免疫性皮肤病，男性内分泌不平衡，由内分泌 引起的各种疾病。'
            },
            {
              avatarUrl: '',
              name: '杨辉',
              title: '主任医师',
              star: 4,
              intro:
                '擅长免疫性皮肤病，男性内分泌不平衡，由内分泌 引起的各种疾病。'
            },
            {
              avatarUrl: '',
              name: '杨辉',
              title: '主任医师',
              star: 3,
              intro:
                '擅长免疫性皮肤病，男性内分泌不平衡，由内分泌 引起的各种疾病。'
            }
          ]
        },
        {
          name: '皮肤科',
          bgcolor: '#E36A61',
          doctors: [
            {
              avatarUrl: '',
              name: '刘玉明',
              title: '主任医师',
              star: 5,
              intro:
                '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病。'
            },
            {
              avatarUrl: '',
              name: '刘玉明',
              title: '主任医师',
              star: 5,
              intro:
                '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病。'
            }
          ]
        },
        {
          name: '肠道专科',
          bgcolor: '#98E361',
          doctors: [
            {
              avatarUrl: '',
              name: '梁君婷',
              title: '主任医师',
              star: 5,
              intro:
                '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病。'
            }
          ]
        },
        { name: '耳鼻喉科', bgcolor: '#61E3B4', doctors: [] },
        { name: '骨内科', bgcolor: '#619BE3', doctors: [] },
        { name: '内分泌专科', bgcolor: '#E3B461', doctors: [] },
        { name: '皮肤科', bgcolor: '#E36A61', doctors: [] },
        { name: '肠道专科', bgcolor: '#98E361', doctors: [] },
        { name: '耳鼻喉科', bgcolor: '#61E3B4', doctors: [] },
        { name: '骨内科', bgcolor: '#619BE3', doctors: [] },
        { name: '内分泌专科', bgcolor: '#E3B461', doctors: [] },
        { name: '皮肤科', bgcolor: '#E36A61', doctors: [] },
        { name: '肠道专科', bgcolor: '#98E361', doctors: [] },
        { name: '耳鼻喉科', bgcolor: '#61E3B4', doctors: [] },
        { name: '骨内科', bgcolor: '#619BE3', doctors: [] },
        { name: '内分泌专科', bgcolor: '#E3B461', doctors: [] },
        { name: '皮肤科', bgcolor: '#E36A61', doctors: [] },
        { name: '肠道专科', bgcolor: '#98E361', doctors: [] },
        { name: '耳鼻喉科', bgcolor: '#61E3B4', doctors: [] },
        { name: '骨内科', bgcolor: '#619BE3,doctors:[]', doctors: [] }
      ]
    }
  },
  created () {
    vm = this
  },
  methods: {
    handleClickSlide (index) {
      this.selected = index
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
    height: 144px;
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
