<template>
  <div class="reserve">
    <mt-header fixed title="掌上医院"></mt-header>
    <mt-search v-model="value"></mt-search>

    <mt-tabbar v-model="selected" :fixed="true">
      <mt-tab-item id="首页">
        <img slot="icon" src="@/assets/预约挂号_slices/向左按钮.png" />
      </mt-tab-item>
      <mt-tab-item id="互联网医院">
        <img slot="icon" src="@/assets/预约挂号_slices/向左按钮 拷贝.png" />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "Reserve",
  data() {
    return {
      value: "",
      selected: ""
    };
  }
};
</script>

<style scoped>
</style>
