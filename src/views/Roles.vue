<template>
  <div>
    <app-bar></app-bar>

    <v-container>
      <v-tabs>
        <!-- autoroles tab -->
        <v-tab href="#roles">
          <span class="tab-title">Roles</span>
        </v-tab>

        <v-tab href="#commands">
          <span class="tab-title">Comandos</span>
        </v-tab>

        <v-tab-item value="roles">
          <div class="mt-4 ml-4">
            <label class="text-decoration-underline text-h5 mt-3" >Autoroles</label>
            <p class="mt-3 ml-3">Si se activan los autoroles, los roles seleccionados se autoasignarás a los miembros que entren en el servidor.</p>
            <!-- Autoroles switch -->
            <div class="ml-3">
              <v-switch color="blue" v-model="autoroles" :label="autorolesLabel"></v-switch>
            </div>
            <!-- Select roles -->
            <v-row class="ml-2" justify="start">
              <v-col cols="4">
                <v-select
                  :items="roles"
                  item-text="name"
                  outlined
                  filled
                  label="Selecciona los roles"
                  multiple
                  :disabled="!autoroles"
                  v-model="autorolesSelect"
                  item-value="id"
                ></v-select>
              </v-col>

              <v-col cols="3">
                <v-btn block height="55" @click="sendAutoroles" color="primary">Guardar</v-btn>
              </v-col>
            </v-row>

            <label class="text-decoration-underline text-h5 mt-3" >Guardar roles</label>
            <p class="mt-3 ml-3">Si se activa esta opción se guardarán los roles de los usuarios para volver a asignarselos si se vuelven a unir.</p>
            <v-row justify="start" class="ml-3">
              <v-col cols="1">
                <v-switch color="blue" v-model="saveRoles"></v-switch>
              </v-col>
              <v-col cols="3">
                <v-btn block height="50" @click="sendMemberRoles" color="primary">Guardar</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-tab-item>


        <v-tab-item value="commands">
          <v-row class="mx-4 mt-4" justify="space-between">
            <v-col cols="4">
              <label class="text-subtitle-1">Rol 1</label>
              <v-select
                color="white"
                :items="roles"
                item-text="name"
                item-value="id"
                filled
                outlined
              ></v-select>
            </v-col>

            <v-col cols="4">
              <label class="text-subtitle-1">Rol 1</label>
              <v-select
                color="white"
                :items="roles"
                item-text="name"
                item-value="id"
                filled
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="my-3 ml-4">
            <v-col cols="3">
              <v-btn color="primary" block height="50">Guardar</v-btn>
            </v-col>
          </v-row>
        </v-tab-item>

      </v-tabs>

    </v-container>
    
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
import { reloadGuild } from '../functions'

export default {
  name: 'Roles',
  components: {
    'app-bar': AppBar,
  },
  data: () => ({
    roles: [],
    autoroles: false,
    autorolesLabel: 'Activar autoroles',
    autorolesSelect: [],
    saveRoles: false,
  }),
  
  methods: {
    sendAutoroles: function() {
      let data = {
        guild: JSON.parse(localStorage.getItem('selectedGuild')).id,
        addAutoroles: this.autoroles,
        autoroles: this.autorolesSelect
      }
      this.$http
      .post('/roles/autoroles', data)
      .then((response) => {
        reloadGuild(this.$http);
      })
      .catch((error) => {
        
      });
    },

    sendMemberRoles: function() {
      let data = {
        guild: JSON.parse(localStorage.getItem('selectedGuild')).id,
        saveRoles: this.saveRoles
      };
      this.$http
      .post('/roles/saveMemberRoles', data)
      .then((response) => {
        reloadGuild(this.$http);
      })
      .catch((error) => {

      });
    }
  },

  async created() {
    let guild = await JSON.parse(localStorage.getItem('guild'));
    this.roles = guild.roles;
    let configRoles = guild.config.roles;
    this.autoroles = configRoles.addAutoroles;
    this.autorolesSelect = configRoles.autoroles;
    this.saveRoles = configRoles.saveRoles;
  },

  watch: {
    autoroles: function() {
      if (this.autoroles) {
        this.autorolesLabel = 'Desactivar Autoroles';
      } else {
        this.autorolesLabel = 'Activar autoroles';
      }
    }
  },

}
</script>

<style>
  .tab-title {
    color: white;
  }
</style>