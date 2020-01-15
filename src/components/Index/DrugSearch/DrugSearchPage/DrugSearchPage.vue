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
    <ul class="resultContent">
      <li>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'drugSearchPage',
  data () {
    return {
      value: '',
      timer: null,
      searchResult: ''
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {
      this.$router.go(-1)
    },
    getSearchResult () {
      this.$post('/api/doctor/getmedicinal', { medicineName: this.value })
        .then(res => {
          this.searchResult = res.data.Records
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
          this.searchResult = []
          this.getSearchResult()
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
  .searchbar
    width: 750px
    height: 120px
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
  .resultContent
    margin-top: 20px
>>>.van-icon.van-icon-search
  color: $color-primary
>>>.van-search__action
  color: $color-primary
>>>.van-search__content
  background: $color-page-background
</style>
