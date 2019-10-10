<template>
  <div class="cardManage">
    <h2>就诊卡管理</h2>
    <NoData :data="cardList"></NoData>
    <router-link
      class="customerInfoCard"
      to="/mine/cardManage/cardInfo"
      v-for="(item,index) in cardList"
      :key="index"
    >
      <div>
        <img :src="item.imgUrl" />
        <div class="textInfo">
          <span class="name">{{item.name}}</span>
          <p class="cardNumber">诊疗卡号：{{item.cardNum}}</p>
        </div>
      </div>
      <span class="status" v-if="item.default">默认</span>
      <span class="isLink" v-else>></span>
    </router-link>
    <ul class="orderList">
      <li @click="linkTo('/mine/cardManage/bindCard')">
        <div>
          <img src="@/assets/img/绑定.png" />
          <span class="title">绑定就诊卡</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li @click="linkTo('/mine/cardManage/buildCard')">
        <div>
          <img src="@/assets/img/新建.png" />
          <span class="title">初诊建卡</span>
        </div>
        <span class="linkIcon">></span>
      </li>
      <li>
        <div>
          <img src="@/assets/img/绑定 (1).png" />
          <span class="title">绑定医保卡</span>
        </div>
        <span class="linkIcon">></span>
      </li>
    </ul>
  </div>
</template>

<script>
import NoData from '@/components/NoData'
export default {
  name: 'cardManage',
  components: { NoData },
  data () {
    return {
      cardList: [
        {
          imgUrl: require('@/assets/img/组 27.png'),
          name: '张家辉',
          cardNum: '66424801',
          default: true
        },
        {
          imgUrl: require('@/assets/img/组 27.png'),
          name: '古天乐',
          cardNum: '55324801',
          default: false
        }
      ]
    }
  },
  methods: {
    linkTo (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.cardManage {
  background: #f2f2f2;
  height: 100vh;

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
