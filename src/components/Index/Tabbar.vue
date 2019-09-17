<template>
  <div class="tabbar">
    <mt-tabbar :fixed="true">
      <mt-tab-item class="active" id="首页">
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
  name: "Tabbar",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.index {
  width: 750px;
  .mint-tabbar {
    border-top: 1px solid #ececec;
    height: 98px;
    .mint-tab-item {
      padding: 12px 0 21px 0;
      text-align: center;
      /deep/ .mint-tab-item-icon {
        width: 34px;
        height: 34px;
        img {
          display: inline-block;
          width: 34px;
          height: 34px;
        }
      }
      /deep/ .mint-tab-item-label {
        font-size: 20px;
        color: #cccccc;
      }
    }
    .mint-tab-item.active {
      /deep/ .mint-tab-item-label {
        color: #02d075;
      }
    }
  }
}
</style>
