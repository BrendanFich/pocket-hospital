<template>
  <div class="tabbar">
    <router-link to="/index">
      <div class="tab" :class="{active: isShow1}">
        <img src="@/assets/img/首页选中.png" v-show="isShow1" />
        <img src="@/assets/img/首页未选中.png" v-show="!isShow1" />
        <span>首页</span>
      </div>
    </router-link>
    <router-link to="/iHospital">
      <div class="tab" :class="{active: isShow2}">
        <img src="@/assets/img/医院选中.png" v-show="isShow2" />
        <img src="@/assets/img/医院未选中.png" v-show="!isShow2" />
        <span>互联网医院</span>
      </div>
    </router-link>
    <router-link to="/mine">
      <div class="tab" :class="{active: isShow3}">
        <img src="@/assets/img/个人中心选中.png" v-show="isShow3" />
        <img src="@/assets/img/个人中心未选中.png" v-show="!isShow3" />
        <span>个人中心</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {}
  },
  computed: {
    isShow1 () {
      return this.$route.path === '/index'
    },
    isShow2 () {
      return this.$route.path === '/iHospital' || this.$route.path === '/iHospital/review'
    },
    isShow3 () {
      return this.$route.path === '/mine'
    }
  }
}
</script>
<style lang="scss" scoped>
.tabbar {
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ededed;
  height: 98px;
  display: flex;
  .router-link-active {
    text-decoration: none;
  }
  .tab {
    width: 250px;
    height: 98px;
    color: #cccccc;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 34px;
      margin-bottom: 12px;
    }
  }
  .active {
    color: #09cf74;
  }
}
</style>
