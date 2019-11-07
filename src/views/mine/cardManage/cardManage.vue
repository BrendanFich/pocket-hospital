<template>
  <div class="cardManage">
    <h2>就诊卡管理</h2>
    <img class="noData" v-if="cardList.length === 0" src="@/assets/img/noData.png" />
    <router-link
      class="customerInfoCard"
      v-for="(item,index) in cardList"
      :to="{
            name:'cardInfo',
            params:{
              cardNo: (item.visitCardNo || item.socialHosCardNO)
            }}"
      :key="index"
    >
      <div>
        <img src="@/assets/img/greenAvatar.png" />
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
      <li @click="linkTo('bindCard',{cardTypeWord:'就诊卡'})">
        <div>
          <img src="@/assets/img/bindJiuzhen.png" />
          <span class="title">绑定就诊卡</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li @click="linkTo('buildCard')">
        <div>
          <img src="@/assets/img/build.png" />
          <span class="title">初诊建档</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li @click="linkTo('bindCard',{cardTypeWord:'社保卡'})">
        <div>
          <img src="@/assets/img/bindShebao.png" />
          <span class="title">绑定社保卡</span>
        </div>
        <span class="linkIcon">></span>
      </li>
    </ul>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
export default {
  name: 'cardManage',
  data () {
    return {

    }
  },
  components: { Tabbar },
  computed: {
    defaultCardNo () {
      return this.$store.state.userInfo.visitCardNo ? this.$store.state.userInfo.visitCardNo : this.$store.state.userInfo.socialCardNo
    },
    cardList () {
      return this.$store.state.patInfoBinded
    }
  },
  methods: {
    linkTo (name, params) {
      this.$router.push({name, params})
    }
  },
  created () {
    this.$store.commit('updateUserPatInfo')
  }
}
</script>

<style lang="scss" scoped>
.cardManage {
  background: #f2f2f2;
  height: 100vh;
  .noData {
    width: 366px;
    margin-top: 50px;
    margin-left: 200px;
  }
  h2 {
    color: #999999;
    font-size: 24px;
    padding: 25px 30px;
  }
  .customerInfoCard {
    border-bottom: 1px solid #f2f2f2;
    padding: 47px 50px 46px 31px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      img {
        width: 104px;
        margin-right: 30px;
      }
      .textInfo {
        display: block;
        .name {
          color: #666666;
          font-size: 30px;
          font-weight: bold;
        }

        .cardNumber {
          margin-top: 12px;
          font-size: 24px;
          color: #999999;
        }
      }
    }
    .changeCard {
      color: #09cf74;
      font-size: 24px;
    }
    .status {
      margin-left: 17px;
      font-size: 24px;
      color: #ffffff;
      background: #f69343;
      padding: 3px 12px;
      border-radius: 5px;
    }
    .isLink {
      color: #5adba3;
      font-size: 24px;
    }
  }
  .orderList {
    background: #fff;
    margin-top: 40px;
  }
  .orderList > li {
    height: 100px;
    padding: 0 54px 0 43px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ededed;
    > div {
      display: flex;
      align-items: center;
      > img {
        width: 30px;
        margin-right: 30px;
      }
    }
    .title {
      color: #666666;
      font-size: 24px;
    }
    .linkIcon {
      color: #cccccc;
      font-size: 24px;
    }
  }
}
</style>
