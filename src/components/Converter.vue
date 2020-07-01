<template>
  <v-col class="m4" cols="10" lg="6">
    <v-row class="text-h4 mb-8">
      <v-icon color="primary">mdi-link-variant</v-icon>
      <h4 class="ml-2">
        <a href="https://webvpn.bit.edu.cn/">WEBVPN</a> URL Converter
      </h4>
    </v-row>

    <v-row align="center" justify="center">
      <v-text-field
        label="Original URL"
        v-model="originalUrl"
        placeholder="http://jwms.bit.edu.cn"
      />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click="clearInputUrl"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Clear input</span>
      </v-tooltip>
    </v-row>

    <v-row>
      <v-btn class="mx-auto" color="primary" @click="convert">
        Convert <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </v-row>

    <v-row align="center" justify="center">
      <v-text-field label="WEBVPN" v-model="webvpnUrl" readonly />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="copy(webvpnUrl)"
          >
            <v-icon>mdi-content-copy</v-icon>
          </v-btn>
        </template>
        <span>Copy WEBVPN URL</span>
      </v-tooltip>
    </v-row>

    <v-snackbar v-model="snackbar" max-width="100" rounded top timeout="2000">
      <v-icon color="success">mdi-check</v-icon> Copied to clipboard!
    </v-snackbar>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Converter',

  data: () => ({
    snackbar: false,
    originalUrl: '',
    webvpnUrl: 'https://webvpn.bit.edu.cn/...'
  }),

  methods: {
    convert (): void {
      const originalUrl = this.originalUrl
      console.log(originalUrl)
    },

    clearInputUrl (): void {
      this.originalUrl = ''
    },

    copy (value: string): void {
      console.log(value)
      this.snackbar = !this.snackbar
    }
  }
})
</script>
