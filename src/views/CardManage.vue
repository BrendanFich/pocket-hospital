<template>
  <div class="cardManage">
    <h2>就诊卡管理</h2>
    <router-link class="customerInfoCard" to="/cardInfo">
      <div>
        <img src="@/assets/img/组 27.png" />
        <div class="textInfo">
          <span class="name">张家辉</span>
          <p class="cardNumber">诊疗卡号：66424801</p>
        </div>
      </div>
      <span class="status">默认</span>
    </router-link>
    <router-link class="customerInfoCard"  to="/cardInfo">
      <div>
        <img src="@/assets/img/组 27.png" />
        <div class="textInfo">
          <span class="name">古天乐</span>
          <p class="cardNumber">诊疗卡号：55324801</p>
        </div>
      </div>
      <span class="isLink"></span>
    </router-link>
    <div class="orderList">
      <mt-cell class="cell" is-link to="/bindCard">
        <div slot="title" class="content">绑定就诊卡</div>
        <img slot="icon" src="@/assets/img/绑定.png" />
      </mt-cell>
      <mt-cell class="cell" is-link to="/buildCard">
        <div slot="title" class="content">初诊建卡</div>
        <img slot="icon" src="@/assets/img/新建.png" />
      </mt-cell>
      <mt-cell class="cell" is-link>
        <div slot="title" class="content">绑定医保卡</div>
        <img slot="icon" src="@/assets/img/绑定 (1).png" />
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardManage',
  data () {
    return {}
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
        height: 104px;
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
    }
  }
  .orderList {
    margin-top: 33px;
    .cell {
      border-bottom: 1px solid #f2f2f2;
      .content {
        padding: 38px 0px 38px 24px;
        font-size: 24px;
        color: #666666;
      }
      img {
        width: 30px;
        height: 30px;
      }
      /deep/ .mint-cell-allow-right::after {
        width: 15px;
        height: 15px;
        margin-right: 40px;
      }
      /deep/ .mint-cell-wrapper {
        padding: 0 60px;
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
