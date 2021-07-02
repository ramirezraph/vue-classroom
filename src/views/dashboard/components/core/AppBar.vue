<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 250px;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        #append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
      active-class="no-active-style"
    >
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
      :close-on-content-click="false"
    >
      <template #activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
          @click="readNotifications()"
        >
          <v-badge
            color="red"
            overlap
            bordered
            :value="unreadNotifications > 0"
          >
            <template
              #badge
            >
              <span>{{ unreadNotifications }}</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <v-card
          flat
          class="my-0"
          width="400"
          max-height="700"
          scrollable
        >
          <v-card-title class="d-flex full-width align-center">
            <span class="subtitle-1">Earlier</span>
            <v-spacer />
            <v-btn
              dense
              class="ma-0 pa-0 primary--text text-right"
              text
            >
              View All
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text class="ma-0 pa-0">
            <div v-if="notifications.length > 0">
              <notification
                v-for="(notif, index) in notifications"
                :key="index"
                :notification="notif"
              />
            </div>
            <div
              v-else
              class="pa-3"
            >
              <span class="caption grey--text">
                There are no notifications.
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-list>
    </v-menu>

    <v-menu
      bottom
      left
      min-width="200"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template #activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        flat
        nav
      >
        <app-bar-item
          v-for="(p, i) in profile"
          :key="`item-${i}`"
          :to="p.route"
        >
          <v-list-item-title v-text="p.title" />
        </app-bar-item>
        <v-divider class="mb-2 mt-2" />
        <app-bar-item>
          <v-list-item
            class="ma-0 pa-0"
            @click="signOut"
          >
            <v-list-item-title>
              Sign out
            </v-list-item-title>
          </v-list-item>
        </app-bar-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
  import { firebaseAuth, notificationsCollection } from '@/fb'
  import Vue from 'vue'
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapGetters, mapMutations } from 'vuex'
  import Notification from '../component/Notification.vue'

  // eslint-disable-next-line no-undef
  import { UserNotification } from '@/model/UserNotification'
  import { User } from '@/model/User'

  export default Vue.extend({
    name: 'DashboardCoreAppBar',
    components: {
      Notification,
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        profile: [
          { title: 'Profile', route: '/settings/account' },
          { title: 'Settings', route: '/settings/general' },

        ],
        notificationMenu: false,
      }
    },

    computed: {
      ...mapGetters(['drawer']),
      notifications (): UserNotification[] {
        return this.$store.getters['user/getNotifications']
      },
      unreadNotifications (): number {
        return this.notifications.filter(n => n.read === false).length
      },

    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      signOut (): void {
        firebaseAuth.signOut().then(() => {
          this.$store.dispatch('user/userSignOut')
          this.$router.replace({ name: 'Login' })
        })
      },
      readNotifications (): void {
        this.notificationMenu = true
        const currentUser: User = this.$store.getters['user/getCurrentUser']
        this.$store.dispatch('user/fetchNotifications')

        if (this.unreadNotifications <= 0) return

        if (currentUser) {
          console.log('update read notif')
          notificationsCollection.doc(currentUser.id).collection('items').get().then(snapshot => {
            snapshot.forEach(notification => {
              // update all notification to read
              notificationsCollection.doc(currentUser.id).collection('items').doc(notification.id).set({
                read: true,
              }, { merge: true })
            })
          })
        }
      },
    },
  })
</script>

<style lang="scss" scoped>
  .no-active-style.v-btn--active {
    &::before {
      opacity: 0;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: $color-primary;
  }
</style>
