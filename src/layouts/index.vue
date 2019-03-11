<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar
        class="q-py-none"
        color="dark"
      >
        <q-toolbar-title shrink>
          <span>{{$NodePackage.productName}}</span>
          <small
            v-if="$q.platform.is.mobile"
            slot="subtitle"
          >
            Versão: {{$NodePackage.version}}
          </small>
        </q-toolbar-title>
        <q-toolbar-title />
        <q-btn-group
          align="justify"
          rounded
        >
          <q-btn
            color="light"
            label="Logout"
            class="q-px-md"
            flat
            round
            dense
            icon="person"
            to="/login/logout"
          >
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
            >
              Logout
            </q-tooltip>
          </q-btn>
        </q-btn-group>
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
