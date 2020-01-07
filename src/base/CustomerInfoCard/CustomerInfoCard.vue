<template>
  <div class="customerInfoCard">
    <div class="firstUse" v-if="!visitCardNo">
      <router-link class="text" to="/mine/cardManage/bindCard">
        添加就诊人，点击绑定
      </router-link>
    </div>

    <div class="banded" v-else>
      <div>
        <img src="./img/greenAvatar.png" />
        <div class="textInfo">
          <span class="name">{{visitName}}</span>
          <span class="status">默认</span>
          <p class="cardNumber">就诊卡号：{{visitCardNo}}</p>
        </div>
      </div>
      <router-link to="/mine/cardManage">
        <span class="changeCard">切换诊疗卡></span>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'customerInfoCard',
  data () {
    return {
      visitName: '',
      visitCardNo: ''
    }
  },
  computed: {
  },
  created () {
    this.$post('/api/user/vx_info').then(res => {
      if (res.code === 0) {
        this.visitName = res.data.info.visitName
        this.visitCardNo = res.data.info.visitCardNo
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="scss" scoped>

.customerInfoCard {
  .banded {
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
        .status {
          margin-left: 17px;
          font-size: 24px;
          color: #ffffff;
          background: #f69343;
          padding: 3px 12px;
          border-radius: 5px;
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
  }
  .firstUse {
    height: 150px;
    background: #09cf74;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      font-size: 30px;
      color: #fff;
      border: 3px solid #fff;
      padding: 20px 30px;
      border-radius: 30px;
    }
  }
}
</style>
