<template>
  <div class="sDept">
    <div class="searchbar">
      <img class="cancelIcon" src="./img/search.png" alt />
      <input
        type="text"
        v-model="value"
        placeholder="搜索科室名称"
        @focus="focus"
      />
      <div class="xIcon" :class="{ show: value }" @click="clear">×</div>
      <button class="cancel" :class="{ show: isShow }" @click="cancel">
        取消
      </button>
      <div class="resultList" :class="{ show: isShow }">
        <img
          class="noData"
          v-if="searchResult.length === 0 && value !== ''"
          src="./img/noData.png"
        />
        <div
          v-for="(item, index) in searchResult"
          :key="index"
          @click="select(item.deptCode, item.deptName)"
        >
          <mt-cell :title="item.deptName">
            <img class="icon" src="./img/deptIcon.png" />&gt;
          </mt-cell>
        </div>
      </div>
    </div>

    <div class="content" :class="{ hidden: isShow }">
      <mt-navbar v-model="selected" class="left_navbar">
        <mt-tab-item id="0">全院科室</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected" class="right_container">
        <mt-tab-container-item id="0">
          <div
            v-for="(item, index) in deptList"
            :key="index"
            @click="select(item.deptCode, item.deptName)"
          >
            <mt-cell :title="item.deptName">
              <img class="icon" src="./img/deptIcon.png" />&gt;
            </mt-cell>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sDept',
  data () {
    return {
      value: '',
      selected: '0',
      deptList: [],
      isShow: false
    }
  },
  computed: {
    searchResult () {
      const pingYinMatch = require('pinyin-match')
      if (this.value) {
        let result = []
        this.deptList.forEach(element => {
          let m = pingYinMatch.match(element.deptName, this.value)
          if (m) {
            result.push(element)
          }
        })
        return result
      } else {
        return []
      }
    }
  },
  created () {
    this.$post('/api/doctor/allDeptInfo')
      .then(res => {
        this.deptList = res.data
      })
      .catch(error => {
        console.log(error)
      })
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
    select (deptCode, deptName) {
      this.$store.commit('updateArea', '全院')
      this.$store.commit('updateDeptCode', deptCode)
      this.$store.commit('updateDeptName', deptName)
      this.$router.push('/reserve/sDayDoc')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.sDept
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
        border-bottom: 1px solid #e3e3e3
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
      background: #f6f6f6
      border-radius: 50%
      width: 30px
      height: 25px
      text-align: center
      padding-bottom: 5px
      color: $color-title-black
    .show
      display: block
  .content
    height: calc(100vh - 128px)
    width: 100%
    display: flex
    justify-content: center
    .left_navbar
      display: flex
      flex-direction: column
      width: 161px
      flex-wrap: wrap
      background: #f2f2f2
      .mint-tab-item
        width: 161px
        height: 80px
        flex: none
        padding: 0
        color: $color-value-grey
        /deep/ .mint-tab-item-label
          font-size: 26px
          line-height: 80px
      .mint-tab-item.is-selected
        color: $color-white
        background: $color-primary
        border: none
        text-decoration: none
    .right_container
      width: 589px
      background: $color-white
      overflow-y: scroll
      .noData
        width: 366px
        margin-top: 50px
      /deep/ .mint-cell-wrapper
        height: 80px
        padding: 0 25px
        border-bottom: 1px solid #e3e3e3
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
  .hidden
    display: none
</style>
