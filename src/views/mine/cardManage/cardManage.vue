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
    <div class="orderList">
      <mt-cell class="cell" is-link to="/mine/cardManage/bindCard">
        <div slot="title" class="content">绑定就诊卡</div>
        <img class="icon" slot="icon" src="@/assets/img/绑定.png" />
      </mt-cell>
      <mt-cell class="cell" is-link to="/mine/cardManage/buildCard">
        <div slot="title" class="content">初诊建卡</div>
        <img class="icon" slot="icon" src="@/assets/img/新建.png" />
      </mt-cell>
      <mt-cell class="cell" is-link>
        <div slot="title" class="content">绑定医保卡</div>
        <img class="icon" slot="icon" src="@/assets/img/绑定 (1).png" />
      </mt-cell>
    </div>
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
    margin-top: 33px;
    .cell {
      .content {
        padding: 38px 0px 38px 24px;
        font-size: 24px;
        color: #666666;
      }
      .icon {
        width: 30px;
        margin-left: 36px;
      }
      /deep/ .mint-cell-allow-right::after {
        width: 15px;
        height: 15px;
        margin-right: 40px;
      }
      /deep/ .mint-cell-wrapper {
        border-bottom: 1px solid #f2f2f2;
        padding: 0;
      }
    }
    /deep/ .mint-cell-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
}
</style>
