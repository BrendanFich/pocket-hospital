<template>
  <div class="sSymptom">
    <div class="search">
      <van-search placeholder="请输入相应症状" @focus="search('#')" />
      <div class="searchTags">
        <span
          class="tag"
          v-for="(tag, index) in searchTags"
          :key="index"
          @click="search(tag.describe)"
        >{{ tag.describe }}</span>
      </div>
    </div>
    <div class="list-content" id="list-content">
      <van-list v-model="loading" :finished="finished" @load="onLoad" :offset="10">
        <div
          class="doctorIntroCard"
          v-for="(item, index) in docList"
          :key="index"
          @click="linkTo(item.deptCode, item.deptName, item.doctorCode, item.doctorName)"
        >
          <div class="baseInfo">
            <div class="left">
              <DocAvatar :name="item.doctorName" />
              <div>
                <p class="doctorName">{{ item.doctorName }}</p>
                <p class="doctorTitle">{{ item.deptName }} | {{ item.doctorTitle }}</p>
                <van-rate :value="Math.round(item.score / 2)" readonly />
              </div>
            </div>
            <div class="right price">
              <img src="./img/communication.png" />
              <span>{{ item.price ? item.price + '元' : '' }}</span>
            </div>
          </div>
          <p class="textIntro">{{ item.doctorIntrodution || '暂无介绍'}}</p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import DocAvatar from '@/base/DocAvatar/DocAvatar'
export default {
  name: 'sSymptom',
  components: { DocAvatar },
  data () {
    return {
      page: 0,
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完所有数据
      isLoading: false, // 是否处于下拉刷新状态
      isShowNoData: false,
      timer: null,
      searchTags: [],
      searchResult: [],
      docList: []
    }
  },

  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('list-content').style.height =
      winHeight -
      (180 * Math.min(document.documentElement.clientWidth / 750, 2) + 54) +
      'px'
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
    onLoad () {
      this.page += 1
      this.getDocList()
    },
    getDocList () {
      this.$post('/api/doctor/intelligent_guidance', {
        describe: '',
        page: this.page,
        size: 10
      })
        .then(res => {
          this.docList = [...this.docList, ...res.data]
          if (res.page.count === 0) {
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
    linkTo (deptCode, deptName, doctorCode, doctorName) {
      this.$store.commit('updateDeptCode', deptCode)
      this.$store.commit('updateDeptName', deptName)
      this.$store.commit('updateDoctorCode', doctorCode)
      this.$store.commit('updateDoctorName', doctorName)
      this.$router.push({ name: 'gSTime' })
    },
    search (tagName) {
      this.$router.push({ name: 'docSearchPage', params: { tagName } })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.sSymptom
  @include main()
  display: flex
  flex-direction: column
  .search
    background: $color-white
    margin-bottom: 20px
    .searchTags
      width: 710px
      height: 160px
      padding: 0 20px
      overflow: auto
      .tag
        display: inline-block
        padding: 10px 12px
        margin: 10px 15px
        border: 2px solid $color-primary
        border-radius: 10px
        font-size: 24px
        color: $color-primary
  .list-content
    flex: 1
    overflow-y: scroll
    -webkit-overflow-scrolling : touch
    &::-webkit-scrollbar
      display: none
    .doctorIntroCard
      background: $color-white
      height: 160px
      padding: 30px 50px 40px 30px
      border-bottom: 1px solid $color-border
      .baseInfo
        display: flex
        justify-content: space-between
        align-items: center
        .left
          display: flex
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
        line-height: 30px
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
        overflow: hidden
>>>.van-icon.van-icon-search
  color: $color-primary
>>>.van-search__action
  color: $color-primary
>>>.van-search__content
  background: $color-page-background
>>>.van-icon-star,>>>.van-icon-star-o
  font-size: 12px
</style>
