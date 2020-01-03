<template>
  <div class="cardManage">
    <h2>就诊卡管理</h2>
    <img class="noData" v-if="patInfoBinded.length === 0" src="./img/noData.png" />
    <router-link
      class="customerInfoCard"
      v-for="(item,index) in patInfoBinded"
      :to="{
            name:'cardInfo',
            params:{
              cardNo: (item.visitCardNo || item.socialHosCardNO)
            }}"
      :key="index"
    >
      <div>
        <img src="./img/greenAvatar.png" />
        <div class="textInfo">
          <span class="name">{{item.patName}}</span>
          <p class="cardNumber" v-if="item.visitCardNo">就诊卡：{{item.visitCardNo}}</p>
          <p class="cardNumber" v-if="item.socialHosCardNO">社保卡：{{item.socialHosCardNO}}</p>
        </div>
      </div>
      <span class="status" v-if="(item.visitCardNo === defaultCardNo) || (item.socialHosCardNO === defaultCardNo)">默认</span>
      <span class="isLink" v-else>></span>
    </router-link>
    <ul class="orderList">
      <li @click="linkTo('bindCard')">
        <div>
          <img src="./img/build.png" />
          <span class="title">添加就诊人</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <!-- <li @click="linkTo('buildCard')">
        <div>
          <img src="./img/build.png" />
          <span class="title">初诊建档</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li @click="linkTo('bindCard',{cardTypeWord:'社保卡'})">
        <div>
          <img src="./img/bindShebao.png" />
          <span class="title">绑定社保卡</span>
        </div>
        <span class="linkIcon">></span>
      </li> -->
    </ul>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/base/Tabbar/Tabbar'
import util from '@/assets/js/util'

export default {
  name: 'cardManage',
  data () {
    return {
      patInfoNobind: [],
      patInfoBinded: [],
      visitCardNo: '',
      socialCardNo: ''
    }
  },
  components: { Tabbar },
  computed: {
    defaultCardNo () {
      return this.visitCardNo ? this.visitCardNo : this.socialCardNo
    }
  },
  methods: {
    linkTo (name) {
      this.$router.push({name})
    }
  },
  created () {
    util.http
      .post('/api/pat/pat_info')
      .then(res => {
        this.patInfoNobind = res.data.filter(item => (item.visitCardNo === '') && (item.socialHosCardNO === ''))
        let patInfoContent = []
        res.data.filter(item => (item.visitCardNo !== '') || (item.socialHosCardNO !== '')).forEach((item) => {
          if (item.visitCardNo && !item.socialHosCardNO) {
            patInfoContent.push(item)
          }
          if (!item.visitCardNo && item.socialHosCardNO) {
            patInfoContent.push(item)
          }
          if (item.visitCardNo && item.socialHosCardNO) {
            let temp = item.socialHosCardNO
            item.socialHosCardNO = ''
            patInfoContent.push(item)
            let newItem = Object.assign({}, item)
            newItem.socialHosCardNO = temp
            newItem.visitCardNo = ''
            patInfoContent.push(newItem)
          }
        })
        this.patInfoBinded = patInfoContent
        console.log(this.patInfoBinded)
        util.http.post('/api/user/vx_info').then(res => {
          this.visitName = res.data.info.visitName
          this.visitCardNo = res.data.info.visitCardNo
          this.socialCardNo = res.data.info.socialCardNo
          this.$store.commit('updateDefaultCard', res.data.info.visitName, res.data.info.visitCardNo, res.data.info.socialCardNo)
        }).catch((error) => {
          console.log(error)
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="sass" scoped>
@import '~assets/sass/variable'
@import '~assets/sass/mixin'
.cardManage
  @include page($color-page-background)
  padding-bottom: 200px
  .noData
    width: 366px
    margin-top: 50px
    margin-left: 200px
  h2
    color: $color-word-grey
    font-size: 24px
    padding: 25px 30px
  .customerInfoCard
    border-bottom: 1px solid #f2f2f2
    padding: 47px 50px 46px 31px
    background: $color-white
    display: flex
    align-items: center
    justify-content: space-between
    div
      display: flex
      align-items: center
      img
        width: 104px
        margin-right: 30px
      .textInfo
        display: block
        .name
          color: $color-value-grey
          font-size: 30px
          font-weight: bold

        .cardNumber
          margin-top: 12px
          font-size: 24px
          color: $color-word-grey
    .changeCard
      color: $color-primary
      font-size: 24px
    .status
      margin-left: 17px
      font-size: 24px
      color: $color-white
      background: #f69343
      padding: 3px 12px
      border-radius: 5px
    .isLink
      color: #5adba3
      font-size: 24px
  .orderList
    background: $color-white
    margin-top: 40px
  .orderList > li
    height: 100px
    padding: 0 54px 0 43px
    display: flex
    justify-content: space-between
    align-items: center
    border-bottom: 1px solid $color-border
    > div
      display: flex
      align-items: center
      > img
        width: 30px
        margin-right: 30px
    .title
      color: $color-value-grey
      font-size: 24px
    .linkIcon
      color: $color-title-grey
      font-size: 24px
</style>
