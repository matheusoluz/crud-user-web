<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar class="q-py-none">
        <q-toolbar-title shrink>
          <span>{{$NodePackage.productName}}</span>
          <small
            v-if="$q.platform.is.mobile"
            slot="subtitle"
          >Versão: {{$NodePackage.version}}</small>
        </q-toolbar-title>
        <q-toolbar-title />
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      envDev: process.env.DEV
    }
  }
}
</script>
