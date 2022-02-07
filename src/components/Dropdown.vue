<template>
  <div class="text-center">
    <v-menu :close-on-click="true">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          outlined
          dark
          v-bind="attrs"
          v-on="on"
          class="px-5"
        ><font-awesome-icon icon="user" class="mr-2" />{{ user.username }}
          <font-awesome-icon icon="arrow-down" class="ml-2" />
        </v-btn>
      </template>

      <v-list
        class="dropdown"
        outlined
        flat
        nav
        dense
      ><v-list-item v-for="(item, index) in items" :key="index" >
          <fontawesome-icon :icon="item.icon"></fontawesome-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: null,
    items: [
      { title: 'Cerrar sesión', icon: 'sign-out-alt' }
    ]
  }),

  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
</script>

<style>
  .dropdown {
    margin-top: 35px;
  }
  .dropdown-menu {
    background-color: #062157;
  }
  .dropdown-menu-text {
    color: white;
  }
</style>