<template>
  <div class="tabbar">
    <router-link to="/index">
      <div class="tab" :class="{active: activeNum===1}" @click="changeTab(1)">
        <img src="@/assets/img/首页选中.png" v-show="activeNum===1" />
        <img src="@/assets/img/首页未选中.png" v-show="activeNum!=1" />
        <span>首页</span>
      </div>
    </router-link>
    <router-link to="/internetHospital">
      <div class="tab" :class="{active: activeNum===2}" @click="changeTab(2)">
        <img src="@/assets/img/医院选中.png" v-show="activeNum===2" />
        <img src="@/assets/img/医院未选中.png" v-show="activeNum!=2" />
        <span>互联网医院</span>
      </div>
    </router-link>
    <router-link to="/mine">
      <div class="tab" :class="{active: activeNum===3}" @click="changeTab(3)">
        <img src="@/assets/img/个人中心选中.png" v-show="activeNum===3" />
        <img src="@/assets/img/个人中心未选中.png" v-show="activeNum!=3" />
        <span>个人中心</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {
      activeNum: 1
    }
  },
  methods: {
    changeTab (index) {
      this.activeNum = index
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
      width: 33px;
      height: 34px;
      margin-bottom: 12px;
    }
  }
  .active {
    color: #09cf74;
  }
}
</style>
