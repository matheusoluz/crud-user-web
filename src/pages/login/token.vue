<template>
  <q-page />
</template>

<script>
import { AxiosCatchMixin } from '../../mixins/AxiosCatch'
export default {
  name: 'PageLoginToken',
  mixins: [AxiosCatchMixin],
  mounted () {
    this.$q.loading.show({ message: 'Inicializando sessão...' })

    this.$axios.defaults.headers.common['Authorization'] = this.$route.query['accessToken']
    this.$axios.get('/Usuarios/' + this.$route.query['userId'])
      .then(Res => {
        Res.data.accessToken = this.$route.query['accessToken']
        this.$store.commit('session/set', Res.data)

        Res.data.userACL
          ? this.$acl.change(Res.data.userACL || 'authenticated')
          : this.$acl.change('authenticated')

        this.$q.loading.hide()
        this.$q.localStorage.set('AutoLogin', this.$route.query)

        let urlGoTo = this.$q.localStorage.get.item('urlGoTo')
        if (urlGoTo && urlGoTo.length > 1 && urlGoTo.split('/')[1] !== 'login') this.$router.push(urlGoTo)
        else this.$router.push('/')
      })
      .catch(Err => {
        console.log('Err: ', Err)
        switch (Err.response.data.error.code) {
          case 'LOGIN_FAILED': this.$router.push('/login/')
            break
          case 'AUTHORIZATION_REQUIRED': this.$router.push('/login/')
            break
          default:
            this.$router.push('/login/')
            this.AxiosCatchMixin(Err)
            break
        }
      })
  }
}
</script>
