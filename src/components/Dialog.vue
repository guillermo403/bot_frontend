<template>
  <v-row justify="center">

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Confirmar
        </v-card-title>

        <v-card-text>
          ¿Seguro que quiere borrar el clan?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dropClan"
          >
            Aceptar
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
     //
    },
    
    data: () => ({
      dialog: false,
    }),

    methods: {
      dropClan: function() {
        this.dialog = false;
        this.$emmit('on-accept');
      }
    }
  }
</script>