<template>
  <div class="reportDetail">
    <div v-if="$route.params.checkId === '$'" class="jy">
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
          <div
            class="result"
            :class="{
              overRange:
                item.result.indexOf('↓') !== -1 ||
                item.result.indexOf('↑') !== -1
            }"
          >
            {{
              item.result.indexOf("↓") !== -1 || item.result.indexOf("↑") !== -1
                ? item.result.substr(1)
                : item.result
            }}
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
    <div v-else class="jc">
      <van-cell-group>
        <!-- <van-cell title="科室名称" :value="jcObj.deptName" /> -->
        <van-cell title="检查编号" :value="jcObj.checkId" />
        <van-cell title="检查名称" :value="jcObj.checkName" />
        <van-cell title="检查状态" :value="jcObj.checkStatus" />
        <van-cell title="报告时间" :value="jcObj.reportTime" />
        <van-cell title="内容所见" :label="jcObj.ReportResult"  />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reportDetail',
  data () {
    return {
      list: [],
      isShowNoData: false,
      jcObj: {}
    }
  },
  created () {
    if (this.$route.params.checkId === '$') {
      this.getLisItems()
    } else {
      // this.getPacsItems()
      this.jcObj = JSON.parse(localStorage.getItem('jcdetail'))
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
          this.jcObj = res.data[0]
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
  min-height: calc(100% - 90px)
  margin: 90px 0
  ul
    margin: 0 20px
    padding-bottom: 10px
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
      width: 130px
    .overRange
      color: #f69343
    .refRange
      width: 200px
    .unit
      flex: 1
  .jc
    padding: 20px
    >>>.van-cell>.van-cell__value
      color: $color-primary
</style>
