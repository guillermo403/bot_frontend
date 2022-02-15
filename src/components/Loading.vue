<template>
  <v-overlay :value="overlay">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: {
    overlay: {
      type: Boolean,
      default: false
    }
  }
}
</script>