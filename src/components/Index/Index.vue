<template>
  <div class="index">
    <mt-header fixed title="掌上医院"></mt-header>

    <div class="main">
      <div class="slogan">
        <img src="@/assets/首页_slices/图层 1.png" />
      </div>
      <div class="navs1">
        <div class="reserve">
          <h2>预约、挂号</h2>
          <p>当天挂号、预约挂号</p>
        </div>
        <div class="pay">
          <h2>缴费</h2>
          <p>在线缴检查费、药费</p>
        </div>
      </div>
      <div class="navs2">
        <div class="guide">
          <img src="@/assets/首页_slices/f51a82f794ecc.png" />
          <h2>智能导诊</h2>
          <p>精准，安全，快捷</p>
        </div>
        <div class="checkin">
          <img src="@/assets/首页_slices/组 27.png" />
          <h2>就诊报到</h2>
          <p>报到后获取排队信息</p>
        </div>
        <div class="liveInHospital">
          <img src="@/assets/首页_slices/住院服务.png" />
          <h2>住院服务</h2>
          <p>住院手续一条龙服务</p>
        </div>
      </div>
      <div class="navs3">
        <h2>其他服务</h2>
        <div class="otherItems">
          <div class="item">
            <img src="@/assets/首页_slices/医院 (2).png" />
            <h3>医院信息</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/医生 (1).png" />
            <h3>医生介绍</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/报告 (1).png" />
            <h3>报告查询</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/药.png" />
            <h3>药品查询</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/医疗.png" />
            <h3>医疗服务价格</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/车位.png" />
            <h3>车位查询</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/意见.png" />
            <h3>意见提交</h3>
          </div>
          <div class="item">
            <img src="@/assets/首页_slices/导航.png" />
            <h3>来院导航</h3>
          </div>
        </div>
      </div>
    </div>

    <mt-tabbar v-model="selected" fixed="true">
      <mt-tab-item id="首页">
        <img slot="icon" src="@/assets/首页_slices/首页-选中.png" />
        首页
      </mt-tab-item>
      <mt-tab-item id="互联网医院">
        <img slot="icon" src="@/assets/首页_slices/医院 (4).png" />
        互联网医院
      </mt-tab-item>
      <mt-tab-item id="个人中心">
        <img slot="icon" src="@/assets/首页_slices/个人中心 选中.png" />
        个人中心
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    selected() {}
  }
};
</script>
<style lang="scss" scoped>
.index {
  .mint-header {
    background-color: rgba(237, 237, 237, 1);
    color: #000;
  }
  .main {
    width: 100vw;
    overflow: scroll;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .slogan img {
      width: 100vw;
    }
    .navs1 .nav1 h2 {
      font-size: 0.5rem;
    }
  }
}
</style>
