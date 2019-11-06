<template>
  <div class="liveHosOrder">
    <ul>
      <li v-for="n in 3" :key="n" @click="to()">
        <div class="orderCard">
          <div class="left">
            <img src="@/assets/img/图层 826.png" alt />
            <div class="baseInfo">
              <div>
                <span class="name">张家辉</span>
                <span class="title">主任医师</span>
              </div>
              <div class="department">内分泌科</div>
            </div>
          </div>
          <div class="beforeTime">上次就诊:2019-09-26 ></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'LiveHosOrder',
  data () {
    return {
      selected: 0
    }
  },
  created () {
    this.getDocRecord()
  },
  methods: {
    to () {
      this.$router.push('/iHospital/docIntro')
    },
    getDocRecord () {
      util.http
        .post('/api/pat/findMyDoctor')
        .then(res => {
          console.log(res)
          // 没有相应内容
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.liveHosOrder {
  background: #f2f2f2;
  height: 100vh;
  .orderCard {
    height: 155px;
    background: #fff;
    padding: 30px 50px 30px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #EDEDED;
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 88px;
        margin-right: 30px;
      }
      .baseInfo {
        font-size: 24px;
        line-height: 36px;
        .name {
          color: #333333;
          font-size: 28px;
          font-weight: bold;
          line-height: 50px;
        }
        .title {
          font-size: 24px;
          color: #cccccc;
          display: inline-block;
          margin-left: 12px;
        }
        .department {
          color: #666666;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
    .beforeTime {
      color: #09cf74;
      font-size: 24px;
    }
  }
}
</style>
