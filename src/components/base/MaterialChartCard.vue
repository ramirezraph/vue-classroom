<template>
  <base-material-card
    class="v-card--material-chart"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #heading>
      <chartist
        :data="data"
        :event-handlers="eventHandlers"
        :options="options"
        :ratio="ratio"
        :responsive-options="responsiveOptions"
        :type="type"
        style="max-height: 150px;"
      />
    </template>

    <slot
      slot="reveal-actions"
      name="reveal-actions"
    />

    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </base-material-card>
</template>

<script>
  export default {
    name: 'MaterialChartCard',

    inheritAttrs: false,

    props: {
      data: {
        type: Object,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        default: () => ({}),
      },
      eventHandlers: {
        type: Array,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        default: () => ([]),
      },
      options: {
        type: Object,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        default: () => ({}),
      },
      ratio: {
        type: String,
        default: undefined,
      },
      responsiveOptions: {
        type: Array,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        default: () => ([]),
      },
      type: {
        type: String,
        required: true,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        validator: v => ['Bar', 'Line', 'Pie'].includes(v),
      },
    },
  }
</script>

<style lang="sass">
  .v-card--material-chart
    p
      color: #999

    .v-card--material__heading
      max-height: 185px

      .ct-label
        color: inherit
        opacity: .7
        font-size: 0.975rem
        font-weight: 100

      .ct-grid
        stroke: rgba(255, 255, 255, 0.2)

      .ct-series-a .ct-point,
      .ct-series-a .ct-line,
      .ct-series-a .ct-bar,
      .ct-series-a .ct-slice-donut
          stroke: rgba(255,255,255,.8)

      .ct-series-a .ct-slice-pie,
      .ct-series-a .ct-area
          fill: rgba(255,255,255,.4)
</style>
