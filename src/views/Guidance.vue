<template>
  <div class="guidance">
    <div class="search">
      <div class="searchBox">
        <mt-search v-model="value" placeholder="搜索科室或医生" cancel-text="取消"></mt-search>
      </div>
      <div class="searchTags">
        <span class="tag" v-for="(tag,index) in searchTags" :key="index">{{tag}}</span>
      </div>
    </div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item v-for="(item,index) in departments" :key="index" :id="index">
        <ul style="background: #fff;">
          <li class="doctorIntroCard" v-for="(doctor,dindex) in item.doctors" :key="dindex">
            <img class="avatar" src="@/assets/医生介绍_slices/图层 826 拷贝 5.png" />
            <div class="doctorInfo">
              <p class="doctorName">{{doctor.name}}</p>
              <p class="doctorTitle">{{item.name}} {{doctor.title}}</p>
              <div class="star">
                <img v-for="n in doctor.star" :key="n" src="@/assets/医生介绍_slices/星星 拷贝 8.png" />
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
export default {
  name: 'Guidance',
  data () {
    return {
      value: '',
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
    .searchBox {
      height: 116px;
      display: flex;
      justify-content: center;
      align-items: center;
      .mint-search {
        width: 700px;
        height: 66px;
        /deep/ .mint-searchbar {
          width: 700px;
          height: 66px;
          z-index: 0;
          background: #f6f6f6;
          padding: 0;
          .mint-searchbar-inner {
            background: #f6f6f6;
            height: 24px;
            font-size: 24px;
            .mint-searchbar-core {
              background: #f6f6f6;
            }
          }
        }
      }
    }
    .searchTags {
      width: 710px;
      margin: 0 auto;
      padding-bottom: 27px;
      .tag {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px;
        border: 1px dashed #dfdfdf;
        border-radius: 10px;
      }
    }
  }

  .doctorIntroCard {
    margin-top: 10px;
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
          height: 20px;
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
