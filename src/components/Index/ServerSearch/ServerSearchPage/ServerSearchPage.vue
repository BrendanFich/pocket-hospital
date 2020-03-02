<template>
  <div class="serverSearchPage">
    <van-search
      v-model="value"
      placeholder="请输入医疗服务名称"
      show-action
      @cancel="onCancel"
    />
    <div class="list-content" id="list-content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
      >
        <mt-cell
          class="cell"
          v-for="(item, index) in resultList"
          :key="index"
        >
          <div slot="icon" class="fakePicture"></div>
          <div slot="title" class="content">
            <div>名称：{{ item.Name }}</div>
            <div>价格：{{ item.Price }}元</div>
            <div>单位：{{ item.PriceUnit }}</div>
          </div>
        </mt-cell>
        <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'serverSearchPage',
  data () {
    return {
      page: 0,
      loading: false,
      finished: false,
      isLoading: false,
      isShowNoData: false,
      value: '',
      timer: null,
      resultList: []
    }
  },
  mounted () {
    document.querySelector('input').focus()
    let winHeight = document.documentElement.clientHeight
    document.getElementById('list-content').style.height =
      winHeight - 54 + 'px'
  },
  methods: {
    onCancel () {
      this.$router.go(-1)
    },
    getResultList () {
      this.$post('/api/doctor/medicalService', {
        search_key: this.value,
        page: this.page,
        size: 10
      })
        .then(res => {
          this.resultList = [...this.resultList, ...res.data]
          if (this.resultList === 0) {
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
      if (this.value) {
        this.page += 1
        this.getResultList()
      } else {
        this.loading = false
      }
    }
  },
  watch: {
    value () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (this.value) {
          this.resultList = []
          this.page = 1
          this.isShowNoData = false
          this.getResultList()
        }
        this.timer = null
      }, 500)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.serverSearchPage
  @include main()
  display: flex
  flex-direction: column
  .list-content
    margin-bottom: 90px
    flex: 1
    overflow-y: auto
    -webkit-overflow-scrolling : touch
    margin-top: 20px
    .cell
      border-bottom: 1px solid $color-border
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
>>>.van-icon.van-icon-search
  color: $color-primary
>>>.van-search__action
  color: $color-primary
>>>.van-search__content
  background: $color-page-background
</style>
