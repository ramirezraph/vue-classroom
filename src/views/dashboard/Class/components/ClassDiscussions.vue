<template>
  <div
    id="discussions"
    class="mt-n8"
  >
    <v-card
      class="px-6 pb-3 pt-1"
      elevation="2"
    >
      <v-card
        outlined
      >
        <v-card-title class="caption pa-2 pl-4">
          Post a message
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-textarea
            label="Type your message here"
            outlined
            color="blue"
          />
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                outlined
                depressed
                tile
                class="mr-2"
                color="black"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-file-plus
                </v-icon>
              </v-btn>
            </template>
            <span>
              Insert a file
            </span>
          </v-tooltip>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                outlined
                depressed
                tile
                class="mr-2"
                color="black"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-link-plus
                </v-icon>
              </v-btn>
            </template>
            <span>
              Insert a link
            </span>
          </v-tooltip>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card
      color="transparent"
      flat
      class="mt-6"
    >
      <v-card-title class="caption">
        <v-icon left>
          mdi-clock-time-four-outline
        </v-icon>
        Recent Discussions
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
    #discussions {
        background-color: #eeeeee;
    }
</style>
