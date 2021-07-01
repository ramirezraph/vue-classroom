<template>
  <v-card class="mt-0 px-5">
    <v-card-text>
      <base-subheading subheading="General">
        <p class="grey--text body-2 font-weight-light">
          More Information here
        </p>
      </base-subheading>

      <base-subheading
        subheading="Alerts & Notifications"
      >
        <p class="subtitle-2 mt-3">
          What notifications you receive
        </p>
        <v-expansion-panels
          class="mt-3"
        >
          <v-expansion-panel
            v-for="(notification, index) in notificationsSettings"
            :key="index"
          >
            <v-expansion-panel-header>
              <div>
                <v-icon
                  left
                  v-text="notification.icon"
                />
                <span>{{ notification.title }}</span>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p class="caption">
                {{ notification.description }}
              </p>
              <v-list>
                <h6 class="text-body-2 font-weight-bold">
                  Where you receive these notifications
                </h6>
                <v-list-item-group
                  multiple
                  color="primary"
                  class="mt-3"
                >
                  <v-list-item
                    v-for="(item, i) in notificationSettingsItems"
                    :key="i"
                  >
                    <template #default="{ active }">
                      <v-list-item-icon>
                        <v-icon v-text="item.icon" />
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title v-text="item.text" />
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="primary"
                        />
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <p class="subtitle-2 mt-6">
          How you receive notifications
        </p>
        <v-expansion-panels class="mt-3">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div>
                <v-icon
                  left
                >
                  mdi-monitor-dashboard
                </v-icon>
                <span>
                  Browser
                </span>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <p class="subtitle-2">
                  Push notifications.
                </p>
                <v-list-item-group
                  multiple
                  color="primary"
                  class="py-0 my-0"
                >
                  <v-list-item>
                    <template #default="{ active }">
                      <v-list-item-icon>
                        <v-icon>mdi-bell-outline</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>
                          Mute push notifications.
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="primary"
                        />
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template #default="{ active }">
                      <v-list-item-icon>
                        <v-icon>mdi-volume-high</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>
                          Play a sound when you receive a notification.
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          color="primary"
                        />
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div>
                <v-icon
                  left
                >
                  mdi-email-outline
                </v-icon>
                <span>
                  Email
                </span>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p class="subtitle-2 align-content-center">
                Email Account
              </p>
              <div class="d-flex mt-3">
                <v-icon
                  color="primary"
                  size="32"
                >
                  mdi-email
                </v-icon>
                <p class="subtitle-1 ma-0 pa-0 ml-3 mt-1">
                  sample.email@gmail.com
                </p>
              </div>
              <v-btn
                class="mt-6 text-none"
                color="info"
                dense
              >
                Update Email Address
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div>
                <v-icon
                  left
                >
                  mdi-cellphone
                </v-icon>
                <span>
                  SMS
                </span>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p class="subtitle-2 align-content-center">
                Phone Number
              </p>
              <div class="d-flex mt-3">
                <v-icon
                  color="primary"
                  size="32"
                >
                  mdi-cellphone
                </v-icon>
                <p class="subtitle-1 ma-0 pa-0 ml-3 mt-1">
                  +63 995 002 9934
                </p>
              </div>
              <v-btn
                class="mt-6 text-none"
                color="info"
                dense
              >
                Update Phone Number
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </base-subheading>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'SettingsGeneral',
    data () {
      return {
        notificationsSettings: [
          {
            title: 'Posts',
            icon: 'mdi-text-box-outline',
            description: 'These are notifications for when teacher post in a class.',
          },
          {
            title: 'Comments',
            icon: 'mdi-comment-outline',
            description: 'These are notifications for comments on your posts and replies to your comments.',
          },
          {
            title: 'Tags',
            icon: 'mdi-tag-outline',
            description: 'These are notifications for when someone tags you in a comment or post',
          },
          {
            title: 'Class Invites',
            icon: 'mdi-account-multiple-plus-outline',
            description: 'These are notifications for when someone invites you to join a class.',
          },
          {
            title: 'Class Materials',
            icon: 'mdi-calendar-check-outline',
            description: 'These are notifications for when your teacher uploads new class material.',
          },
          {
            title: 'Classworks',
            icon: 'mdi-file-multiple-outline',
            description: 'These are notifications to inform or remind you about assignments, activities, quizzes, etc.',
          },
          {
            title: 'Meetings',
            icon: 'mdi-video-outline',
            description: 'These are notifications to inform or remind you about class meetings.',
          },
          {
            title: 'Birthdays',
            icon: 'mdi-cake',
            description: 'These are notifications about your teachers\' or classmates\' birthdays.',
          },
        ],
        notificationSettingsItems: [
          {
            icon: 'mdi-monitor-dashboard',
            text: 'Push',
          },
          {
            icon: 'mdi-email-outline',
            text: 'Email',
          },
          {
            icon: 'mdi-cellphone',
            text: 'SMS',
          },
        ],
      }
    },
  })
</script>

<style scoped>

</style>
