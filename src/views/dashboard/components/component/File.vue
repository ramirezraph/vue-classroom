<template>
  <div class="d-flex d-block">
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <span
          class="blue--text body-1"
          style="cursor: pointer;"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon
            left
            color="blue"
          >
            {{ fileIcon }}
          </v-icon>
          <slot name="title">{{ name }}</slot>
        </span>
      </template>
      <span>
        Click to view
      </span>
    </v-tooltip>
    <v-spacer />
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          small
          v-bind="attrs"
          v-on="on"
          @click="download"
        >
          <v-icon class="blue--text">
            mdi-download
          </v-icon>
        </v-btn>
      </template>
      <span>
        Download
      </span>
    </v-tooltip>
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          v-if="hasEditAccess"
          icon
          small
          v-bind="attrs"
          v-on="on"
          @click="remove"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <span>
        Remove
      </span>
    </v-tooltip>
    <v-tooltip top>
      <template #activator="{ on, attrs }">
        <v-btn
          v-if="hasEditAccess"
          icon
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-arrow-up-down
          </v-icon>
        </v-btn>
      </template>
      <span>
        Move
      </span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from 'axios'

  export default Vue.extend({
    name: 'File',
    props: {
      hasEditAccess: {
        type: Boolean,
        required: true,
      },
      fileId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
    },
    data () {
      return {

      }
    },
    computed: {
      fileIcon (): string {
        let icon = ''
        if (this.type === 'Image') {
          icon = 'mdi-file-image'
        } else if (this.type === 'Video') {
          icon = 'mdi-video'
        } else {
          icon = 'mdi-file'
        }

        return icon
      },
    },
    methods: {
      forceFileDownload (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.name) // or any other extension
        document.body.appendChild(link)
        link.click()
      },
      download (): void {
        axios({
          method: 'get',
          url: this.link,
          responseType: 'arraybuffer',
        })
          .then(response => {
            this.forceFileDownload(response)
          })
          .catch(() => console.log('error occured'))

        // window.open(this.link, '_blank')
      },
      remove (): void {
        this.$emit('on-remove', this.fileId, this.name)
      },
    },
  })
</script>

<style scoped>

</style>
