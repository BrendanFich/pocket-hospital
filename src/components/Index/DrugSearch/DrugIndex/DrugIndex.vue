<template>
  <div class="drugSearch">
    <div class="displayCard">
      <img src="./img/ecbdfe95978b0.png" />
      <div class="title">
        <h1>掌上医院</h1>
        <p>自助药品搜索</p>
        <div class="icon"></div>
      </div>
    </div>

      <van-search
        placeholder="搜索药品名称"
        @focus='focus'
      />
    <div class="list-content" id="list-content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
      >
        <mt-cell
          class="cell list-item"
          is-link
          v-for="(item, index) in drugList"
          :key="index"
        >
          <div slot="icon" class="fakePicture"></div>
          <div slot="title" class="content">
            <div>药品名称：{{ item.MedicineName }}</div>
            <div>药品规格：{{ item.Model }}/{{ item.Unit }}</div>
            <div>药品价格：{{ item.Price }}元</div>
          </div>
        </mt-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drugSearch',
  data () {
    return {
      drugList: [],
      page: 0,
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完所有数据
      isLoading: false, // 是否处于下拉刷新状态
      isShowNoData: false
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight // 视口大小
    document.getElementById('list-content').style.height =
      winHeight - (308 * Math.min(document.documentElement.clientWidth / 750, 2)) + 'px'
      // 调整上拉加载框高度,由于使用rem的原因此处不能只用减120px
  },
  methods: {
    focus () {
      this.$router.push('/drugSearch/drugSearchPage')
    },
    getMedicineList () {
      this.$post('/api/medicine/list', { medicineName: '', page: this.page, size: 10 })
        .then(res => {
          this.drugList = [...this.drugList, ...res.data]
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
    onLoad () {
      this.page += 1
      this.getMedicineList()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.drugSearch
  background: $color-page-background
  height: 100vh
  .displayCard
    height: 200px
    background: linear-gradient(to right, #47baeb, #65d5f1)
    display: flex
    justify-content: flex-start
    align-items: center
    > img
      width: 150px
      margin-left: 69px
      margin-right: 53px
    .title
      color: $color-white
      h1
        font-size: 36px
        line-height: 48px
      p
        font-size: 26px
        line-height: 36px
      .icon
        width: 60px
        height: 6px
        border-radius: 3px
        background: $color-xIcon-grey
        margin-top: 20px
        opacity: 0.75
  .cell
    .fakePicture
      width: 123px
      height: 123px
      background: $color-img-grey
      margin-right: 30px
    .content
      font-size: 24px
      line-height: 42px
      color: $color-black
      flex: 1
    /deep/ .mint-cell-allow-right::after
      width: 15px
      height: 15px
      margin-right: 60px
    /deep/ .mint-cell-wrapper
      padding: 0
  /deep/ .mint-cell-title
    padding: 27px 80px 27px 40px
    display: flex
    justify-content: flex-start
    align-items: center
  .list-content
    overflow-y: scroll // 很重要
    -webkit-overflow-scrolling : touch // 解决view滑动速度慢或者卡顿问题
    &::-webkit-scrollbar
      display: none
>>>.van-icon.van-icon-search
  color: $color-primary
>>>.van-search__action
  color: $color-primary
>>>.van-search__content
  background: $color-page-background
</style>
