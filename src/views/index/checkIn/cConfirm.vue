<template>
  <div class="cConfirm">
    <CustomerInfoCard></CustomerInfoCard>
    <mt-button class="confirmBtn" type="primary" @click="confirm">就诊报到</mt-button>
  </div>
</template>

<script>
import CustomerInfoCard from '@/components/CustomerInfoCard'
import wx from 'weixin-js-sdk'
import util from '@/utils/util'
// import localtion from '@/config'
export default {
  name: 'cConfirm',
  components: { CustomerInfoCard },
  data () {
    return {
      latitude: null,
      longitude: null,
      registerInfo: {}
    }
  },
  computed: {
    // isArrived () {
    //   return (localtion.longitude - 0.0005) < this.longitude && (localtion.longitude + 0.0005) > this.longitude &&
    //   (localtion.latitude - 0.001) < this.latitude && (localtion.latitude + 0.001) > this.latitude
    // }
  },
  created () {
    util.http
      .post('/api/pat/findVisitingRegister')
      .then(res => {
        console.log(res)
        this.registerInfo = res.data.Records
      })
      .catch(error => {
        console.log(error)
      })
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success (res) {
        this.latitude = res.latitude
        this.longitude = res.longitude
        alert(res.latitude, res.longitude)
      }
    })
  },
  methods: {
    confirm () {
      let text = `
      <div>
        <p>就诊日期：${this.registerInfo.scheduleDate}</p>
        <p>就诊时间：${this.registerInfo.beginTime} - ${this.registerInfo.beginTime}</p>
        <p>就诊科室：${this.registerInfo.deptName}</p>
        <p>就诊医生：${this.registerInfo.doctorName}</p>
      </div>
      `
      this.$messagebox.confirm(text).then(action => {
        util.http
          .post('/api/pat/findAllRegister')
          .then(res => {
            console.log(res)
            this.orderList = res.data.Records
          })
          .catch(error => {
            console.log(error)
          })
        this.$router.push('/checkIn/cQueue')
      })
      // if (this.isArrived) {
      //   this.$messagebox.confirm(text).then(action => {
      //     this.$router.push('/checkIn/cQueue')
      //   })
      // } else {
      //   alert('还未到达医院')
      // }
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
