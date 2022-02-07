<template>
  <v-container>
    <v-navigation-drawer v-model="sidebar" absolute temporary bottom class="fill-height">
      <v-list class="mt-5" nav>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.path" link>
          <v-list-item-icon>
            <font-awesome-icon :icon="item.icon" />
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: 'Sidebar',
  
  data: () => ({
    sidebar: false,
    items: [
      { title: 'Home', icon: 'home', path: '/' },
    ],
  }),

  methods: {
    openSidebar: function() {
      this.seidebar = true;
    }
  },


}
</script>