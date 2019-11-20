<template>
  <div class="evaluate">
    <ul class="inquiryInfo">
      <li>
        <span class="key">诊断结果</span>
        <span class="value">发烧感冒</span>
      </li>
      <li>
        <span class="key">诊断专家</span>
        <div class="value">
          <img src="./img/avatar55x54.png" />
          <span>杨辉</span>
        </div>
      </li>
    </ul>
    <h2>评分评价</h2>
    <div class="score">
      <h3>请您对本次就诊服务评价</h3>
      <div class="stars">
        <div class="star" @click="changeStar(n)" v-for="n in 5" :key="n">
          <img src="./img/starOn.png" alt v-if="n<=star" />
          <img src="./img/starOff.png" alt v-else />
        </div>
      </div>
    </div>
    <h2>评价建议</h2>
    <div class="textarea">
      <mt-field placeholder="请输入意见..." type="textarea" rows="6" v-model="introduction"></mt-field>
    </div>
    <mt-button type="primary" class="btn" @click="handleClick">提交意见</mt-button>
  </div>
</template>

<script>
export default {
  name: 'evaluate',
  data () {
    return {
      introduction: '',
      star: 1
    }
  },
  methods: {
    changeStar (index) {
      this.star = index
    },
    handleClick () {
      this.$indicator.open()
      setTimeout(() => {
        this.$indicator.close()
        this.$toast({
          message: '提交成功',
          duration: 1000,
          className: 'toast'
        })
        this.$router.push('/index')
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.evaluate {
  background: #f2f2f2;
  height: 100vh;
  > h2 {
    font-size: 24px;
    color: #cccccc;
    line-height: 82px;
    margin-left: 42px;
  }
  .score {
    height: 233px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      color: #999999;
      font-size: 24px;
      margin-bottom: 56px;
    }
    .stars {
      .star {
        display: inline-block;
        margin: 0 20px;
        > img {
          width: 39px;
          height: 37px;
        }
      }
    }
  }
  .inquiryInfo {
    li {
      height: 88px;
      background: #fff;
      border-bottom: 1px solid #f2f2f2;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 50px;
      font-size: 28px;
      .value {
        display: flex;
        align-items: center;
        color: #333333;
        img {
          width: 55px;
          margin-right: 17px;
        }
      }
      .key {
        color: #999999;
      }
    }
  }
  .textarea {
    width: 725px;
    margin: 0 auto;
    > .mint-cell {
      border: 1px solid #dddddd;
      border-radius: 5px;
      /deep/ .mint-field-core {
        font-size: 28px;
        padding: 10px;
      }
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
