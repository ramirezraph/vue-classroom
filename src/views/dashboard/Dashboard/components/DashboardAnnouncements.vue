<template>
  <base-material-card
    color="blue"
    title="Announcements"
  >
    <v-card-text>
      <base-material-tabs color="blue lighten-2">
        <v-tab
          v-for="(tab, i) in tabs"
          :key="i"
        >
          {{ tab }}
        </v-tab>

        <v-tab-item>
          <v-card
            flat
            class="my-0"
          >
            <div
              v-for="item in announce"
              :key="item.day"
            >
              <v-list-item class="pa-0">
                <v-card-text>
                  <p class="display-1 red--text">
                    {{ item.topic }}
                  </p>
                  <small>
                    {{ item.notes }}
                  </small>
                </v-card-text>

                <v-list-item-subtitle class="text-right">
                  <v-chip
                    class="ma-2"
                    color="red"
                    text-color="white"
                  >
                    {{ item.date }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
              <v-divider />
            </div>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card
            flat
            class="my-0"
          >
            <v-card-text>
              <p>
                Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
              </p>

              <div>
                Dynamically innovate resource-leveling customer service for state of the art customer service.
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card
            flat
            class="my-0"
          >
            <v-card-text>
              <p>
                Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.
              </p>

              <div>
                Dynamically innovate resource-leveling customer service for state of the art customer service.
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </base-material-tabs>
    </v-card-text>
  </base-material-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Announcements',
    data () {
      return {
        tabs: [
          'School',
          'Classes',
          'Department',
        ],
        announce: [
          { topic: 'Parent Teacher Meet', notes: 'Calling the attention of parent and teachers', date: '13 Dec' },
          { topic: 'Changes in School Calendar', notes: 'Lorem ipsum dolmet consectetur.', date: '11 Nov' },
          { topic: 'Announcement to Freshmen Students', notes: 'Lorem ipsum dolor.', date: '3 Jan' },
          { topic: 'Development Webinars for Faculty', notes: 'Lorem ipsum dolmet consectetur.', date: '2 Jan' },
        ],
      }
    },
  })
</script>

<style scoped>

</style>
