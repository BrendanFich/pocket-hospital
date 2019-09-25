<template>
  <div class="guidance">
    <div class="search">
      <Searchbar placeholder="搜索科室或医生"></Searchbar>
      <div class="searchTags">
        <span class="tag" v-for="(tag,index) in searchTags" :key="index">{{tag}}</span>
      </div>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="(item,index) in departments" :key="index" :id="index">
        <router-link class="item" to="/guidance2">
          <ul style="background: #fff;">
            <li class="doctorIntroCard" v-for="(doctor,dindex) in item.doctors" :key="dindex">
              <div class="baseInfo">
                <div class="left">
                  <img class="avatar" src="@/assets/img/图层 826 拷贝 5.png" />
                  <div>
                    <p class="doctorName">{{doctor.name}}</p>
                    <p class="doctorTitle">{{item.name}} {{doctor.title}}</p>
                    <div class="star">
                      <img v-for="n in doctor.star" :key="n" src="@/assets/img/星星 拷贝 8.png" />
                    </div>
                  </div>
                </div>
                <div class="right price">
                  <img src="@/assets/img/沟通.png" />
                  <span>{{doctor.price}}元</span>
                </div>
              </div>
              <p class="textIntro">{{doctor.intro}}</p>
            </li>
          </ul>
        </router-link>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Searchbar from '@/components/Searchbar'
export default {
  name: 'Guidance',
  components: { Searchbar },
  data () {
    return {
      selected: 0,
      searchTags: [
        '头痛',
        '消化不良',
        '月经不调',
        '妇科炎症',
        '过敏',
        '头痛',
        '消化不良',
        '月经不调'
      ],
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
              price: 20,
              intro:
                '擅长免疫性皮肤病，男性内分泌不平衡，由内分泌 引起的各种疾病。'
            },
            {
              avatarUrl: '',
              name: '刘玉明',
              title: '主任医师',
              star: 4,
              price: 30,
              intro:
                '擅长免疫性皮肤病，男性内分泌不平衡，由内分泌 引起的各种疾病。'
            },
            {
              avatarUrl: '',
              name: '杨辉',
              title: '教授',
              star: 3,
              price: 50,
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
              price: 50,
              intro:
                '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病。'
            },
            {
              avatarUrl: '',
              name: '刘玉明',
              title: '主任医师',
              star: 5,
              price: 50,
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
              price: 50,
              intro:
                '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病。'
            }
          ]
        },
        { name: '耳鼻喉科', bgcolor: '#61E3B4' },
        { name: '骨内科', bgcolor: '#619BE3' },
        { name: '内分泌专科', bgcolor: '#E3B461' },
        { name: '皮肤科', bgcolor: '#E36A61' },
        { name: '肠道专科', bgcolor: '#98E361' },
        { name: '耳鼻喉科', bgcolor: '#61E3B4' },
        { name: '骨内科', bgcolor: '#619BE3' },
        { name: '内分泌专科', bgcolor: '#E3B461' },
        { name: '皮肤科', bgcolor: '#E36A61' },
        { name: '肠道专科', bgcolor: '#98E361' },
        { name: '耳鼻喉科', bgcolor: '#61E3B4' },
        { name: '骨内科', bgcolor: '#619BE3' },
        { name: '内分泌专科', bgcolor: '#E3B461' },
        { name: '皮肤科', bgcolor: '#E36A61' },
        { name: '肠道专科', bgcolor: '#98E361' },
        { name: '耳鼻喉科', bgcolor: '#61E3B4' },
        { name: '骨内科', bgcolor: '#619BE3' }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.guidance {
  background: #f2f2f2;
  height: 100vh;
  .search {
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .searchTags {
      width: 710px;
      margin-bottom: 38px;
      .tag {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px;
        border: 1px dashed #dfdfdf;
        border-radius: 10px;
        font-size: 24px;
        color: #999999;
      }
    }
  }

  .doctorIntroCard {
    margin-top: 10px;
    height: 195px;
    padding: 30px 50px 40px 30px;
    border-bottom: 1px solid#dedede;

    .baseInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        .avatar {
          width: 100px;
          height: 100px;
          margin-right: 24px;
        }
        div {
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
        }
      }

      .price {
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          width: 38px;
          margin-bottom: 15px;
        }
        span {
          color: #333333;
          font-size: 24px;
        }
      }
    }
    .textIntro {
      font-size: 24px;
      color: #999999;
      margin-left: 124px;
    }
  }
}
</style>
