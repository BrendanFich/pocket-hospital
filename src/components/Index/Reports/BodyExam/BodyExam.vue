<template>
  <!-- 检验报告 -->
  <div class="bodyExam">
    <div class="list-content" id="list-content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
      >
        <mt-cell
          class="cell"
          is-link
          v-for="(item, index) in lisList"
          :key="index"
          @click.native="linkTo(item.inspectId)"
        >
          <div slot="title" class="content">
            <div class="date">
              <span class="key">报告日期：</span>
              <span class="value">{{ item.reportTime }}</span>
            </div>
            <div class="number">
              <span class="key">化验编号：</span>
              <span class="value">{{ item.inspectId }}</span>
            </div>
            <div class="name">
              <div class="key">化验名称：</div>
              <div class="value highlight">{{ item.inspectName }}</div>
            </div>
          </div>
          <img slot="icon" src="./img/lisList.png" />
        </mt-cell>
      </van-list>
    </div>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'bodyExam',
  data () {
    return {
      lisList: [],
      page: 0,
      loading: false, // 是否处于加载状态
      finished: false, // 是否已加载完所有数据
      isLoading: false, // 是否处于下拉刷新状态
      isShowNoData: false
    }
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('list-content').style.height =
      winHeight - 54 + 'px'
  },
  methods: {
    getLisList () {
      this.$post('/api/report/getLisList', {
        patCardNo: this.$store.state.defaultCard.visitCardNo,
        page: this.page,
        size: 10
      })
        .then(res => {
          this.lisList = [...this.lisList, ...res.data]
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
      this.getLisList()
    },
    linkTo (inspectId) {
      this.$router.push({
        name: 'reportDetail',
        params: { inspectId, checkId: '$' }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.bodyExam
  height: calc(100% - 90px)
  background: $color-page-background
  margin-top: 90px
  .cell
    border-bottom: 1px solid $color-border
    .content
      padding: 37px 0 37px 50px
      font-size: 24px
      line-height: 34px
      color: $color-title-black
      .value
        color: $color-word-grey
      .highlight
        color: $color-primary
    img
      width: 70px
      margin-left: 60px
    /deep/ .mint-cell-allow-right::after
      width: 15px
      height: 15px
      margin-right: 60px
    /deep/ .mint-cell-wrapper
      padding: 0
    &:last-child
      margin-bottom: 98px
  .list-content
    margin-bottom: 90px
    flex: 1
    overflow-y: scroll
    -webkit-overflow-scrolling : touch
    &::-webkit-scrollbar
      display: none
  /deep/ .mint-cell-title
    display: flex
    justify-content: flex-start
    align-items: center
    .name
      display: flex
      max-width: 450px
      .value
        flex: 1
</style>
