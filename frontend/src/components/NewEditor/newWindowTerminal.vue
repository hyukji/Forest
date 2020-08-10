<template>
  <div class="wrap">
    <v-row no-gutters>
      <v-btn color="primary" class="ma-2" @click>Run</v-btn>
    </v-row>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd;
}
</style>
