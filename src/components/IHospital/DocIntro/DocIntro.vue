<template>
  <div class="docIntro">
    <div class="doctorIntroCard">
      <img class="avatar" src="./img/avatar100x101.png" />
      <div class="doctorInfo">
        <p class="doctorName">{{doctorInfo.doctorName}}</p>
        <p class="doctorTitle">{{doctorInfo.deptName}} {{doctorInfo.doctorTitle}}</p>
        <div class="star">
          <img v-for="n in 5" :key="n" src="./img/starOn.png" />
        </div>
        <p class="textIntro">擅长免疫性皮肤病，男性内分泌不平衡，由内分泌 引起的各种疾病。</p>
      </div>
    </div>
    <div class="evaluate">
      <div class="total">
        <span class="desc">已就诊</span>
        <span class="num">57</span>
      </div>
      <div class="praise">
        <span class="desc">好评数</span>
        <span class="num">55</span>
      </div>
    </div>
    <div class="moreIntro">
      <div class="msg">
        <span class="key">所属科室</span>
        <span class="value">{{doctorInfo.deptName}}</span>
      </div>
      <div class="msg">
        <span class="key">医生职称</span>
        <span class="value">{{doctorInfo.doctorTitle}}</span>
      </div>
      <div class="msg">
        <span class="key">专业擅长</span>
        <span class="value">内分泌失调 | 免疫系统问题 | 淋巴问题 | 眩晕 |</span>
      </div>
      <div class="msg">
        <span class="key">执业医院</span>
        <span class="value">广州市第二附属人民医院</span>
      </div>
      <div class="msg">
        <span class="key">医生简介</span>
        <span
          class="value"
        >美国耶鲁大学翼学院博士后，曾先后担任南昌大学第三附属人民医院内分泌科主任。美国耶鲁大学翼学院博士后，曾先后担任南昌大学第三附属人民医院内分泌科主任。</span>
      </div>
    </div>
    <mt-button type="primary" class="btn" @click="enter">进入问诊</mt-button>
  </div>
</template>

<script>
import util from '@/assets/js/util'
export default {
  name: 'docIntro',
  data () {
    return {
      doctorInfo: {}
    }
  },
  created () {
    util.http.post('/api/doctor/doc_info', {
      deptCode: this.$route.params.deptCode,
      doctorCode: this.$route.params.doctorCode
    }).then(res => {
      this.doctorInfo = res.data.Records[0]
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    enter () {
      this.$router.push('/iHospital/inquiry')
    }
  }
}
</script>

<style lang="scss" scoped>
.docIntro {
  background: #f2f2f2;
  height: 100vh;
  .doctorIntroCard {
    background: #fff;
    padding: 30px 50px 40px 30px;
    border-bottom: 1px solid#dedede;
    display: flex;
    .avatar {
      width: 100px;
      height: 100px;
      margin-right: 24px;
    }
    .doctorInfo {
      flex: 1;
      .doctorName {
        font-size: 30px;
        color: #333333;
        font-weight: bold;
        line-height: 42px;
      }
      .doctorTitle {
        font-size: 24px;
        color: #333333;
        line-height: 34px;
      }
      .star {
        padding: 5px 0 10px 0;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .textIntro {
        font-size: 24px;
        color: #999999;
      }
    }
  }
  .evaluate {
    margin-top: 10px;
    width: 100%;
    height: 127px;
    background: #fff;
    display: flex;
    .total,
    .praise {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .praise {
      border-left: 1px solid #ededed;
    }
    .desc {
      color: #999999;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .num {
      color: #333333;
      font-size: 48px;
    }
  }
  .moreIntro {
    background: #fff;
    margin-top: 10px;
    margin-bottom: 98px;
    padding: 35px 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .msg {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 15px 0;
      .key {
        width: 150px;
        color: #999999;
        font-size: 24px;
        line-height: 36px;
      }
      .value {
        flex: 1;
        color: #333333;
        font-size: 24px;
        line-height: 36px;
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 92px;
    background: #09cf74;
    font-size: 30px;
  }
}
</style>
