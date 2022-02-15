<template>
  <div class="text-center">
    <v-menu :close-on-click="true" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          outlined
          dark
          v-bind="attrs"
          v-on="on"
          class="px-5"
        ><font-awesome-icon icon="user" class="mr-2" />{{ user.username }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-content @click="logout">Cerrar sesión</v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: null,
  }),

  methods: {
    logout: function() {
      localStorage.clear();
      this.$router.push('/Home');
    }
  },

  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
</script>

<style>

</style>