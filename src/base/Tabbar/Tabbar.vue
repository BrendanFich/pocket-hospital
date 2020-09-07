<template>
  <div class="tabbar">
    <router-link to="/index">
      <div class="tab" :class="{active: isShow1}">
        <img src="./img/indexOn.png" v-show="isShow1" />
        <img src="./img/indexOff.png" v-show="!isShow1" />
        <span>首页</span>
      </div>
    </router-link>
    <!-- <router-link to="/iHospital">
      <div class="tab" :class="{active: isShow2}">
        <img src="./img/hospitalOn.png" v-show="isShow2" />
        <img src="./img/hospitalOff.png" v-show="!isShow2" />
        <span>互联网医院</span>
      </div>
    </router-link> -->
    <router-link to="/mine">
      <div class="tab" :class="{active: isShow3}">
        <img src="./img/mineOn.png" v-show="isShow3" />
        <img src="./img/mineOff.png" v-show="!isShow3" />
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
      return this.$route.path.includes('/mine')
    }
  }
}
</script>
<style lang="sass" scoped>
.tabbar
  width: 100%
  background: #fff
  position: fixed
  bottom: 0
  border-top: 1px solid #ededed
  height: 98px
  display: flex
  .router-link-active
    text-decoration: none
  .tab
    width: 375px
    height: 98px
    color: #cccccc
    font-size: 20px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    img
      width: 34px
      margin-bottom: 12px
  .active
    color: #09cf74
</style>
