<template>
  <div>
    <v-expansion-panels v-model="opendpanel" multiple accordion tile>
      <v-expansion-panel v-for="(item, i) in panels" :key="i">
        <v-expansion-panel-header color="#252526" class="white--text">
          {{ item.panelTitle }}
          <template v-slot:actions>
            <v-icon color="white" size="13pt">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content color="#252526">
          <component class="white--text" :is="item.componentName" :user_data="user_data"></component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
  components: {
    AssignTree: () => import("@/components/Editor/Side_AssignTree"),
    Explain: () => import("@/components/Editor/Side_explain"),

    LectureTree: () => import("@/components/Editor/Side_LectureTree"),
  },
  props: ["user_data"],
  data: () => ({
    opendpanel: [0, 1, 2],
    panels: [
      { panelTitle: "Lectures", componentName: "LectureTree" },
      { panelTitle: "Assignments", componentName: "AssignTree" },
      { panelTitle: "Explanation", componentName: "Explain" },
    ],
  }),

  created() {
    eventBus.$on("OpenExplain", (item, type) => {
      // if (this.opendpanel.find((num) => num == 2) == null) {
      //   this.opendpanel.push(2);
      // }
      if (!this.opendpanel.some((el) => el == 2)) {
        this.opendpanel.push(2);
      }
      const idx = this.opendpanel.indexOf(type);
      if (idx > -1) this.opendpanel.splice(idx, 1);
    });
  },
};
</script>

<style scoped>
v-expansion-panel {
  color: white;
}
</style>
