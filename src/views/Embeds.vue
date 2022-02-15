<template>
  <div>
    <app-bar @on-update-guild="loadGuild"></app-bar>

    <!-- <v-btn @click="tema">Cambiar tema</v-btn> -->

    <v-container>
      <v-row justify="space-between">
        <!-- Creador embeds -->
        <v-col cols="6" class="pa-5">
          <!-- <form> -->
            <!-- Mensaje -->
            <v-textarea color="white" outlined v-model="message" filled label="Mensaje a enviar con el embed"></v-textarea>
            <!-- Color picker -->
            <v-btn color="primary" class="mb-4" @click="colorPicker = !colorPicker">
              <font-awesome-icon class="" icon="palette"></font-awesome-icon>
            </v-btn>
            <v-color-picker v-if="colorPicker" width="300" class="mb-3" v-model="color"></v-color-picker>
            <!-- Título -->
            <v-text-field color="white" outlined v-model="embed.title" filled label="Titulo"></v-text-field>
            <!-- Descripción -->
            <v-textarea color="white" outlined v-model="embed.description" filled label="Descripción"></v-textarea>
            <!-- Url -->
            <v-text-field color="white" outlined v-model="embed.url" filled label="Url"></v-text-field>
            <!-- Fecha -->
            <v-checkbox color="white" outlined v-model="timestampCheck" label="Mostrar fecha"></v-checkbox>
            <!-- Imagen -->
            <v-text-field color="white" outlined v-model="embed.image.url" filled label="Imagen"></v-text-field>
            <!-- Thumbnail -->
            <v-text-field color="white" outlined v-model="embed.thumbnail.url" filled label="Thumbnail"></v-text-field>
            <!-- Footer -->
            <v-text-field color="white" outlined v-model="embed.footer.text" filled label="Texto footer"></v-text-field>
            <v-text-field color="white" outlined v-model="embed.footer.icon_url" filled label="Icono footer"></v-text-field>
            <!-- Fields -->
            <div class="fields pa-5">
              <div v-for="(field, i) in embed.fields" :key="i">
                <v-row justify="space-between" class="pa-3">
                  <label class="text-subtitle-1">Campo {{ i+1 }}</label>
                  <div class="removeField" @click="removeField(i)"><font-awesome-icon color="red" icon="trash"></font-awesome-icon></div>
                </v-row>
                <v-row justify="space-between" class="px-3">
                  <v-text-field color="white" outlined v-model="field.name" filled label="Título del campo"></v-text-field>
                  <v-checkbox class="ml-4" label="En linea" v-model="field.inline"></v-checkbox>
                </v-row>
                <v-textarea color="white" outlined v-model="field.value" filled label="Descripción del campo"></v-textarea>
              </div>
              <v-btn color="secondary" block @click="fieldsCont++">
                Añadir campo<font-awesome-icon class="ml-3" icon="plus"></font-awesome-icon>
              </v-btn>
            </div>

            <!-- Selección canal -->
            <div class="mt-4">
              <label class="text-subtitle-1">Canal</label>
              <v-select
                :items="channels"
                item-text="name"
                item-value="id"
                v-model="channel"
                color="white"
                filled
                outlined
              ></v-select>
            </div>

            <!-- Enviar -->
            <v-row justify="space-between" class="px-3">
              <v-btn @click="send" type="submit" color="primary">Enviar</v-btn>
              <v-btn @click="reset" color="secondary">Reiniciar</v-btn>
            </v-row>

            <!-- <v-btn class="primary" @click="verJSON = !verJSON">Ver JSON</v-btn>
            <v-row class="mt-4" v-if="verJSON">
              <v-col>
                <v-text-field color="white" filled :value="embed | stringToJson"></v-text-field>
              </v-col>
            </v-row> -->
          <!-- </form> -->
        </v-col>

        <!-- Visualizar embeds -->
        <v-col cols="6" class="pa-5">
          <label class="text-subtitle-1">Visualizar</label>
          <div id="embed-div" class="mt-1 pa-4">
            <div class="embed pt-5">
              <v-row class="ml-4">
                <label v-if="embed.url == ''">{{ embed.title }}</label>
                <label v-else class="link">{{ embed.title }}</label>
                <label>{{ embed.description }}</label>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    
  </div>
</template>

<script>
import AppBar from '../components/AppBar'

export default {
  name: 'Embeds',
  components: {
    'app-bar': AppBar,
  },
  data: () => ({
    channels: [],
    channel: '',
    colorPicker: false,
    timestampCheck: false,
    fieldsCont: 1,
    message: '',
    embed: {
      color: '#062157',
      title: '',
      description: '',
      url: '',
      author: {
        name: '',
        icon_url: '',
        url: '',
      },
      thumbnail: {
        url: '',
      },
      image: {
        url: '',
      },
      fields: [],
      timestamp: new Date(),
      footer: {
        text: '',
        icon_url: '',
      },
    },
    verJSON: false,
  }),
  methods: {
    send: function() {
      this.embed.color = Number(this.embed.color);
      this.clearEmptyFields();
      if (this.timestampCheck) {
        this.embed.timestamp = new Date();
      } else {
        delete this.embed.timestamp;
      }
      this.$http
      .post('/embeds/send', { embed: this.embed, message: this.message, channel: this.channel })
      .then(async (response) => {
        this.$store.commit('snackbar/showMessage', { content: 'Embed enviado', color: 'green-darken-2' });
        this.reset();
      })
      .catch((error) => {

      });
    },

    removeField: function(pos) {
      this.embed.fields.splice(pos, 1);
      this.fieldsCont--;
    },

    clearEmptyFields: function() {
      this.embed.fields.map((field, i) => {
        return field.name == '' || field.value == '' ? this.embed.fields.splice(i, 1) : '';
      });
    },

    reset: function() {
      this.channel = '';
      this.colorPicker = false;
      this.timestampCheck = false;
      this.fieldsCont = 1;
      this.message = '';
      this.embed = {
        color: '#062157',
        title: '',
        description: '',
        url: '',
        author: {
          name: '',
          icon_url: '',
          url: '',
        },
        thumbnail: {
          url: '',
        },
        image: {
          url: '',
        },
        fields: [],
        timestamp: new Date(),
        footer: {
          text: '',
          icon_url: '',
        },
      }
    },

    loadGuild: function() {
      this.channels = JSON.parse(localStorage.getItem('guild')).channels.filter((channel) => {
        return channel.type == 0; 
      });
      this.channels = this.channels.map((channel) => {
        return { id: channel.id, name: '# ' + channel.name }
      });
    },

    tema: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },

  created() {
    this.loadGuild();
  },

  watch: {
    fieldsCont: function() {
      this.embed.fields.push({ name: '', value:'', inline: false });
    },
  },

  computed: {
    color: {
      get() {
        return this.embed.color.toString().replace('0x', '#');
      },
      set(v) {
        this.embed.color = '0x'+v.substr(1);
      }
    },
  },
}
</script>

<style>
  .fields {
    border: 1px solid rgba(97, 97, 97, 0.685);
  }
  .removeField {
    cursor: pointer;
  }
  #embed-div {
    min-height: 200px;
    background-color: #202225;
  }
  .embed {
    min-height: 30px;
    border-left: 3px solid;
    border-left-color: var(color);
  }
  .link {
    color: blue;
  }

  .v-text-field--outlined >>> fieldset {
    color: red;
  }
</style>