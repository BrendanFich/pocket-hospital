<template>
  <div class="customerInfoCard">
    <div class="firstUse" v-if="isShowBandTips">
      <router-link class="text" to="/mine/cardManage/bindCard">
        添加就诊人，点击绑定
      </router-link>
    </div>

    <div class="banded" v-else>
      <div>
        <img src="./img/greenAvatar.png" />
        <div class="textInfo">
          <span class="name">{{visitName}} <span class="status">默认</span></span>
          <p class="cardNumber">就诊卡号：{{visitCardNo}}</p>
        </div>
      </div>
      <router-link to="/mine/cardManage">
        <span class="changeCard">就诊卡管理></span>
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
      visitCardNo: '',
      patIdNo: '',
      inPatId: '',
      isShowBandTips: false
    }
  },
  props: {
    temporaryCardNo: String,
    temporaryCardPatname: String
  },
  computed: {
  },
  created () {
    if (this.temporaryCardNo) {
      this.visitName = this.temporaryCardPatname
      this.visitCardNo = this.temporaryCardNo
      this.$emit('visitName', this.temporaryCardPatname)
      this.$emit('visitCardNo', this.temporaryCardNo)
    } else {
      this.$post('/api/user/vx_info').then(res => {
        if (res.code === 0) {
          this.visitName = res.data.info.visitName
          this.visitCardNo = res.data.info.visitCardNo
          this.$emit('visitName', res.data.info.visitName)
          this.$emit('visitCardNo', res.data.info.visitCardNo)
          this.$emit('patIdNo', res.data.info.patIdNo)
          this.$emit('inPatId', res.data.info.patId)
          if (res.data.info.visitName === '') {
            this.isShowBandTips = true
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    }
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
        display: flex;
        align-items: start;
        flex-direction: column;
        justify-content: space-around;
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
          word-wrap:break-word;
          width: 360px;
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
