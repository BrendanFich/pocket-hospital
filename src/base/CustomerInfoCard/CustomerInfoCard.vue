<template>
  <div class="customerInfoCard">
    <div class="banded" v-if="visitName">
      <div>
        <img src="./img/greenAvatar.png" />
        <div class="textInfo">
          <span class="name">{{visitName}}</span>
          <span class="status">默认</span>
          <p class="cardNumber" v-if="visitCardNo !== ''">就诊卡号：{{visitCardNo}}</p>
          <p class="cardNumber" v-if="socialCardNo !== ''">社保卡号：{{socialCardNo}}</p>
        </div>
      </div>
      <router-link to="/mine/cardManage">
        <span class="changeCard">切换诊疗卡></span>
      </router-link>
    </div>
    <router-link class="firstUse" v-else to="/mine/cardManage/bindCard/%E5%B0%B1%E8%AF%8A%E5%8D%A1">
      <span>请先绑卡，点击添加</span>
    </router-link>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'customerInfoCard',
  data () {
    return {
      visitName: '',
      visitCardNo: '',
      socialCardNo: ''
    }
  },
  created () {
    util.http.post('/api/user/vx_info').then(res => {
      this.visitName = res.data.info.visitName
      this.visitCardNo = res.data.info.visitCardNo
      this.socialCardNo = res.data.info.socialCardNo
      this.$store.commit('updateDefaultCard', res.data.info.visitName, res.data.info.visitCardNo, res.data.info.socialCardNo)
      if (res.data.info.visitCardNo !== '') {
        this.$emit('sendCardNo', res.data.info.visitCardNo)
      } else {
        this.$emit('sendCardNo', res.data.info.socialCardNo)
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
    height: 200px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 30px;
      color: #666;
      border: 3px solid #09cf74;
      padding: 20px 30px;
      border-radius: 30px;
    }
  }
}
</style>
