<template>
  <v-app>
    <v-app-bar app color="white" light flat rounded>
      <div class="d-flex align-center">
        <v-btn icon color="primary">
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-toolbar-title class="font-weight-bold"
          >WEBVPN Converter</v-toolbar-title
        >
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/spencerwooo/bit-webvpn-converter"
        target="_blank"
        text
      >
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container fill-height>
      <v-row justify="center">
        <Converter />
      </v-row>
    </v-container>

    <v-footer padless>
      <v-row justify="center" no-gutters>
        <!-- <v-btn
          v-for="link in links"
          :key="link.name"
          text
          rounded
          class="my-2"
          :href="link.link"
        >
          {{ link.name }}
        </v-btn> -->
        <v-col class="py-4 text-center black--text" cols="12">
          ©{{ new Date().getFullYear() }} —
          <strong>Built with love at <a href="http://www.bit.edu.cn/" target="_blank">BIT</a></strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Converter from './components/Converter.vue'

export default Vue.extend({
  name: 'App',

  components: {
    Converter
  },

  data: () => ({
    // links: [
    //   { name: 'Spencer Woo', link: 'https://spencerwoo.com' },
    // ]
  })
})
</script>
