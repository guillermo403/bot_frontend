<template>
  <v-snackbar v-model="show" class="text-dark" :color="color" :timeout="timeout">
    <h6>{{ message }}</h6>
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs"  @click="show = false">
        <font-awesome-icon icon="times"></font-awesome-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    show: true,
    message: '',
    color: '',
    timeout: 5000
  }),

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type == 'snackbar/showMessage') {
        this.message = state.snackbar.content;
        this.color = state.snackbar.color;
        this.timeout = state.snackbar.timeout;
        this.show = true;
      }
    });
  }
}
</script>