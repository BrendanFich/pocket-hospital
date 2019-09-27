<template>
  <div class="cConfirm">
    <CustomerInfoCard></CustomerInfoCard>
    <mt-button class="confirmBtn" type="primary" @click="confirm">就诊报到</mt-button>
  </div>
</template>

<script>
import CustomerInfoCard from '@/components/CustomerInfoCard'
export default {
  name: 'cConfirm',
  components: { CustomerInfoCard },
  data () {
    return {}
  },
  methods: {
    confirm () {
      let text = `
      <div>
        <p>就诊日期：2019-08-32</p>
        <p>就诊时间：09:00 - 10:00</p>
        <p>就诊科室：内分泌科(门）</p>
        <p>就诊医生：杨辉</p>
      </div>
      `
      this.$messagebox.confirm(text).then(action => {
        this.$router.push('/checkIn/cQueue')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cConfirm {
  background: #f2f2f2;
  height: 100vh;
  .orderInfo {
    margin-top: 22px;
    background: #fff;
    ul > li {
      height: 88px;
      padding: 0 54px 0 43px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ededed;
      .key {
        color: #333333;
        font-size: 30px;
        font-weight: bold;
      }
      .value {
        color: #666666;
        font-size: 30px;
      }
    }
  }
  .confirmBtn {
    margin: 0 12.5px;
    margin-top: 92px;
    width: 725px;
    height: 80px;
    background: #09cf74;
    font-size: 30px;
  }
}
</style>
