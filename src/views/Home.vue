<template>
  <div>
    <v-app-bar color="primary">
      <v-col class="text-right">
        <div>
          <v-btn
            :href="url"
            color="white"
            text
            plain
          >Iniciar sesión</v-btn>
        </div>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    //
  },
  data: () => ({
    url: '',
  }),
  methods: {
    //
  },

  created() {
    this.url = this.$baseURL + '/auth';
  }
}
</script>

<style scoped>

</style>