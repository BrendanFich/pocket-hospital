<template>
  <div class="cardManage">
    <div class="btns">
      <van-button type="info" class="addBtn" color="linear-gradient(to right, #45bcec, #63d4f2)" @click="linkTo('/mine/cardManage/bindCard')">绑定就诊卡</van-button>
      <van-button type="info" class="addBtn" color="linear-gradient(to right, #33cab9, #2ce794)" @click="toBandCardHtml">绑定健康卡</van-button>
    </div>
    <h2 v-if="bindedCardList.length > 0">已绑定卡列表</h2>
    <ul class="cardList">
      <li
        class="customerInfoCard"
        v-for="(item, index) in bindedCardList"
        :key="index"
      >
        <HealthCard :cardInfo="item" :class="{defualt: item.isDefualt}"></HealthCard>
      </li>
    </ul>
    <div class="emptycard" v-if="bindedCardList.length === 0"><img src="./img/nocard.png"/><p>暂无绑卡</p></div>
  </div>
</template>

<script>
export default {
  name: 'cardManage',
  data () {
    return {
      bindedCardList: [],
      defaultCardNo: ''
    }
  },
  components: { HealthCard: () => import('@/base/HealthCard/HealthCard') },
  computed: {
  },
  methods: {
    linkTo (path) {
      this.$router.push(path)
    },
    toBandCardHtml () {
      this.$post('/api/health/addcard/geturl')
        .then(res => {
          if (res.code === 0) {
            window.location = res.data
          } else {
            alert('获取跳转地址失败')
          }
        })
    }
  },
  created () {
    this.$post('/api/user/vx_info').then(res => {
      if (res.code === 0) {
        this.bindedCardList = res.data.info.pat_list
        let index = res.data.info.pat_list.findIndex(i => {
          return i.visitCardNo === res.data.info.visitCardNo
        })
        if (index !== -1) {
          this.bindedCardList[index].isDefualt = true
        }
        this.defaultCardNo = res.data.info.visitCardNo
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.cardManage
  @include main()
  h2
    color: $color-word-grey
    font-size: 28px
    padding: 20px 30px 5px 50px
  .cardList
    overflow-y: auto
    margin-bottom: 98px
    background: $color-page-background
    .customerInfoCard
      width: 6.2rem * 3.3
      margin: .3rem * 3.3 auto
      .defualt
        // border-width: 3px 3px 3px 60px
        border-width: 3px
        border-style: solid
        border-color:  #f69343
        border-radius: .165rem * 3.3
        overflow: hidden
  .btns
    margin-top: 20px
    display: flex
    justify-content: space-around
    align-items: center
    .addBtn
      width: 300px
      margin: 10px
      border-radius: 10px
  .emptycard
    display: block
    width: 620px
    height: 350px
    margin: 0 auto
    border-radius: 50px
    position: relative
  .emptycard img
    margin: 100px auto 20px
    display: block
    width: 150px
    height: 220px
  .emptycard p
    width: 100%
    text-align: center
    font-size: 30px
    line-height: 80px
    color: #aaa
</style>
