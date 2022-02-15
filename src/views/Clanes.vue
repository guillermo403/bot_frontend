<template>
  <div>
    <app-bar @on-update-guild="loadGuild"></app-bar>

    <Loading :overlay="loading"/>

    <v-container>
      
      <v-btn class="secondary" height="50" plain block @click="showGeneralConfig">
        Configuración general
      </v-btn>
      
      <div v-if="generalConfig" class="mb-5">
        <v-expansion-panels>
          <!-- Panel permisos -->
          <v-expansion-panel>
            <v-expansion-panel-header>Permisos</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row v-for="(item, i) of cont" :key="i" class="px-3">
                <!-- Roles select -->
                <v-col cols="3">
                  <v-select
                    :items="permissionRoles"
                    item-text="name"
                    item-value="id"
                    filled
                    label="Select rol"
                    dense
                    color="white"
                    v-model="selectedRoles[i]"
                  ></v-select>
                </v-col>

                <!-- Permisos de texto -->
                <v-col cols="4">
                  <v-select
                    :items="permissions.textChannels"
                    item-text="name"
                    item-value="id"
                    filled
                    label="Text channels permissions"
                    dense
                    color="white"
                    v-model="textSelectedPermissions[i].allow"
                    :multiple="true"
                  ></v-select>
                </v-col>
                <!-- Permisos de voz -->
                <v-col cols="4">
                  <v-select
                    :items="permissions.voiceChannels"
                    item-text="name"
                    item-value="id"
                    filled
                    label="Voice channels permissions"
                    dense
                    color="white"
                    v-model="voiceSelectedPermissions[i].allow"
                    :multiple="true"
                  ></v-select>
                </v-col>

                <!-- Quitar permiso -->
                <v-col cols="1">
                  <v-btn
                    @click="removePermission(i)"
                    color="danger"
                    block
                    height="50"
                  ><font-awesome-icon icon="trash" />
                  </v-btn>
                </v-col>
              </v-row>
              
              <v-row class="px-3" justify="space-between">
                <!-- Botón enviar -->
                <v-col cols="3">
                  <v-btn
                    block
                    color="primary"
                    @click="sendPermissions"
                    height="50"
                    dark
                    :disabled="buttons.sendPermissions"
                  >Guardar</v-btn>
                </v-col>
                <!-- Botón añadir permiso -->
                <v-col cols="1">
                  <v-btn
                    @click="addPermission"
                    color="success"
                    block
                    height="50"
                  ><font-awesome-icon icon="plus" />
                  </v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Panel lider -->
          <v-expansion-panel>
            <v-expansion-panel-header>Lider clan</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="3">
                  <v-select
                    :items="roles"
                    item-text="name"
                    item-value="id"
                    :disabled="liderCheck"
                    filled
                    label="Roles"
                    dense
                    color="white"
                    v-model="newLider"
                  ></v-select>
                </v-col>

                <!-- Checkbox -->
                <v-checkbox color="white" v-model="liderCheck">
                  <template v-slot:label>
                    <div>Crear nuevo rol lider para cada clan</div>
                  </template>
                </v-checkbox>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-btn
                    block
                    color="primary"
                    @click="sendLider"
                    height="50"
                    :disabled="buttons.sendLider"
                  >Guardar</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Límite -->
          <v-expansion-panel>
            <v-expansion-panel-header>Límite</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="limite"
                    color="white"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-btn
                    block
                    color="primary"
                    @click="sendLimit"
                    height="50"
                    :disabled="buttons.sendLimit"
                  >Guardar</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Panel roles extra -->
          <v-expansion-panel>
            <v-expansion-panel-header>Añadir roles extra</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="3">
                  <v-select
                    :items="roles"
                    item-text="name"
                    item-value="id"
                    filled
                    label="Roles"
                    dense
                    color="white"
                    v-model="extraRoles"
                    :multiple="true"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-btn
                    block
                    color="primary"
                    @click="sendExtraRoles"
                    height="50"
                    :disabled="buttons.sendExtraRoles"
                  >Guardar</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          
          <!-- Panel roles staff -->
          <v-expansion-panel>
            <v-expansion-panel-header>Staff</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="3">
                  <v-select
                    :items="roles"
                    item-text="name"
                    item-value="id"
                    filled
                    label="Roles"
                    dense
                    color="white"
                    v-model="staff"
                    :multiple="true"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-btn
                    block
                    color="primary"
                    @click="sendStaff"
                    height="50"
                    :disabled="buttons.sendStaff"
                  >Guardar</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Panel categorias clanes -->
          <v-expansion-panel>
            <v-expansion-panel-header>Categorías</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="3">
                  <v-select
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    filled
                    color="white"
                    label="Categoría canales de texto"
                    dense
                    v-model="selectedCategoryText"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    filled
                    label="Categoría canales de voz"
                    dense
                    color="white"
                    v-model="selectedCategoryVoice"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    filled
                    label="Categoría clanes archivados"
                    dense
                    color="white"
                    v-model="selectedCategoryArchivados"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-btn
                    block
                    color="primary"
                    @click="sendCategory"
                    height="50"
                    :disabled="buttons.sendExtraRoles"
                  >Guardar</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- Información clanes -->
      <v-btn v-if="clanes[0]" class="secondary mt-5" height="50" plain block @click="showClanesInfoConfig">Información clanes</v-btn>
      <v-btn v-else class="secondary mt-5" height="50" plain block disabled>No hay clanes</v-btn>
      <div v-if="clanesInfoConfig">
        <v-expansion-panels>
          <v-expansion-panel v-for="clan in clanes" :key="clan.id">
            <v-expansion-panel-header>
              <span class="font-weight-bold text-subtitle-1">{{ clan.name }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <!-- Lider clan -->
                <v-col cols="3" v-if="clan.lider">
                  <v-text-field disabled outlined label="Líder" :value="clan.lider.name">
                    <!-- <font-awesome-icon icon="pen"></font-awesome-icon> -->
                  </v-text-field>
                </v-col>
                <v-col cols="3" v-else>
                  <v-text-field disabled outlined label="Líder" value="Ninguno">
                    <!-- <font-awesome-icon icon="pen" slot="append"></font-awesome-icon> -->
                  </v-text-field>
                </v-col>
                <!-- Límite -->
                <v-col cols="3" v-if="clan.limite">
                  <v-text-field disabled outlined label="Límite" type="number" :value="clan.limite">
                    <!-- <font-awesome-icon icon="pen" slot="append"></font-awesome-icon> -->
                  </v-text-field>
                </v-col>
                <v-col cols="3" v-else>
                  <v-text-field disabled outlined label="Límite" type="number" value="Inifinito">
                    <font-awesome-icon icon="pen" slot="append"></font-awesome-icon>
                  </v-text-field>
                </v-col>
                <!-- Feha creación clan -->
                <v-col cols="3">
                  <v-text-field disabled outlined label="Fecha creación" :value="clan.created | formatDate"></v-text-field>
                </v-col>
                <!-- Fecha archivado -->
                <v-col cols="3" v-if="clan.archivado">
                  <v-text-field disabled outlined label="Archivado el" :value="clan.archivado | formatDate"></v-text-field>
                </v-col>
              </v-row>
              <!-- Canales -->
              <v-row>
                <v-col cols="12">
                  <label>Canales de texto ({{ clan.textChannels.length }})</label>
                </v-col>
                <v-col cols="6" v-for="channel in clan.textChannels" :key="channel.id">
                  <v-text-field disabled outlined label="Canal" :value="channel.name"></v-text-field>
                </v-col>
                <v-col cols="12" v-if="!clan.archivado">
                  <label>Canales de voz ({{ clan.voiceChannels.length }})</label>
                </v-col>
                <v-col cols="6" v-for="channel in clan.voiceChannels" :key="channel.id">
                  <v-text-field v-if="!clan.archivado" disabled outlined label="Canal" :value="channel.name"></v-text-field>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-container>

  </div>
</template>

<script>
import { permissions } from '../constants';
import AppBar from '../components/AppBar';
import { saveGuild } from '../functions';
import Loading from '../components/Loading'

export default {
  name: 'Clanes',
  components: {
    'app-bar': AppBar,
    Loading
  },
  props: {
    //
  },
  data: () => ({
    selectedGuild: '',
    permissions,
    textSelectedPermissions: [
      { id: '', allow: [] },
    ],
    voiceSelectedPermissions: [
      { id: '', allow: [] },
    ],
    permissionRoles: [],
    roles: [],
    cont: 1,
    extraRoles: [],
    newLider: '',
    liderCheck: false,
    staff: [],
    categories: [],
    selectedRoles: [],
    selectedCategoryText: '',
    selectedCategoryVoice: '',
    selectedCategoryArchivados: '',
    limite: 0,
    buttons: {
      sendPermissions: false,
      sendStaff: false,
      sendCategory: false,
      sendExtraRoles: false,
      sendLider: false,
      sendLimit: false,
    },
    clanes: [],
    loading: false,
    generalConfig: false,
    clanesInfoConfig: false,
  }),
  methods: {
    showGeneralConfig: function() {
      this.generalConfig = !this.generalConfig;
    },
    showClanesInfoConfig: function() {
      this.clanesInfoConfig = !this.clanesInfoConfig;
    },

    sendPermissions: function() {
      this.buttons.sendPermissions = true;
      this.loading = true;
      for (let i = 0; i < this.cont; i++) {
        this.textSelectedPermissions[i].id = this.selectedRoles[i];
        this.voiceSelectedPermissions[i].id = this.selectedRoles[i];
      }
      let data = {
        textPermissions: this.textSelectedPermissions,
        voicePermissions: this.voiceSelectedPermissions,
        guild: this.selectedGuild
      }
      this.$http
      .post('/clanes/permissions', data)
      .then(async (res) => {
        await this.reload();
        this.loadGuild();
        this.buttons.sendPermissions = false;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error.message);
      });
    },

    sendLider: function() {
      this.buttons.sendLider = true;
      this.loading = true;
      let data = {
        guild: this.selectedGuild,
        lider: this.liderCheck ? this.liderCheck : this.newLider
      }
      this.$http
      .post('/clanes/lider', data)
      .then(async (response) => {
        await this.reload();
        this.buttons.sendLider = false;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error.message);
      });
    },

    sendLimit: function() {
      this.buttons.sendLimit = true;
      this.loading = true;
      let data = {
        guild: this.selectedGuild,
        limite: this.limite
      }
      this.$http
      .post('clanes/limit', data)
      .then(async (response) => {
        await this.reload();
        this.buttons.sendLimit = false;
        this.loading = false;
      })
      .catch((error) => {
        
      })
    },

    sendExtraRoles: function() {
      this.buttons.sendExtraRoles = true;
      this.loading = true;
      let data = {
        guild: this.selectedGuild,
        extraRoles: this.extraRoles
      }
      this.$http
      .post('/clanes/extraRoles', data)
      .then(async (response) => {
        await this.reload();
        this.buttons.sendExtraRoles = false;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error.message);
      });
    },

    sendStaff: function() {
      this.buttons.sendStaff = true;
      this.loading = true;
      let data = {
        guild: this.selectedGuild,
        staff: this.staff
      }
      this.$http
      .post('/guild/staff', data)
      .then(async (response) => {
        await this.reload();
        this.buttons.sendStaff = false;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error.message);
      });
    },

    sendCategory: function() {
      this.buttons.sendCategory = true;
      this.loading = true;
      let data = {
        guild: this.selectedGuild,
        textParent: this.selectedCategoryText,
        voiceParent: this.selectedCategoryVoice,
        archivados: this.selectedCategoryArchivados
      }
      this.$http
      .post('/clanes/parent', data)
      .then(async (response) => {
        await this.reload();
        this.buttons.sendCategory = false;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error.message);
      });
    },

    addPermission: function() {
      this.cont++;
    },
    removePermission: function(permission) {
      this.selectedRoles.splice(permission, 1);
      this.textSelectedPermissions.splice(permission, 1);
      this.voiceSelectedPermissions.splice(permission, 1);
      this.cont--;
    },
    
    loadGuild: function() {
      this.loading = true;
      let guild = JSON.parse(localStorage.getItem('guild'));
      this.selectedGuild = JSON.parse(localStorage.getItem('selectedGuild')).id;
      this.load(guild);
    },

    load: function(guild) {
      // Load roles
      this.permissionRoles = [...guild.roles];
      this.permissionRoles.unshift({ name: 'Clan role', id: '%clan%' });
      this.roles = [...guild.roles];
      // Load categories
      let channels = guild.channels;
      if (channels)
        this.categories = channels.filter((channel) => {
          return channel.type == 4;
        });
      // Load all guild config
      this.cont = 0;
      if (guild.config.clanes.lider == '%lider%') {
        this.newLider = '';
        this.liderCheck = true;
      } else {
        this.newLider = guild.roles.find((role) => {
          return role.id == guild.config.clanes.lider;
        });
      }
      this.staff = [];
      this.limite = 0;
      this.extraRoles = [];
      this.selectedCategoryArchivados = [];
      this.selectedCategoryVoice = [];
      this.selectedCategoryText = [];
      this.staff = guild.config.clanes.staff;
      this.selectedCategoryText = guild.config.clanes.textParent;
      this.selectedCategoryVoice = guild.config.clanes.voiceParent;
      this.selectedCategoryArchivados = guild.config.clanes.archivadosParent;
      this.extraRoles = guild.config.clanes.extraRoles;
      this.limite = guild.config.clanes.limite;

      this.textSelectedPermissions = [];      
      this.voiceSelectedPermissions = [];      
      this.selectedRoles = [];
      let permissions = guild.config.clanes.textPermissions;
      if (permissions.length > 0) {
        for (let i = 0; i < permissions.length; i++) {
          this.cont++;
          this.selectedRoles.push(permissions[i].id);
          this.textSelectedPermissions.push({ id: '', allow: permissions[i].allow });
        }
        permissions = guild.config.clanes.voicePermissions;
        for (let i = 0; i < permissions.length; i++) {
          this.voiceSelectedPermissions.push({ id: '', allow: permissions[i].allow });
        }
      } else {
        this.textSelectedPermissions = [
          { id: '', allow: [] },
        ];
        this.voiceSelectedPermissions = [
          { id: '', allow: [] },
        ];
        this.cont = 1;
      }
      // Load all guild clanes
      let clanes = guild.clanes;
      for (let i = 0; i < clanes.length; i++) {
        for (let j = 0; j < clanes[i].textChannels.length; j++) {
          clanes[i].textChannels[j] = guild.channels.find((channel) => {
            return channel.type == 0 && channel.id == clanes[i].textChannels[j];
          });
        }
        for (let j = 0; j < clanes[i].voiceChannels.length; j++) {
          if (!clanes[i].archivado) {
            clanes[i].voiceChannels[j] = guild.channels.find((channel) => {
              return channel.type == 2 && channel.id == clanes[i].voiceChannels[j];
            });
          }
        }
      }
      this.clanes = guild.clanes;
      // End charging animation
      this.loading = false;
    },

    reload: async function() {
      let id = JSON.parse(localStorage.getItem('selectedGuild')).id;
      let name = JSON.parse(localStorage.getItem('selectedGuild')).name;
      await saveGuild(this.$http, id, name);
    },

    editLimit: function(id) {
      alert(id);
    }
  },

  created() {
    this.loadGuild();
  },

  watch: {
    cont: function() {
      this.textSelectedPermissions.push({ id: '', allow: [] });
      this.voiceSelectedPermissions.push({ id: '', allow: [] });
      this.selectedRoles.push('');
    },

    liderCheck: function() {
      this.newLider = '';
    }
  }
}
</script>

<style>

</style>