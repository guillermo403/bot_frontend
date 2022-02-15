<template>
  <div>
    <app-bar></app-bar>
    
    <Loading :overlay="loading" />
    
    <v-container>

      <v-tabs>
        <v-tab href="#dashboard" @click="loadDashboardTab">
          <span class="tab">Dashboard</span>
        </v-tab>

        <v-tab href="#bot" @click="loadBotTab">
          <span class="tab">Bot</span>
        </v-tab>

        <v-tab-item value="dashboard">
          <v-data-table
            :headers="dashboardLogs.headers"
            :items="dashboardLogs.items"
          ></v-data-table>
        </v-tab-item>

        <v-tab-item value="bot">
          <v-data-table
            :headers="botLogs.headers"
            :items="botLogs.items"
          ></v-data-table>
        </v-tab-item>
      </v-tabs>
      
    </v-container>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import Loading from '../components/Loading.vue'
export default {
  name: 'Logs',
  components: {
    'app-bar': AppBar,
    Loading,
  },
  data: () => ({
    loading: false,
    botLogs: {
      header: [],
      items: [],
    },
    dashboardLogs: {
      header: [],
      items: []
    },
  }),

  methods: {
    loadBotTab: function() {
      this.$http
      .post('/logs/get/bot', { guild: JSON.parse(localStorage.getItem('selectedGuild')).id })
      .then((response) => {
        this.loading = true;
        let headers = [
          {
            text: 'Fecha',
            align: 'start',
            filterable: true,
            value: 'date',
          },
          {
            text: 'accion',
            filterable: false,
            value: 'action',
          },
          {
            text: 'User',
            filterable: false,
            value: 'user'
          },
        ];
        this.botLogs.items = response.data.map((log) => {
          let item = {
            action: log.action,
            // action: this.$il8n.t(log.action),
            date: this.$options.filters.formatDate(log.ts),
            user: log.user.username,
          };
          if (!headers.some((header) => header.value == 'description')) {
            if (Object.prototype.hasOwnProperty.call(log, 'newMembers')) {
              headers.push({ text: 'Descripción', value: 'description' });
              let newMembers = '';
              log.newMembers.forEach((member) => {
                newMembers += `${member.username} `;
              })
              item['description'] = 'Miembros ' + newMembers + ' añadido/s al clan';
            }
          }
          return item;
        });
        this.botLogs.headers = headers;
        this.loading = false;
      })
      .catch((error) => {

      });
    },

    loadDashboardTab: function() {
      this.$http
      .post('/logs/get/dashboard', { guild: JSON.parse(localStorage.getItem('selectedGuild')).id })
      .then((response) => {
        this.dashboardLogs.items = response.data.map((log) => {
          let item = {
            
          };
          return item;
        });
      })
      .catch((error) => {

      });
    },
  },

  mounted() {
    this.loadDashboardTab();
  } 
}
</script>

<style>
  .tab {
    color: white;
  }
</style>