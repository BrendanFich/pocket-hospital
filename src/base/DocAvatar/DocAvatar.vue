<template>
  <div :class="{docAvatar: name !== 'hospital'}" >
    <img :src="getAvatar(name)" @error="setDefualtImg"/>
  </div>
</template>

<script>
import { apiBaseUrl } from '@/assets/js/config'
import defualtImg from './img/docAvatar.png'
import defualtHosImg from './img/hosp.png'
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
      alert(name)
      return apiBaseUrl + '/upload/doctor/' + name + '.jpg'
    },
    setDefualtImg (e) {
      if (this.name === 'hospital') {
        e.target.src = defualtHosImg
      } else {
        e.target.src = defualtImg
      }
    }
  }
}
</script>

<style lang="sass" scoped>
img
  width: 750px
.docAvatar
  width: 102px
  height: 102px
  overflow: hidden
  margin-right: 20px
  border-radius: 50%
  img
    width: 102px
</style>
