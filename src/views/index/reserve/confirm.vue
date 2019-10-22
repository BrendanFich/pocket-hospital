<template>
  <div class="confirm">
    <CustomerInfoCard></CustomerInfoCard>
    <div class="orderInfo">
      <ul>
        <li>
          <span class="key">院区</span>
          <span class="value">南海院区</span>
        </li>
        <li>
          <span class="key">科室</span>
          <span class="value">{{$store.state.selectedDept}}</span>
        </li>
        <li>
          <span class="key">医生</span>
          <span class="value">{{$store.state.selectedDoc}}</span>
        </li>
        <li>
          <span class="key">就诊日期</span>
          <span class="value">{{$store.state.selectedDate}}</span>
        </li>
        <li>
          <span class="key">时间段</span>
          <span class="value">{{$store.state.selectedTime}}</span>
        </li>
        <li>
          <span class="key">诊查费</span>
          <span class="value">20</span>
        </li>
      </ul>
    </div>
    <mt-button class="confirmBtn" type="primary" @click="confirm">确认挂号</mt-button>
  </div>
</template>

<script>
import CustomerInfoCard from '@/components/CustomerInfoCard'
import util from '@/utils/util'
export default {
  name: 'confirm',
  components: { CustomerInfoCard },
  data () {
    return {}
  },
  methods: {
    confirm () {
      this.$indicator.open()
      util.http
        .post('/api/doctor/currentDayRegister', {
          deptCode: '332',
          doctorCode: '0018',
          scheduleDate: '2019-10-22 08:00:00',
          timeFlag: '上午',
          regFee: '25',
          patName: '刘能',
          patCardNo: '1111111',
          hostpitalName: 'nanhai'
        })
        .then(res => {
          if (res.code === 0) {
            this.$indicator.close()
            this.$toast({
              message: '提交成功',
              duration: 1000,
              className: 'toast'
            })
            this.$router.push('/index')
            console.log(res)
          } else {
            this.$indicator.close()
            this.$toast({
              message: '提交失败',
              duration: 1000,
              className: 'toast'
            })
          }
        })
        .catch(error => {
          this.$indicator.close()
          this.$toast({
            message: '提交失败',
            duration: 1000,
            className: 'toast'
          })
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm {
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
