<template>
  <div class="simpleTabbar">
    <mt-tabbar v-model="tbSelected" :fixed="true">
      <mt-tab-item id="后退">
        <img slot="icon" src="@/assets/预约挂号_slices/向左按钮.png" />
      </mt-tab-item>
      <mt-tab-item id="前进">
        <img slot="icon" src="@/assets/预约挂号_slices/向左按钮 拷贝.png" />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'SimpleTabbar',
  data () {
    return {
      tbSelected: ''
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.mint-tabbar {
  height: 98px;
  .mint-tab-item {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .mint-tab-item-icon {
      img {
        width: 19px;
        height: 31px;
      }
    }
  }
}
</style>
