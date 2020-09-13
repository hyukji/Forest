<template>
  <v-card tile class="wrap">
    <v-row color="#3B3B3C" no-gutters class="wrap" align="center">
      <v-col>
        <v-row no-gutters>
          <v-icon class="pl-4" size="16pt" color="primary">fas fa-seedling</v-icon>
          <div class="tabfont--text pl-2 bar_title">Forest_Studio</div>
        </v-row>
      </v-col>

      <v-spacer></v-spacer>

      <v-col>
        <v-row no-gutters justify="end" class="pr-3">
          <v-btn icon class="tabfont--text">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon class="tabfont--text">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
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
  background-color: #3b3b3c;
}
.bar_title {
  font-size: 1.2rem;
}
</style>


<style>
</style>
