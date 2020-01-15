<template>
  <div class="sSymptom">
    <div class="search">
      <van-search placeholder="请输入相应症状" @focus="linkTo('docSearchPage',{tagName: ''})" />
      <div class="searchTags">
        <span
          class="tag"
          v-for="(tag, index) in searchTags"
          :key="index"
          @click="linkTo('docSearchPage',{tagName: tag.describe})"
          >{{ tag.describe }}</span
        >
      </div>
    </div>
    <div class="list-content" id="list-content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
      >
        <div
          class="doctorIntroCard"
          v-for="(item, index) in docList"
          :key="index"
          @click="linkTo('gSTime',{})"
        >
          <div class="baseInfo">
            <div class="left">
              <img class="avatar" src="./img/avatar100x101.png" />
              <div>
                <p class="doctorName">{{ item.doctorName }}</p>
                <p class="doctorTitle">
                  {{ item.deptName }} {{ item.doctorTitle }}
                </p>
                <div class="star">
                  <img v-for="n in 5" :key="n" src="./img/starOn.png" />
                </div>
              </div>
            </div>
            <div class="right price">
              <img src="./img/communication.png" />
              <span>{{ item.price ? item.price : 20 }}元</span>
            </div>
          </div>
          <p class="textIntro">{{ item.doctorIntrodution }}</p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sSymptom',
  data () {
    return {
      page: 0,
      loading: false, // 是否处于加载状态
      finished: true, // 是否已加载完所有数据
      isLoading: false, // 是否处于下拉刷新状态
      isShowNoData: false,
      timer: null,
      searchTags: [
        // { describe: '风湿' },
        // { describe: '骨质' },
        // { describe: '肠道' },
        // { describe: '妇科炎症' },
        // { describe: '风湿' },
        // { describe: '骨质' },
        // { describe: '肠道' },
        // { describe: '妇科炎症' }
      ],
      searchResult: [],
      docList: [
        {
          USER_ID: '7',
          deptCode: '254',
          deptName: '骨质增生专科',
          doctorCode: '006',
          doctorIntrodution:
            '骨质增生专科副主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种骨质疾病',
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
          doctorIntrodution:
            '风湿骨痛专科副主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种风湿疾病',
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
          doctorIntrodution:
            '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病',
          doctorName: '刘伟忠',
          doctorSkill: '',
          doctorTitle: '副主任医师',
          score: ''
        },
        {
          USER_ID: '10',
          deptCode: '277',
          deptName: '肛肠科',
          doctorCode: '012',
          doctorIntrodution:
            '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病',
          doctorName: '刘伟忠',
          doctorSkill: '',
          doctorTitle: '副主任医师',
          score: ''
        },
        {
          USER_ID: '10',
          deptCode: '277',
          deptName: '肛肠科',
          doctorCode: '012',
          doctorIntrodution:
            '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病',
          doctorName: '刘伟忠',
          doctorSkill: '',
          doctorTitle: '副主任医师',
          score: ''
        }
      ]
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight // 视口大小
    document.getElementById('list-content').style.height =
      winHeight -
      280 * Math.min(document.documentElement.clientWidth / 750, 2) +
      'px'
    // 调整上拉加载框高度,由于使用rem的原因此处不能只用减120px
  },
  created () {
    this.getDescribe()
  },
  methods: {
    getDescribe () {
      this.$post('/api/doctor/guidance/describe')
        .then(res => {
          this.searchTags = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    focus (tagName) {
      this.$router.push({ name: 'docSearchPage', params: { tagName } })
    },
    onLoad () {
      this.page += 1
      this.getDocList()
    },
    getDocList () {
      this.$post('/api/doctor/intelligent_guidance', { describe: '', page: this.page, size: 10 })
        .then(res => {
          this.docList = [...this.docList, ...res.data]
          if (res.data.length === 0) {
            this.isShowNoData = true
          }
          this.loading = false
          if (res.page.totalPage <= res.page.currentPage) {
            this.finished = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    linkTo (name, params) {
      this.$router.push({ name, params })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.sSymptom
  @include page($color-page-background)
  .search
    background: $color-white
    height: 260px
    margin-bottom: 20px
    .searchTags
      width: 710px
      padding: 0 20px 20px
      .tag
        display: inline-block
        padding: 10px 12px
        margin: 10px 15px
        border: 1px solid $color-primary
        border-radius: 10px
        font-size: 24px
        color: $color-primary
  .list-content
    height: calc( 100vh - 254px )
    overflow-y: scroll // 很重要
    -webkit-overflow-scrolling : touch // 解决view滑动速度慢或者卡顿问题
    &::-webkit-scrollbar
      display: none
    .doctorIntroCard
      background: $color-white
      height: 195px
      padding: 30px 50px 40px 30px
      border-bottom: 1px solid $color-border
      .baseInfo
        display: flex
        justify-content: space-between
        align-items: center
        .left
          display: flex
          .avatar
            width: 100px
            height: 100px
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
          margin-right: 20px
          display: flex
          justify-content: center
          align-items: center
          flex-direction: column
          img
            width: 38px
            margin-bottom: 15px
          span
            color: $color-title-black
            font-size: 24px
      .textIntro
        font-size: 24px
        color: $color-word-grey
        margin-left: 124px
>>>.van-icon.van-icon-search
  color: $color-primary
>>>.van-search__action
  color: $color-primary
>>>.van-search__content
  background: $color-page-background
</style>
