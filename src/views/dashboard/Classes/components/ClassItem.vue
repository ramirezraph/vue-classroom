<template>
  <v-card
    min-width="700"
    min-height="257"
    max-width="700"
    max-height="257"
    class="classes mr-4"
    color="green lighten-1"
    hover
  >
    <v-img
      src="../../../../assets/class-image-sample.jpg"
      max-height="257"
      class="pa-6"
    >
      <v-card-title
        class="classes-title white--text headline"
      >
        Software Design
      </v-card-title>
      <v-card-text
        class="white--text caption"
      >
        <p>Lorem ipsum dolor sit amet.</p>
      </v-card-text>
      <v-card-text
        class="white--text caption mt-12 pa-6"
      >
        <v-row>
          <h2 class="text-h2">
            CPE305
          </h2>
          <v-spacer />
          <v-chip
            class="ma-2 px-6"
          >
            <v-avatar left>
              <v-icon>mdi-teach</v-icon>
            </v-avatar>
            John Doe
          </v-chip>
        </v-row>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script>
  export default {
    name: 'ClassItem',
    props: {
      name: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>
