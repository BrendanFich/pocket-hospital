<template>
  <div class="docAvatar">
    <img :src="getAvatar(name)" @error="setDefualtImg"/>
  </div>
</template>

<script>
import { apiBaseUrl } from '@/assets/js/config'
import defualtImg from './img/docAvatar.png'
export default {
  name: 'docAvatar',
  data () {
    return {

    }
  },
  props: {
    name: String
  },
  methods: {
    getAvatar (name) {
      return apiBaseUrl + '/upload/doctor/' + name + '.jpg'
    },
    setDefualtImg (e) {
      e.target.src = defualtImg
    }
  }
}
</script>

<style lang="sass" scoped>
.docAvatar
  width: 102px
  height: 102px
  overflow: hidden
  margin-right: 20px
  border-radius: 50%
  img
    width: 102px
</style>
