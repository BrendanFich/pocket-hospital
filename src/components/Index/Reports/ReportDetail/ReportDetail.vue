<template>
  <div class="reportDetail">
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
    <ul v-else>
      <li class="head">
        <div class="itemName">项目名称</div>
        <div class="result">结果</div>
        <div class="refRange">参考范围</div>
        <div class="unit">单位</div>
      </li>
      <li v-for="(item, index) in list" :key="index">
        <div class="itemName">
          {{ item.itemName }}
        </div>
        <div class="result" :class="{ overRange: item.abnormal === '1' }">
          {{ item.result }}
        </div>
        <div class="refRange">
          {{ item.refRange }}
        </div>
        <div class="unit">
          {{ item.unit }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'reportDetail',
  data () {
    return {
      list: [],
      isShowNoData: false
    }
  },
  created () {
    if (this.$route.params.inspectId) {
      this.getLisItems()
    } else {
      this.getPacsItems()
    }
  },
  methods: {
    getLisItems () {
      this.$post('/api/report/getLisItems', {
        inspectId: this.$route.params.inspectId
      })
        .then(res => {
          this.list = res.data
          if (res.data.length === 0) {
            this.isShowNoData = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPacsItems () {
      this.$post('/api/report/getPacsItems', {
        checkId: this.$route.params.checkId
      })
        .then(res => {
          this.list = res.data
          if (res.data.length === 0) {
            this.isShowNoData = true
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.reportDetail
  background: $color-page-background
  min-height: 100vh
  ul
    margin: 0 20px
    display: flex
    flex-direction: column
    li
      padding: 10px
      font-size: 30px
      display: flex
      align-content: center
      border-bottom: 1px solid $color-primary
      &:last-child
        border: none
    .head
      height: 40px
      line-height: 40px
    .itemName
      width: 230px
      margin-right: 10px
    .result
      width: 110px
    .overRange
      color: #f69343
    .refRange
      width: 200px
    .unit
      flex: 1
</style>
