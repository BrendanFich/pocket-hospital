<template>
  <div class="examination">
    <div class="list-content" id="list-content">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :offset="10"
      >
        <mt-cell class="cell" is-link v-for="(item, index) in pacsList" :key="index" @click.native="linkeTo(item)">
          <div slot="title" class="content">
            <div class="date">
              <span class="key">报告日期：</span>
              <span class="value">{{item.reportTime}}</span>
            </div>
            <div class="number">
              <span class="key">化验编号：</span>
              <span class="value">{{item.checkId}}</span>
            </div>
            <div class="name">
              <span class="key">化验名称：</span>
              <span class="value highlight">{{item.checkName}}</span>
            </div>
          </div>
          <img slot="icon" src="./img/pacsList.png" />
        </mt-cell>
      </van-list>
    </div>
    <img class="noData" v-if="isShowNoData" src="./img/noData.png" />
  </div>
</template>

<script>
export default {
  name: 'examination',
  data () {
    return {
      pacsList: [],
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
    setDefaultCard () {
      return new Promise((resolve, reject) => {
        this.$post('/api/user/vx_info')
          .then(res => {
            if (res.data.info.visitCardNo) {
              let index = res.data.info.pat_list.findIndex(i => {
                return i.visitCardNo === res.data.info.visitCardNo
              })
              console.log(index > -1 ? res.data.info.pat_list[index] : {})
              this.$store.commit('setDefaultCard', index > -1 ? res.data.info.pat_list[index] : {})
            }
            resolve(true)
          })
          .catch(error => {
            console.log(error)
            resolve(true)
          })
      })
    },
    async getPacsList () {
      if (!this.$store.state.defaultCardNo) {
        await this.setDefaultCard()
      }
      this.$post('/api/report/getPacsList', {
        patCardNo: this.$store.state.defaultCardNo,
        page: this.page,
        size: 10
      })
        .then(res => {
          this.pacsList = [...this.pacsList, ...res.data]
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
      this.getPacsList()
    },
    linkeTo (item) {
      localStorage.setItem('jcdetail', JSON.stringify(item))
      this.$router.push({name: 'reportDetail', params: {checkId: item.checkId, inspectId: '$'}})
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.examination
  @include main()
  .cell
    border-bottom: 1px solid $color-border
    .content
      width: 450px
      padding: 37px 0 42px 50px
      height: 105px
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
</style>
