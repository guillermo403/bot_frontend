<template>
  <div>
    <v-app-bar color="#062157">
      <v-col class="text-right">
        <Button></Button>
      </v-col>
    </v-app-bar>
  </div>
</template>

<script>
import Button from '../components/Button';

export default {
  name: 'Home',
  components: {
    Button,
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
}
</script>

<style scoped>

</style>