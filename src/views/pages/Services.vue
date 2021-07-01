<template>
  <v-container
    id="pricing"
    class="fill-height justify-center"
    tag="section"
  />
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesPricing',

    components: {
      PagesHeading: () => import('./components/Heading.vue'),
      PagesPlanCard: () => import('./components/PlanCard.vue'),
    },

    data: () => ({
    }),
  })
</script>
