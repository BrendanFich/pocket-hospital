<template>
  <div class="index">
    <router-view></router-view>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
export default {
  name: 'Index',
  data () {
    return {}
  },
  components: { Tabbar }
}
</script>
<style lang="scss" scoped>
</style>
