<template>
  <q-page class="row flex-center fit q-py-sm q-px-md">
    <login class="q-mb-sm" />
  </q-page>
</template>

<script>
import login from '../../components/login/login.vue'
export default {
  components: { login },
  name: 'PageLoginMain'
}
</script>
