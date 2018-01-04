<template>
  <div>
    <img alt="Base" src="/Caster/Base.png" />
    
    <img alt="Left" :src="leftUrl" />
    <img alt="Right" :src="rightUrl" />
  </div>
</template>

<script>
  import Vuex from 'vuex'

  import { db } from '~/services/firebase/index'
  const casterRef = db.ref('/caster')
  const baseUrl = '/Caster'

  export default {
    layout: 'overlay',
    computed: {
      leftUrl: function () {
        const name = this.$store.state.caster.left
        return `${baseUrl}/Left/${name}.png`
      },
      rightUrl: function () {
        const name = this.$store.state.caster.right
        return `${baseUrl}/Right/${name}.png`
      },
      ...Vuex.mapState(['scoreboard'])
    },
    created () {
      this.$store.dispatch('setCasterRef', casterRef)
    }
  }
</script>