<template>
  <div>
    <v-app-bar color="#062157" class="mb-3">

      <v-app-bar-nav-icon @click="openSidebar"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
        <!-- Guilds select -->
        <v-col cols="2">
          <v-select
            :items="user.guilds"
            item-text="name"
            item-value="id"
            label="Select server"
            v-model="selectedGuild"
          ></v-select>
        </v-col>
        <!-- Perfil -->
        <Dropdown/>
    </v-app-bar>

    <!-- Permisos -->
    <v-row>
      <v-row v-for="(item, i) of cont" :key="i" class="px-3">
        <!-- Roles select -->
        <v-col cols="3">
          <v-select
            :items="roles"
            item-text="name"
            item-value="id"
            filled
            label="Select rol"
            dense
            v-model="selectedRoles[i]"
          ></v-select>
        </v-col>

        <!-- Permisos de texto -->
        <v-col cols="4">
          <v-select
            :items="permissions.textChannels"
            filled
            label="Text channels permissions"
            dense
            v-model="textSelectedPermissions[i].allow"
            :multiple="true"
          ></v-select>
        </v-col>
        <!-- Permisos de voz -->
        <v-col cols="4">
          <v-select
            :items="permissions.voiceChannels"
            filled
            label="Voice channels permissions"
            dense
            v-model="voiceSelectedPermissions[i].allow"
            :multiple="true"
          ></v-select>
        </v-col>

        <!-- Quitar permiso -->
        <v-col cols="1">
          <v-btn
            @click="removePermission(i)"
            color="error"
            block
            height="50"
          ><font-awesome-icon icon="trash" />
          </v-btn>
        </v-col>
      </v-row>
      
      <v-row class="px-3">
        <!-- Botón enviar -->
        <v-col cols="4">
          <v-btn
            block
            class="ml-3"
            color="primary"
            @click="enviar"
          >Enviar</v-btn>
        </v-col>
        <v-spacer></v-spacer>
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
    </v-row>

    <!-- Cambiar líder -->
    <v-row class="px-3">
      <v-col cols="3">
        <v-select
          :items="roles"
          item-text="name"
          item-value="id"
          filled
          label="Roles"
          dense
          v-model="newLider"
        ></v-select>
      </v-col>

      <v-btn color="primary" @click="changeLider">Cambiar líder</v-btn>
    </v-row>

      <!-- Añadir roles extra -->
    <v-row>
      <v-col cols="3">
        <v-select
          :items="roles"
          item-text="name"
          item-value="id"
          filled
          label="Roles"
          dense
          v-model="extraRoles"
          :multiple="true"
        ></v-select>
      </v-col>

      <v-btn color="primary" @click="addExtraRoles">Añadir roles extra</v-btn>
    </v-row>

    <!-- Staff roles -->
    <v-row>
      <v-col cols="3">
        <v-select
          :items="roles"
          item-text="name"
          item-value="id"
          filled
          label="Roles"
          dense
          v-model="staff"
          :multiple="true"
        ></v-select>
      </v-col>
      <v-btn color="primary" @click="sendStaff">Actualizar staff</v-btn>
    </v-row>

    <!-- Categories -->
    <v-row>
      <v-col cols="3">
        <v-select
          :items="categories"
          item-text="name"
          item-value="id"
          filled
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
          v-model="selectedCategoryVoice"
        ></v-select>
      </v-col>
      <v-btn color="primary" @click="sendCategory">Actualizar categoria</v-btn>
    </v-row>

  </div>
</template>

<script>
import { permissions } from '../constants';
import Dropdown from '../components/Dropdown.vue';
// import Multiselect from 'vue-multiselect';

export default {
  name: 'Dashboard',
  components: {
    Dropdown,
    // Multiselect,
  },
  data: () => ({
    user: null,
    permissions,
    textSelectedPermissions: [
      { id: '', allow: [] },
    ],
    voiceSelectedPermissions: [
      { id: '', allow: [] },
    ],
    selectedGuild: '',
    roles: [],
    selectedRoles: [],
    cont: 1,
    newLider: '',
    extraRoles: [],
    staff: [],
    categories: [],
    selectedCategoryText: '',
    selectedCategoryVoice: '',
  }),
  methods: {
    enviar: function() {
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
        .then((res) => {
          alert('Permisos actualizados');
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    changeLider: function() {
      let data = {
        guild: this.selectedGuild,
        lider: this.newLider
      }
      this.$http
        .post('/clanes/lider', data)
        .then((response) => {
          alert('Rol líder actualizado');
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    addExtraRoles: function() {
      let data = {
        guild: this.selectedGuild,
        extraRoles: this.extraRoles
      }
      this.$http
        .post('/clanes/extraRoles', data)
        .then((response) => {
          alert('Roles extra añadidos.');
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    sendStaff: function() {
      let data = {
        guild: this.selectedGuild,
        staff: this.staff
      }
      this.$http
        .post('/guild/staff', data)
        .then((response) => {
          alert('Roles staff actualizados.');
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    sendCategory: function() {
      let data = {
        guild: this.selectedGuild,
        textParent: this.selectedCategoryText,
        voiceParent: this.selectedCategoryVoice
      }
      this.$http
        .post('/clanes/parent', data)
        .then((response) => {
          alert('Categoria actualizados.');
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

    openSidebar: function() {
      this.$refs.sidebar.openSidebar();
    }
  },

  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },

  watch: {
    selectedGuild: function() {
      let data = { guild: this.selectedGuild };
      this.$http
        .post('/discord/roles', data)
        .then((response) => {
          this.roles = response.data;
        })
        .catch((error) => {
          console.log(error.message);
        });
      this.$http
        .post('/discord/categories', data)
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    cont: function() {
      this.textSelectedPermissions.push({ id: '', allow: [] });
      this.voiceSelectedPermissions.push({ id: '', allow: [] });
      this.selectedRoles.push('');
    }
  }
  
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>