<template>
  <a>ddd</a>
</template>
<script>
import draggable from "vuedraggable"
export default {
  name: "v-tabs",
  components: {
    draggable,
  },
  methods: {},
  data() {
    return {
      active: 0,
      tabs: [
        {
          id: 1,
          name: "1st Tab",
          text: "This is a 1st tab",
        },
        {
          id: 2,
          name: "2nd Tab",
          text: "This is a 2nd tab",
        },
        {
          id: 3,
          name: "3rd Tab",
          text: "This is a 3rd tab",
        },
      ],
    }
  },
}
</script>
