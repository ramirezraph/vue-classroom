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
          BulSu Classroom
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          rounded
          small
          color="primary"
          class="mt-3 text-none text-h5 pa-3"
        >
          B
        </v-btn>
      </template>
    </v-list>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <base-item-group :item="profile" />
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
      <v-divider class="mb-2" />
      <template v-for="(item, i) in subjectsLinks">
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
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
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
      subjectsLinks: [
        {
          icon: 'mdi-notebook',
          title: 'CPE 301',
          to: '/cpe301',
        },
        {
          icon: 'mdi-notebook',
          title: 'CPE 301L',
          to: '/cpe301l',
        },
        {
          icon: 'mdi-notebook',
          title: 'CPE 303',
          to: '/cpe300',
        },
        {
          icon: 'mdi-notebook',
          title: 'CPE 300',
          to: '/cpe300',
        },
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      moduleLinks () {
        return this.items.map(this.mapItemLinks)
      },
      profile () {
        return {
          avatar: true,
          group: '',
          title: this.$t('avatar'),
          children: [
            {
              href: '',
              title: this.$t('my-profile'),
            },
            {
              to: '',
              title: this.$t('edit-profile'),
            },
            {
              to: '',
              title: this.$t('Sign Out'),
            },
          ],
        }
      },
    },

    watch: {
      '$vuetify.breakpoint.smAndDown' (val) {
        this.$emit('update:expandOnHover', !val)
      },
    },

    methods: {
      mapItemLinks (link) {
        return {
          ...link,
          children: link.children ? link.children.map(this.mapItemLinks) : undefined,
          title: this.$t(link.title),
        }
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
