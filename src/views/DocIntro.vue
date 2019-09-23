<template>
  <div class="docIntro">
    <div class="doctorIntroCard">
      <img class="avatar" src="@/assets/img/图层 826 拷贝 5.png" />
      <div class="doctorInfo">
        <p class="doctorName">杨辉</p>
        <p class="doctorTitle">内分泌科 主任医师</p>
        <div class="star">
          <img v-for="n in 5" :key="n" src="@/assets/img/星星 拷贝 8.png" />
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
        <span class="value">内分泌科</span>
      </div>
      <div class="msg">
        <span class="key">医生职称</span>
        <span class="value">主任医师</span>
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
export default {
  name: 'DocIntro',
  data () {
    return {
      selected: 0,
      departments: [
        {
          name: '内分泌专科',
          bgcolor: '#E3B461',
          doctors: [
            {
              avatarUrl: '',
              name: '杨辉',
              title: '主任医师',
              star: 5,
              intro:
                '擅长免疫性皮肤病，男性内分泌不平衡，由内分泌 引起的各种疾病。'
            },
            {
              avatarUrl: '',
              name: '杨辉',
              title: '主任医师',
              star: 4,
              intro:
                '擅长免疫性皮肤病，男性内分泌不平衡，由内分泌 引起的各种疾病。'
            },
            {
              avatarUrl: '',
              name: '杨辉',
              title: '主任医师',
              star: 3,
              intro:
                '擅长免疫性皮肤病，男性内分泌不平衡，由内分泌 引起的各种疾病。'
            }
          ]
        },
        {
          name: '皮肤科',
          bgcolor: '#E36A61',
          doctors: [
            {
              avatarUrl: '',
              name: '刘玉明',
              title: '主任医师',
              star: 5,
              intro:
                '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病。'
            },
            {
              avatarUrl: '',
              name: '刘玉明',
              title: '主任医师',
              star: 5,
              intro:
                '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病。'
            }
          ]
        },
        {
          name: '肠道专科',
          bgcolor: '#98E361',
          doctors: [
            {
              avatarUrl: '',
              name: '梁君婷',
              title: '主任医师',
              star: 5,
              intro:
                '肠道主任医师，曾在中山大学附属研究参与研究，有多年主治经验，擅长治疗各种肠道疾病。'
            }
          ]
        },
        { name: '耳鼻喉科', bgcolor: '#61E3B4' },
        { name: '骨内科', bgcolor: '#619BE3' },
        { name: '内分泌专科', bgcolor: '#E3B461' },
        { name: '皮肤科', bgcolor: '#E36A61' },
        { name: '肠道专科', bgcolor: '#98E361' },
        { name: '耳鼻喉科', bgcolor: '#61E3B4' },
        { name: '骨内科', bgcolor: '#619BE3' },
        { name: '内分泌专科', bgcolor: '#E3B461' },
        { name: '皮肤科', bgcolor: '#E36A61' },
        { name: '肠道专科', bgcolor: '#98E361' },
        { name: '耳鼻喉科', bgcolor: '#61E3B4' },
        { name: '骨内科', bgcolor: '#619BE3' },
        { name: '内分泌专科', bgcolor: '#E3B461' },
        { name: '皮肤科', bgcolor: '#E36A61' },
        { name: '肠道专科', bgcolor: '#98E361' },
        { name: '耳鼻喉科', bgcolor: '#61E3B4' },
        { name: '骨内科', bgcolor: '#619BE3' }
      ]
    }
  },
  created () {},
  methods: {
    enter () {
      this.$router.push({ path: '/inquiry', name: 'inquiry' })
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
