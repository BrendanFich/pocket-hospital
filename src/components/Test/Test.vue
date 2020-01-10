<template>
  <div class="test">
    <div class="tabBox">
      <div class="tab">未付款</div>
      <div class="tab">已付款</div>
    </div>
    <div class="list-content" id="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :offset="10"
        >
          <div class="list-item">
            <van-cell v-for="item in list" :key="item" :title="item + ''" />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完所有数据
      isLoading: false // 是否处于下拉刷新状态
    }
  },
  methods: {
    onLoad () {
      // 上拉加载
      setTimeout(() => {
        for (let i = 0; i < 15; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false
        if (this.list.length >= 60) {
          this.finished = true
        }
      }, 500)
    },
    onRefresh () {
      // 下拉刷新
      setTimeout(() => {
        this.finished = false
        this.isLoading = false
        this.list = []
        this.onLoad()
      }, 500)
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight // 视口大小
    console.warn(winHeight)
    document.getElementById('list-content').style.height =
      winHeight - (120 * Math.min(document.documentElement.clientWidth / 750, 2)) + 'px'
      // 调整上拉加载框高度,由于使用rem的原因此处不能只用减120px
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.test
  @include page($color-page-background)
  .tabBox
    display: flex
    margin-bottom: 30px
    .tab
      flex: 1
      height: 90px
      display: flex
      justify-content: center
      align-items: center
      color: $color-word-grey
      background: $color-white
    .tab.active
      color: $color-white
      background: $color-primary
.list-content
  overflow-y: scroll
.list-item
  text-align: center
</style>
