<template>
  <div class="serverIndex">
    <img src="./img/serverPriceBg.png" />
    <van-search placeholder="搜索药品名称" @focus="focus" />
    <div class="list-content" id="list-content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
      >
        <mt-cell
          class="cell list-item"
          v-for="(item, index) in drugList"
          :key="index"
        >
          <div slot="icon" class="fakePicture"></div>
          <div slot="title" class="content">
            <div>名称：{{ item.Name }}</div>
            <div>价格：{{ item.Price }}元</div>
            <div>单位：{{item.PriceUnit}}</div>
          </div>
        </mt-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'serverIndex',
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
      winHeight -
      308 * Math.min(document.documentElement.clientWidth / 750, 2) +
      'px'
    // 调整上拉加载框高度,由于使用rem的原因此处不能只用减120px
  },
  methods: {
    focus () {
      this.$router.push('/serverSearch/serverSearchPage')
    },
    getMedicineList () {
      this.$post('/api/doctor/medicalService', {
        page: this.page,
        size: 10
      })
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
.serverIndex
  background: $color-page-background
  height: 100vh
  img
    width: 100%
    display: block
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
