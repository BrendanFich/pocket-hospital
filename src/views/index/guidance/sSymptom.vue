<template>
  <div class="sSymptom">
    <div class="search">
      <div class="searchbar">
        <img class="cancelIcon" src="@/assets/img/search.png" alt />
        <input type="text" v-model="value" placeholder="请输入您的症状" @focus="focus" />
        <div class="xIcon" :class="{show: value}" @click="clear">×</div>
        <button class="cancel" :class="{show : isShow}" @click="cancel">取消</button>
        <div class="resultList" :class="{show : isShow}">
          <div class="doctorIntroCard" v-for="(item,index) in searchResult" :key="index">
            <div class="baseInfo">
              <div class="left">
                <img class="avatar" src="@/assets/img/avatar100x101.png" />
                <div>
                  <p class="doctorName">{{item.doctorName}}</p>
                  <p class="doctorTitle">{{item.deptName}} {{item.doctorTitle}}</p>
                  <div class="star">
                    <img v-for="n in item.score" :key="n" src="@/assets/img/starOn.png" />
                  </div>
                </div>
              </div>
              <div class="right price">
                <img src="@/assets/img/communication.png" />
                <!-- <span>{{item.price}}元</span> -->
              </div>
            </div>
            <p class="textIntro">{{item.doctorIntrodution}}</p>
          </div>
        </div>
      </div>

      <div class="searchTags" :class="{hidden: isShow}">
        <span
          class="tag"
          v-for="(tag,index) in searchTags"
          :key="index"
          @click="clickTag(tag)"
        >{{tag}}</span>
      </div>
    </div>
    <mt-tab-container v-model="selected" :class="{hidden: isShow}">
      <mt-tab-container-item v-for="(item,index) in departments" :key="index" :id="index">
        <router-link class="item" to="/guidance/gSTime">
          <ul style="background: #fff;">
            <li class="doctorIntroCard" v-for="(doctor,dindex) in item.doctors" :key="dindex">
              <div class="baseInfo">
                <div class="left">
                  <img class="avatar" src="@/assets/img/avatar100x101.png" />
                  <div>
                    <p class="doctorName">{{doctor.name}}</p>
                    <p class="doctorTitle">{{item.name}} {{doctor.title}}</p>
                    <div class="star">
                      <img v-for="n in 5" :key="n" src="@/assets/img/starOn.png" />
                    </div>
                  </div>
                </div>
                <div class="right price">
                  <img src="@/assets/img/communication.png" />
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
import util from '@/assets/js/util'

export default {
  name: 'sSymptom',
  components: { Searchbar },
  data () {
    return {
      value: '',
      timer: null,
      isShow: false,
      selected: 0,
      searchTags: [
        '风湿',
        '消化不良',
        '月经不调',
        '妇科炎症',
        '过敏',
        '风湿',
        '消化不良',
        '月经不调'
      ],
      docRecommend: [],
      searchResult: [],
      departments: [
        {
          doctors: [
            {
              avatarUrl: '',
              name: '杨辉',
              deptName: '内分泌专科',
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
  created () {},
  methods: {
    focus () {
      this.isShow = true
    },
    cancel () {
      this.value = ''
      this.isShow = false
      this.searchResult = []
    },
    clear () {
      this.value = ''
      this.searchResult = []
    },
    getSearchResult () {
      util.http
        .post('/api/doctor/intelligent_guidance', { describe: this.value })
        .then(res => {
          console.log(res)
          this.searchResult = res.data.Records
        })
        .catch(error => {
          console.log(error)
        })
    },
    clickTag (tagName) {
      this.focus()
      this.value = tagName
    }
  },
  watch: {
    value () {
      // 函数防抖
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        // 搜索内容为空时，不发请求
        if (this.value) {
          this.searchResult = []
          this.getSearchResult()
        }
        this.timer = null
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.sSymptom {
  background: #f2f2f2;
  height: 100vh;
  .searchbar {
    width: 750px;
    position: relative;
    input {
      margin: 30px 25px;
      border-radius: 10px;
      padding: 20px 70px;
      width: 560px;
      border: none;
      outline: none;
      font-size: 24px;
    }
    .cancelIcon {
      width: 16px;
      position: absolute;
      top: 55px;
      left: 65px;
    }
    .cancel {
      display: none;
      position: absolute;
      top: 30px;
      right: 50px;
      font-size: 24px;
      border: none;
      background: #fff;
      outline: none;
      height: 68px;
      margin-left: -10px;
      color: #09cf74;
    }
    .resultList {
      background: #fff;
      display: none;
      min-height: calc(100vh - 128px);
      .resultStyle {
        font-size: 24px;
        padding: 20px 30px;
        border-bottom: 1px solid #dedede;
      }
      .resultItem {
        display: flex;
        align-items: center;
        padding: 10px 30px;
        font-size: 20px;
        line-height: 30px;
        border-bottom: 1px solid #dedede;
      }
    }

    .xIcon {
      display: none;
      position: absolute;
      top: 50px;
      right: 130px;
      font-size: 25px;
      background: #f6f6f6;
      border-radius: 50%;
      width: 30px;
      height: 25px;
      text-align: center;
      padding-bottom: 5px;
      color: #333;
    }
    .show {
      display: block;
    }
  }
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
  .hidden {
    display: none;
  }
}
</style>
