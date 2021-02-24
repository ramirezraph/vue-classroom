<template>
  <v-list-item>
    <div
      v-if="user.userType === 'Student'"
    >
      <v-checkbox
        class="
      ml-3"
      />
    </div>
    <v-list-item-avatar class="mr-3">
      <v-img
        :src="user.profile"
      />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ fullName }}
      </v-list-item-title>
    </v-list-item-content>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          text
          v-bind="attrs"
          class="ml-5"
          v-on="on"
        >
          <v-icon>
            mdi-email-outline
          </v-icon>
        </v-btn>
      </template>
      <span>Send an Email</span>
    </v-tooltip>
    <v-tooltip
      v-if="hasEditAccess"
      bottom
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            mdi-account-details-outline
          </v-icon>
        </v-btn>
      </template>
      <span>View Info</span>
    </v-tooltip><v-tooltip
      v-if="showHideRemoveBtn"
      bottom
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          text
          v-bind="attrs"
          class="mr-2"
          v-on="on"
          @click="removePerson"
        >
          <v-icon>
            mdi-account-remove-outline
          </v-icon>
        </v-btn>
      </template>
      <span>Remove</span>
    </v-tooltip>
  </v-list-item>
</template>

<script lang="ts">
  import { User } from '@/model/User'
  import Vue, { PropType } from 'vue'
  export default Vue.extend({
    name: 'PeopleItem',
    props: {
      user: {
        type: Object as PropType<User>,
        required: true,
      },
      hasEditAccess: {
        type: Boolean,
        required: false,
        default: false,
      },
      isClassOwner: {
        type: Boolean,
        required: false,
        default: false,
      },
      ownerId: {
        type: String,
        required: true,
      },
    },
    data () {
      return {

      }
    },
    computed: {
      fullName (): string {
        return `${this.user.firstName} ${this.middleInitial} ${this.user.lastName}`
      },
      middleInitial (): string {
        const midName: string[] = this.user.middleName.split(' ')
        let middleInitial = ''
        for (let i = 0; i < midName.length; i++) {
          middleInitial += midName[i].substring(0, 1) + '.'
        }

        return middleInitial
      },
      showHideRemoveBtn (): boolean {
        if (this.user.id === this.ownerId) {
          return false
        }

        if (this.user.userType === 'Teacher') {
          return this.isClassOwner
        } else {
          if (this.user.userType === 'Student') {
            return this.hasEditAccess
          }
        }
        return true
      },
    },
    methods: {
      removePerson (): void {
        this.$emit('remove-person', this.user.id, this.user.fullName)
      },
    },
  })
</script>
