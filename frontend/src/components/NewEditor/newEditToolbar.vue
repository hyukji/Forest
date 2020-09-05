<template>
  <v-card tile>
    <v-toolbar dense color="#3B3B3C">
      <v-app-bar-nav-icon color="primary">
        <v-icon class="pl-1" size="15pt">fas fa-seedling</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="pl-0">
        <div class="tabfont--text">Forest_Studio</div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon class="tabfont--text">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon class="tabfont--text">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
  components: {},
  data() {
    return {};
  },
  method: {},
  watch: {},
  created() {},
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
</style>


<style>
</style>
