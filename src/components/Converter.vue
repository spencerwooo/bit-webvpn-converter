<template>
  <v-col class="m4" cols="10" lg="6">
    <v-row class="text-h4 mb-4">
      <h4>
        <v-icon class="mr-2" color="primary">mdi-link-variant</v-icon
        ><a href="https://webvpn.bit.edu.cn/">WEBVPN</a> URL Converter
      </h4>
    </v-row>

    <v-row>
      <p class="text--secondary mb-8">
        🥑 <b>WEBVPN Converter</b> can help you convert a BIT local area network
        URL into its corresponding WEBVPN URL so that you can access BIT local
        resources from anywhere in the world.
      </p>
    </v-row>

    <v-row align="center" justify="center">
      <v-text-field
        label="Original URL"
        v-model="originalUrl"
        placeholder="http://jwms.bit.edu.cn"
      />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="clearInputUrl">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Clear input</span>
      </v-tooltip>
    </v-row>

    <v-row>
      <v-btn class="mx-auto my-4" color="primary" @click="convert">
        Convert <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </v-row>

    <v-row align="center" justify="center">
      <v-text-field
        label="WEBVPN"
        v-model="webvpnUrl"
        readonly
        placeholder="https://webvpn.bit.edu.cn/..."
      />

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            color="primary"
            v-bind="attrs"
            v-on="on"
            target="_blank"
            :href="webvpnUrl"
          >
            OPEN
          </v-btn>
        </template>
        <span>Open URL in new tab</span>
      </v-tooltip>

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

    <!-- <v-row class="mt-8">
      <p class="text--secondary text-uppercase">
        Common resources
      </p>
    </v-row> -->

    <v-snackbar
      v-model="snackbarCopy"
      max-width="100"
      rounded
      top
      timeout="2000"
    >
      <v-icon color="success">mdi-check</v-icon> {{ snackbarCopyNote }}
    </v-snackbar>
    <v-snackbar
      v-model="snackbarNoInput"
      max-width="100"
      rounded
      top
      timeout="2000"
    >
      <v-icon color="warning">mdi-alert</v-icon> You'll need to specify a URL
      first.
    </v-snackbar>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { convert } from './convert'

export default Vue.extend({
  name: 'Converter',

  data: () => ({
    snackbarCopy: false,
    snackbarCopyNote: 'Copied to clipboard!',
    snackbarNoInput: false,

    originalUrl: '',
    webvpnUrl: ''

    // commonResources: [
    //   {
    //     name: '本科生教务系统 - 教学一体化服务平台',
    //     category: '业务系统',
    //     url: 'jwms.bit.edu.cn',
    //     encryptedUrl: 'https://webvpn.bit.edu.cn/http/77726476706e69737468656265737421fae04c8f69326144300d8db9d6562d'
    //   },
    //   {
    //     name: '软件正版化平台',
    //     category: '业务系统',
    //     url: 'ca.bit.edu.cn',
    //     encryptedUrl: 'https://webvpn.bit.edu.cn/http/77726476706e69737468656265737421f3f60f9e2e2426557a1dc7af96'
    //   },
    //   {
    //     name: '中国知网',
    //     category: '图书馆常用数据库',
    //     url: 'www.cnki.net',
    //     encryptedUrl: 'https://webvpn.bit.edu.cn/http/77726476706e69737468656265737421e7e056d2243e635930068cb8'
    //   }
    // ]
  }),

  methods: {
    convert (): void {
      const originalUrl = this.originalUrl
      if (originalUrl === '') {
        this.snackbarNoInput = !this.snackbarNoInput
      } else {
        const encryptedUrl = convert(originalUrl)
        this.webvpnUrl = `https://webvpn.bit.edu.cn${encryptedUrl}`
      }
    },

    clearInputUrl (): void {
      this.originalUrl = ''
    },

    copy (value: string): void {
      if (this.webvpnUrl === '') {
        value = 'https://webvpn.bit.edu.cn'
        this.snackbarCopyNote = 'Default WEBVPN URL copied!'
      }
      console.log('Copied value:', value)
      // eslint-disable-next-line
      ;(this as any).$clipboard(value)
      this.snackbarCopy = !this.snackbarCopy
    }
  }
})
</script>

<style scoped>
.v-card {
  transition: all 0.2s ease-in-out;
}

.v-card.on-hover {
  border: thin solid var(--v-primary-base);
}
</style>
