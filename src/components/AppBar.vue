<template>
  <div style="height:50">
    
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>

    <v-app-bar color="primary" class="mb-3">
      <v-app-bar-nav-icon @click="collapseSidebar"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <!-- Guilds select -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="white"
            dark
            class="mr-4"
            plain
            outlined
            v-bind="attrs"
            v-on="on"
          >
            {{ guild }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in user.guilds"
              :key="i"
              @click="updateGuild(item.id, item.name)"
            >
              <v-list-item-content
                v-text="item.name"
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <!-- Perfil -->
      <Dropdown/>
    </v-app-bar>

    <v-navigation-drawer app :width="navigationDrawerWidth" class="primary">
      <v-list class="mt-5" nav>
        <div v-for="(item, i) in sidebarItems" :key="i">
          <v-list-item-group>
            <v-list-item :to="item.path" link>
              <v-list-item-icon>
                <font-awesome-icon :icon="item.icon" />
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>

        </div>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
import Dropdown from './Dropdown.vue';
import { saveGuild } from '../functions'

export default {
  name: 'Dashboard',
  components: {
    Dropdown,
  },
  props: {
    //
  },
  data: () => ({
    user: null,
    guild: 'Select guild',
    selectedGuild: '',
    sidebarItems: [
      { title: 'Inicio', icon: 'home', path: 'Dashboard' },
      { title: 'Clanes', icon: 'wrench', path: 'Clanes' },
      { title: 'Embeds', icon: 'comment', path: 'Embeds' },
      { title: 'Roles', icon: 'user-plus', path: 'Roles' },
      { title: 'Logs', icon: 'user-plus', path: 'Logs' },
    ],
    overlay: false,
    navigationDrawerWidth: 250,
    sidebarCollapse: false,
  }),
  methods: {
    updateGuild: async function(id, name) {
      if (id == JSON.parse(localStorage.getItem('selectedGuild')).id) return;
      this.overlay = true;
      this.selectedGuild = id;
      this.guild = name;
      let selectedGuild = JSON.stringify({ id, name });
      localStorage.setItem('selectedGuild', selectedGuild);
      await saveGuild(this.$http, id, name);
      await this.$emit('on-update-guild', this.selectedGuild);
      this.overlay = false;
    },

    collapseSidebar: function() {
      this.sidebarCollapse = !this.sidebarCollapse;
      localStorage.setItem('sidebarCollapse', this.sidebarCollapse);
      if (this.sidebarCollapse) {
        this.navigationDrawerWidth = 50;
      } else {
        this.navigationDrawerWidth = 250;
      }
    }
  },

  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
    let selectedGuild = JSON.parse(localStorage.getItem('selectedGuild'));
    this.guild = selectedGuild.name;
    this.selectedGuild = selectedGuild.id;
    saveGuild(this.$http, selectedGuild.id, selectedGuild.name);

    // Sidebar
    this.sidebarCollapse = localStorage.getItem('sidebarCollapse');
    if (this.sidebarCollapse == 'true') {
      this.navigationDrawerWidth = '50';
    } else {
      this.navigationDrawerWidth = '250';
    }
  },
  
  watch: {
    //
  }
  
}
</script>

<style>

</style>