<template>
  <div class="selectDoc">
    <div class="searchbar">
      <img class="cancelIcon" src="./img/search.png" alt />
      <input type="text" v-model="value" placeholder="搜索医生" @focus="focus" />
      <div class="xIcon" :class="{show: value}" @click="clear">×</div>
      <button class="cancel" :class="{show : isShow}" @click="cancel">取消</button>
      <div class="resultList" :class="{show : isShow}">
        <div v-if="searchResult.length===0 && value !== ''" class="noInfo">无相关医生信息</div>
        <div class="doctorIntroCard" v-for="(item,index) in searchResult" :key="index" @click="select(item.deptCode, item.doctorCode)">
          <div class="baseInfo">
            <img class="avatar" src="./img/avatar100x101.png" />
            <div style="width:260px">
              <p class="doctorName">{{item.doctorName}}</p>
              <p class="doctorTitle">{{item.deptName}} {{item.doctorTitle}}</p>
              <div class="star">
                <img v-for="n in 5" :key="n" src="./img/starOn.png" />
              </div>
            </div>
            <div class="price">
              <img src="./img/communication.png" />
              <span>{{item.price ? item.price : "20"}}元</span>
            </div>
          </div>
          <p class="textIntro">{{item.doctorIntrodution ? item.doctorIntrodution : '暂无简介'}}</p>
        </div>
      </div>
    </div>

      <mt-tab-container-item  :class="{hidden: isShow}">
        <div class="item">
          <ul style="background: #fff;">
            <li class="doctorIntroCard" v-for="(item,index) in doctors" :key="index"  @click="select(item.deptCode, item.doctorCode)">
              <div class="baseInfo">
                <img class="avatar" src="./img/avatar100x101.png" />
                <div style="width:260px">
                  <p class="doctorName">{{item.doctorName}}</p>
                  <p class="doctorTitle">{{item.deptName}} {{item.doctorTitle}}</p>
                  <div class="star">
                    <img v-for="n in 5" :key="n" src="./img/starOn.png" />
                  </div>
                </div>
                <div class="price">
                  <img src="./img/communication.png" />
                  <span>{{item.price ? item.price : "20"}}元</span>
                </div>
              </div>
              <p class="textIntro">{{item.doctorIntrodution ? item.doctorIntrodution : '暂无简介'}}</p>
            </li>
          </ul>
        </div>
      </mt-tab-container-item>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'selectDoc',
  data () {
    return {
      doctors: [],
      value: '',
      isShow: false
    }
  },
  computed: {
    searchResult () {
      if (this.value === '') {
        return []
      } else {
        return this.doctors.filter((item) => { return item.doctorName.indexOf(this.value) !== -1 })
      }
    }
  },
  methods: {
    focus () {
      this.isShow = true
    },
    cancel () {
      this.value = ''
      this.isShow = false
    },
    clear () {
      this.value = ''
    },
    select (deptCode, doctorCode) {
      this.$router.push({name: 'docIntro', params: {deptCode: deptCode.toString(), doctorCode: doctorCode.toString()}})
    }
  },
  created () {
    util.http.post('/api/doctor/doc_info', {
      deptCode: this.$route.params.deptCode
    }).then(res => {
      this.doctors = res.data.Records
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.selectDoc
  @include page($color-page-background)
  .searchbar
    width: 750px
    position: relative
    input
      margin: 30px 25px
      border-radius: 10px
      padding: 20px 70px
      width: 560px
      border: none
      outline: none
      font-size: 24px
    .cancelIcon
      width: 16px
      position: absolute
      top: 55px
      left: 65px
    .cancel
      display: none
      position: absolute
      top: 30px
      right: 50px
      font-size: 24px
      border: none
      background: $color-white
      outline: none
      height: 68px
      margin-left: -10px
      color: $color-primary
    .resultList
      background: $color-white
      display: none
      min-height: calc(100vh - 128px)
      /deep/ .mint-cell-wrapper
        height: 80px
        padding: 0 25px
        border-bottom: 1px solid $color-border
        .mint-cell-text
          padding-left: 50px
          font-size: 26px
          color: $color-title-black
        .mint-cell-value
          .icon
            position: absolute
            left: 32px
            top: 27px
            width: 20px
      .resultStyle
        font-size: 24px
        padding: 20px 30px
        border-bottom: 1px solid $color-border
      .resultItem
        display: flex
        align-items: center
        padding: 10px 30px
        font-size: 20px
        line-height: 30px
        border-bottom: 1px solid $color-border
    .xIcon
      display: none
      position: absolute
      top: 50px
      right: 130px
      font-size: 25px
      background: $color-xIcon-grey
      border-radius: 50%
      width: 30px
      height: 25px
      text-align: center
      padding-bottom: 5px
      color: $color-title-black
    .show
      display: block
    .noInfo
      padding: 20px
  .doctorIntroCard
    margin-top: 10px
    height: 195px
    padding: 30px 50px 40px 30px
    border-bottom: 1px solid $color-border
    .baseInfo
      display: flex
      justify-content: flex-start
      align-items: center
      .avatar
        width: 100px
        margin-right: 24px
      div
        .doctorName
          font-size: 30px
          color: $color-title-black
          font-weight: bold
          line-height: 42px
        .doctorTitle
          font-size: 24px
          color: $color-title-black
          line-height: 34px
        .star
          padding: 5px 0 10px 0
          img
            width: 20px
      .price
        width: 73px
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        img
          width: 38px
          margin-bottom: 10px
        span
          color: $color-title-black
          font-size: 24px
    .textIntro
      font-size: 24px
      color: $color-word-grey
      margin-left: 124px
  .hidden
    display: none
</style>
