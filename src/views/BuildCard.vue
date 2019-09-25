<template>
  <div class="buildCard">
    <h2>就诊卡信息</h2>
    <div @click="showOption" class="selectItem">
      <mt-field label="院区" v-model="block" :disableClear="true" :readonly="true"></mt-field>
      <div class="isLink">></div>
    </div>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="name" :disableClear="true"></mt-field>
    <mt-field label="身份证号" placeholder="请输入身份证号" type="number" v-model="IDNum" :disableClear="true"></mt-field>
    <mt-field
      label="联系电话"
      placeholder="请输入联系电话"
      type="number"
      v-model="phoneNum"
      :disableClear="true"
    ></mt-field>
    <mt-field label="联系地址" placeholder="请输入联系地址" v-model="address" :disableClear="true"></mt-field>

    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText></mt-actionsheet>
    <div class="attention">
      <h2>注意事项</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
        ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
        accumsan lacus vel facilisis.
      </p>
    </div>

    <mt-button type="primary" class="btn" @click.native="handleClick">确定</mt-button>
  </div>
</template>

<script>
export default {
  name: 'BuildCard',
  data () {
    return {
      sheetVisible: false,
      block: '南海院区',
      paperwork: '身份证',
      IDNum: null,
      phoneNum: null,
      address: '',
      name: '',
      actions: [
        { name: '南海院区', method: this.sblock1 },
        { name: '西院区', method: this.sblock2 }
      ]
    }
  },
  methods: {
    showOption () {
      this.sheetVisible = true
    },
    sblock1 () {
      this.block = this.actions[0].name
    },
    sblock2 () {
      this.block = this.actions[1].name
    },
    sPaperwork1 () {
      this.paperwork = this.actions2[0].name
    },
    sPaperwork2 () {
      this.paperwork = this.actions2[1].name
    },
    handleClick () {
      const duration = 2000
      const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (this.IDNum && this.name && this.phoneNum && this.address) {
        if (!p.test(this.IDNum)) {
          this.$toast({ message: '身份证号有误', duration })
        } else {
          this.$toast({ message: '操作成功', duration })
          this.$router.push({ path: '/cardManage' })
        }
      } else {
        this.$toast({ message: '请完整填写所有信息', duration })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.buildCard {
  background: #f2f2f2;
  height: 100vh;
  h2 {
    color: #999999;
    font-size: 24px;
    padding: 25px 40px;
  }
  .mint-field {
    /deep/ .mint-cell-wrapper {
      padding: 0;
      height: 88px;
      font-size: 30px;
      font-weight: bold;
      .mint-cell-title {
        color: #44a0f5;
        width: 168px;
        padding-left: 40px;
      }
    }
  }
  .selectItem {
    position: relative;
    .isLink {
      color: #5adba3;
      font-size: 30px;
      position: absolute;
      top: 27px;
      right: 66px;
    }
  }
  /deep/ .mint-actionsheet-listitem {
    height: 80px;
    font-size: 30px;
    line-height: 80px;
  }
  .attention {
    margin-top: 40px;
    p {
      width: 670px;
      margin: 0 auto;
      font-size: 24px;
      color: #999999;
      line-height: 36px;
    }
  }
  .btn {
    margin: 0 auto;
    margin-top: 54px;
    margin-left: 12.5px;
    width: 725px;
    height: 80px;
    border-radius: 10px;
    background: #09cf74;
    color: #fff;
    font-size: 26px;
  }
}
</style>
