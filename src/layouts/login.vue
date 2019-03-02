<template>
  <q-layout class="bg-dark">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutLogin',
  data () {
    return {
      envDev: process.env.DEV
    }
  },
  mounted () {
    if (this.$q.localStorage.get.item('AutoLogin')) {
      this.$router.push({ path: '/login/token', query: this.$q.localStorage.get.item('AutoLogin') })
    }
  }
}
</script>
