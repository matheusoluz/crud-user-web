<template>
  <q-card class="col-xl-3 col-lg-4 col-md-5 col-sm-7 col-xs-12 bg-white">
    <q-card-title class="bg-red text-white q-py-sm">
      Login
    </q-card-title>
    <q-card-separator />
    <q-card-main
      class="q-pa-md"
      style="height: 220px"
    >
      <q-input
        class="q-mt-sm"
        :error="$v.Form.username.$error"
        @blur="$v.Form.username.$touch"
        v-model="Form.username"
        float-label="Usuário"
        @keyup.enter="Login"
        :disable="loading"
        color="light"
      />
      <q-input
        class="q-mt-lg"
        :error="$v.Form.password.$error"
        @blur="$v.Form.password.$touch"
        v-model="Form.password"
        float-label="Senha"
        type="password"
        @keyup.enter="Login"
        :disable="loading"
        color="light"
      />
    </q-card-main>
    <q-card-actions align="center">
      <q-btn
        class="full-width"
        :loading="loading"
        color="red"
        label="Entrar"
        @click="Login"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'ComponentLogin',
  data () {
    return {
      loading: false,
      Form: {
        username: '',
        password: ''
      }
    }
  },
  validations: {
    Form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  mounted () {
    this.$q.loading.hide()
  },
  methods: {
    Login () {
      this.$v.Form.$touch()
      if (this.$v.Form.$error) return null
      this.loading = true
      this.$axios.post('/Usuarios/login', this.Form)
        .then(Res => {
          this.$router.push({ path: '/login/token', query: { accessToken: Res.data.id, userId: Res.data.userId } })
        })
        .catch(Err => {
          console.log(Err.response.data)
          switch (Err.response.data.error.code) {
            case 'LOGIN_FAILED': this.$q.notify('Usuário/Senha inválida')
              break
            default: this.$q.notify(Err.response.data.error.code)
              break
          }
          this.loading = false
        })
    }
  }
}
</script>
