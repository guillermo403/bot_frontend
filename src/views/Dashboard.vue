<template>
  <div>
    <app-bar></app-bar>

    <v-btn color="primary" class="ml-5">Snackbar</v-btn>

  </div>
</template>

<script>
import AppBar from '../components/AppBar'

export default {
  name: 'Dashboard',
  components: {
    'app-bar': AppBar,
  },
  data: () => ({
    snackbar: true,
  }),
  methods: {
    // snackbar: function() {
    //   this.$store.commit('snackbar/showMessage', { content: 'Embed enviado', color: 'green-darken-2' });
    // }
  },

  mounted() {
    this.$store.commit('snackbar/showMessage', { content: 'Embed enviado', color: 'green-darken-2' });
  }
  
}
</script>

<style>

</style>