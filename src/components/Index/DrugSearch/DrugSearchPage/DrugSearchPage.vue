<template>
  <div class="drugSearchPage">
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入药品名称"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        autofocus
      />
    </form>
    <div class="resultContent">
      <mt-cell
        class="cell list-item"
        v-for="(item, index) in resultList"
        :key="index"
      >
        <div slot="icon" class="fakePicture"></div>
        <div slot="title" class="content">
          <div>药品名称：{{ item.MedicineName }}</div>
          <div>药品规格：{{ item.Model }}/{{ item.Unit }}</div>
          <div>药品价格：{{ item.Price }}元</div>
        </div>
      </mt-cell>
      <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'drugSearchPage',
  data () {
    return {
      value: '',
      timer: null,
      resultList: [],
      isShowNoData: false
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {
      this.$router.go(-1)
    },
    getResultList () {
      this.$post('/api/medicine/list', { medicineName: this.value, page: 1, size: 1000 })
        .then(res => {
          this.resultList = res.data
          if (res.page.count === 0) {
            this.isShowNoData = true
          }
        })
        .catch(error => {
          console.log(error)
        })
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
.drugSearchPage
  background: $color-page-background
  height: 100vh
  .resultContent
    height: calc( 100vh - 128px )
    overflow-y: auto
    margin-top: 20px
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
    .noData
      width: 366px
      margin: 100px 0 0 200px
>>>.van-icon.van-icon-search
  color: $color-primary
>>>.van-search__action
  color: $color-primary
>>>.van-search__content
  background: $color-page-background
</style>
