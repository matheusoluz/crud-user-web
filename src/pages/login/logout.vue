<template>
  <q-page />
</template>

<script>
import { AxiosCatchMixin } from '../../mixins/AxiosCatch'
export default {
  name: 'PageLoginLogout',
  mixins: [AxiosCatchMixin],
  mounted () {
    this.$axios.post('/Users/logout')
      .then(Res => {
        this.$store.commit('session/resetState')
        window.localStorage.clear()
        window.location = '/'
      })
      .catch(this.AxiosCatch)
  }
}
</script>
