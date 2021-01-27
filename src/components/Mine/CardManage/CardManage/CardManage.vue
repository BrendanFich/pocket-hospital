<template>
  <div class="cardManage">
    <div class="btns">
      <van-button v-if="$store.state.visitCardBanding === '1'" type="info" class="addBtn" color="linear-gradient(to right, #45bcec, #63d4f2)" @click="linkTo('/mine/cardManage/bindCard')">绑定就诊卡</van-button>
      <van-button v-else type="info" class="addBtn" color="linear-gradient(to right, #33cab9, #2ce794)" @click="toBandCardHtml">添加健康卡</van-button>
    </div>
    <h2 v-if="bindedCardList.length > 0">已绑定卡列表</h2>
    <ul class="cardList">
      <li
        class="customerInfoCard"
        v-for="(item, index) in bindedCardList"
        :key="index"
      >
        <HealthCard :cardInfo="item" :isDefualt="item.isDefualt"></HealthCard>
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
  async created () {
    if (this.$route.query.nc) {
      await this.fresh(this.$route.query.nc)
      this.$router.replace({path: '/mine/cardManage', query: {}})
    }
    this.$post('/api/user/vx_info').then(res => {
      if (res.code === 0) {
        this.bindedCardList = res.data.info.pat_list
        let index = res.data.info.pat_list.findIndex(i => {
          return i.visitCardNo === res.data.info.visitCardNo
        })
        if (index !== -1) {
          this.bindedCardList[index].isDefualt = true
        }
        this.bindedCardList = this.bindedCardList.map(i => {
          i.userCode = res.data.info.userCode
          i.userName = res.data.info.userName
          return i
        })
        console.log(this.bindedCardList)
        this.bindedCardList = this.bindedCardList.filter((i, index) => {
          if (i.visitCardType.includes('电子健康卡')) {
            return true
          } else {
            let tempArr = this.bindedCardList.filter((i2, index2) => {
              return i2.patIdNo === i.patIdNo
            })
            return tempArr.length === 1
          }
        })
        this.defaultCardNo = res.data.info.visitCardNo
      }
    }).catch((error) => {
      console.log(error)
    })
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
    },
    fresh (newCard) {
      let newCardObj = JSON.parse(decodeURI(atob(newCard)))
      console.log(newCardObj)
      newCardObj.PatientId = newCardObj.PatientId.toString()
      return new Promise((resolve, reject) => {
        this.$post('/api/pat/bindCard/fresh', newCardObj)
          .then(res => {
            if (res.code === 0) {
              resolve()
            } else {
              this.$toast({ message: res.msg, duration: 1500, className: 'toast' })
              resolve()
            }
          })
          .catch(error => {
            resolve(error)
          })
      })
    }
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
      margin: .4rem * 3.3 auto
  .btns
    margin-top: 20px
    display: flex
    justify-content: space-around
    align-items: center
    .addBtn
      width: 660px
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
