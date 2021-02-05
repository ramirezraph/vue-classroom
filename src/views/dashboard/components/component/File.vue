<template>
  <div class="d-flex d-block">
    <span
      class="blue--text body-1"
      style="cursor: pointer;"
    >
      <v-icon
        left
        color="blue"
      >
        {{ fileIcon }}
      </v-icon>
      {{ name }}
    </span>
    <v-spacer />
    <v-btn
      icon
      small
    >
      <v-icon class="blue--text">
        mdi-download
      </v-icon>
    </v-btn>
    <v-btn
      v-if="hasEditAccess"
      icon
      small
    >
      <v-icon>
        mdi-delete
      </v-icon>
    </v-btn>
    <v-btn
      v-if="hasEditAccess"
      icon
      small
    >
      <v-icon>
        mdi-arrow-up-down
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
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
  })
</script>

<style scoped>

</style>
