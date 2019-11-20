<template>
  <div class="sSymptom">
    <div class="search">
      <div class="searchbar">
        <img class="cancelIcon" src="@/assets/img/search.png" alt />
        <input type="text" v-model="value" placeholder="请输入您的症状" @focus="focus" />
        <div class="xIcon" :class="{show: value}" @click="clear">×</div>
        <button class="cancel" :class="{show : isShow}" @click="cancel">取消</button>
        <div class="resultList" :class="{show : isShow}">
          <div class="doctorIntroCard" v-for="(item,index) in searchResult" :key="index" @click="linkTo(item)">
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
      <mt-tab-container-item :class="{hidden: isShow}">
        <div class="item">
          <ul style="background: #fff;">
            <li class="doctorIntroCard" v-for="(item, index) in showDoctors" :key="index" @click="linkTo(item)">
              <div class="baseInfo">
                <div class="left">
                  <img class="avatar" src="@/assets/img/avatar100x101.png" />
                  <div>
                    <p class="doctorName">{{item.doctorName}}</p>
                    <p class="doctorTitle">{{item.deptName}} {{item.doctorTitle}}</p>
                    <div class="star">
                      <img v-for="n in 5" :key="n" src="@/assets/img/starOn.png" />
                    </div>
                  </div>
                </div>
                <div class="right price">
                  <img src="@/assets/img/communication.png" />
                  <span>{{item.price ? item.price : 20}}元</span>
                </div>
              </div>
              <p class="textIntro">{{item.doctorIntrodution}}</p>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
  </div>
</template>

<script>
import Searchbar from '@/base/Searchbar'
import util from '@/assets/js/util'

export default {
  name: 'sSymptom',
  components: { Searchbar },
  data () {
    return {
      value: '',
      timer: null,
      isShow: false,
      searchTags: [
        '风湿',
        '骨质',
        '肠道',
        '妇科炎症',
        '风湿',
        '骨质',
        '肠道',
        '妇科炎症'
      ],
      docRecommend: [],
      searchResult: [],
      showDoctors: [
        {
          USER_ID: '7',
          deptCode: '254',
          deptName: '骨质增生专科',
          doctorCode: '006',
          doctorIntrodution: '骨质增生专科副主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种骨质疾病',
          doctorName: '卢梅生',
          doctorSkill: '',
          doctorTitle: '副主任医师',
          score: ''
        },
        {
          USER_ID: '101',
          deptCode: '301',
          deptName: '风湿骨痛专科',
          doctorCode: '108',
          doctorIntrodution: '风湿骨痛专科副主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种风湿疾病',
          doctorName: '袁佳',
          doctorSkill: '',
          doctorTitle: '副主任医师',
          score: ''
        },
        {
          USER_ID: '10',
          deptCode: '277',
          deptName: '肛肠科',
          doctorCode: '012',
          doctorIntrodution: '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病',
          doctorName: '刘伟忠',
          doctorSkill: '',
          doctorTitle: '副主任医师',
          score: ''
        }
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
    },
    linkTo (item) {
      this.$store.commit('changeDept', {deptName: item.deptName, deptCode: item.deptCode})
      this.$store.commit('changeDoc', {docName: item.doctorName, docCode: item.USER_ID})
      this.$router.push({name: 'gSTime', params: {deptCode: item.deptCode, doctorCode: item.USER_ID}})
    }
  },
  watch: {
    value () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
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
