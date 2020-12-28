<template>
  <base-item-group
    :item="item"
    text
    sub-group
  />
</template>

<script>
  export default {
    name: 'ItemSubGroup',

    props: {
      item: {
        type: Object,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        default: () => ({
          avatar: undefined,
          group: undefined,
          title: undefined,
          children: [],
        }),
      },
    },
  }
</script>
