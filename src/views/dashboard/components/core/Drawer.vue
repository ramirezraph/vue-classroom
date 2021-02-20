<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    mini-variant-width="80"
    width="260"
    v-bind="$attrs"
  >
    <template #img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-list
      expand
      nav
    >
      <template v-if="!expandOnHover">
        <v-btn
          rounded
          color="primary"
          class="mt-3 text-none text-h5"
        >
          Klasse LMS
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          rounded
          small
          color="primary"
          class="mt-3 text-none text-h5 pa-3"
        >
          K
        </v-btn>
      </template>
    </v-list>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
      class="pa-2"
    >
      <base-item-group
        :item="profile"
      />
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <template v-for="(item, i) in moduleLinks">
        <base-item-group
          v-if="item.children"
          :key="i"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="i"
          :item="item"
        />
      </template>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <template v-for="(item, i) in drawerClassLinks">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
  import { mapState } from 'vuex'
  import { firebaseAuth } from '../../../../fb'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data () {
      return {
        items: [
          {
            icon: 'mdi-view-dashboard',
            title: 'dashboard',
            to: '/',
          },
          {
            icon: 'mdi-google-classroom',
            title: 'Classes',
            to: '/classes',
          },
          {
            icon: 'mdi-calendar-month',
            title: 'Calendar',
            to: '/calendar',
          },
        ],
      }
    },

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        get () {
          return this.$store.state.drawer
        },
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },

      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      drawerClassLinks () {
        const classes = this.$store.getters['classes/classes']
        const classLinks = []
        classes.map(c => {
          classLinks.push(
            {
              icon: 'mdi-notebook',
              title: c.code,
              to: `/classes/${c.id}`,
            },
          )
        })

        return classLinks
      },
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      moduleLinks () {
        return this.items.map(this.mapItemLinks)
      },
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      profile () {
        const currentUser = this.$store.getters['user/getCurrentUser']
        return {
          avatar: true,
          group: '',
          title: `${currentUser?.firstName} ${currentUser?.lastName}`,
          children: [
            {
              title: this.$t('my-profile'),
            },
            {
              title: this.$t('edit-profile'),
            },
            {
              title: this.$t('Sign Out'),
              onClick: this.signOut,
            },
          ],
        }
      },
    },

    watch: {
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      '$vuetify.breakpoint.smAndDown' (val) {
        this.$emit('update:expandOnHover', !val)
      },
    },

    methods: {
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      mapItemLinks (link) {
        return {
          ...link,
          children: link.children ? link.children.map(this.mapItemLinks) : undefined,
          title: this.$t(link.title),
        }
      },
      signOut () {
        firebaseAuth.signOut().then(() => {
          this.$store.dispatch('user/userSignOut')
          this.$router.replace({ name: 'Login' })
        })
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    &.v-navigation-drawer--mini-variant
      .v-list-item
        justify-content: flex-start !important

      .v-list-group--sub-group
        display: block !important

    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
