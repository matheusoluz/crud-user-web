<template>
  <q-page class="row justify-center items-start q-pa-md">
    <q-modal
      v-model="modal"
      maximized
    >
      <edit-user
        v-if="modal"
        :userId="userId"
      />
    </q-modal>
    <q-card class="col-12 bg-white">
      <q-card-title class="flex-center text-white bg-red q-pa-sm">
        Usuarios
        <div
          class="row flex-center fit"
          slot="right"
        >
          <q-btn
            :disable="!$acl.check('isAdmin')"
            class="no-shadow q-mx-md"
            round
            dense
            color="dark"
            icon="add"
            @click="OpenModal(0)"
          >
            <q-tooltip
              anchor="bottom middle"
              self="top middle"
              :offset="[0, 8]"
            >Criar usuario</q-tooltip>
          </q-btn>
          <q-search
            v-model="filter"
            inverted-light
            color="white"
            autofocus
            clearable
          />
        </div>
      </q-card-title>
      <q-card-main class="q-pa-none">
        <q-table
          dense
          no-data-label="Sem dados."
          :pagination.sync="Tabela.pagination"
          :data="Tabela.tableData"
          :columns="Tabela.columns"
          :filter="filter"
          row-key="id"
        >
          <q-tr
            slot="body"
            slot-scope="props"
            :props="props"
          >
            <q-td
              key="username"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="uppercase text-weight-medium">{{props.row.username}}</span>
              </div>
            </q-td>
            <q-td
              key="email"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="uppercase text-weight-medium">{{props.row.email}}</span>
              </div>
            </q-td>
            <q-td
              key="realm"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="uppercase text-weight-medium">{{props.row.realm}}</span>
              </div>
            </q-td>
            <q-td
              key="userACL"
              :props="props"
            >
              <div class="row items-center justify-start no-wrap">
                <span class="uppercase text-weight-medium">{{props.row.userACL.label}}</span>
              </div>
            </q-td>
            <q-td
              key="id"
              :props="props"
            >
              <q-btn
                :disable="!$acl.check('isAdmin')"
                class="no-shadow q-mx-md"
                round
                dense
                color="dark"
                icon="edit"
                @click="OpenModal(props.row.id)"
              >
                <q-tooltip
                  anchor="bottom middle"
                  self="top middle"
                  :offset="[0, 8]"
                >
                  Editar usuário
                </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </q-table>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import { AxiosCatchMixin } from '../../mixins/AxiosCatch'
import editUser from './edit'
export default {
  name: 'ListUser',
  components: { editUser },
  mixins: [AxiosCatchMixin],
  data () {
    return {
      Tabela: {
        loading: true,
        pagination: {
          rowsPerPage: 10,
          page: 1
        },
        tableData: [],
        columns: [
          { field: 'username', name: 'username', label: 'Nome', align: 'left', style: 'width: 20%', sortable: true },
          { field: 'email', name: 'email', label: 'Email', align: 'left', style: 'width: 25%', sortable: true },
          { field: 'realm', name: 'realm', label: 'Empresa', align: 'left', style: 'width: 25%', sortable: true },
          { field: 'userACL', name: 'userACL', label: 'Permissão', align: 'left', style: 'width: 20%', sortable: true },
          { field: 'id', name: 'id', label: 'Editar', align: 'left', style: 'width: 10%' }
        ]
      },
      filter: '',
      lstQuestions: [],
      modal: false,
      userId: 0
    }
  },
  mounted () {
    this.Load()
  },
  methods: {
    Load () {
      this.$axios.get('/Usuarios')
        .then(Res => { this.Tabela.tableData = Res.data })
        .catch(this.AxiosCatch)
    },
    OpenModal (id) {
      this.modal = true
      this.userId = id || 0
    }
  }
}
</script>

<style>
</style>
