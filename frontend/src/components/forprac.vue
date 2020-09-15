
<template>
  <div>
    <v-card v-for="(item, num) in panels" :key="num">
      <v-list :flat="settings.flat" class="py-0">
        <v-list-group :value="settings.value" :ripple="settings.ripple" :disabled="listDisable">
          <template v-slot:activator>
            <v-list-item-content class="pl-5 py-3" justify="center" align="start">
              <v-row align="center" no-gutters>
                <v-icon small>fas fa-book</v-icon>
                <v-col class="ml-5" cols="3">
                  <v-list-item-title v-text="item.panelTitle" class="title_font"></v-list-item-title>
                </v-col>

                <v-spacer></v-spacer>
              </v-row>
            </v-list-item-content>
          </template>

          <v-list-item class="py-1">
            <pane>
              <component class="white--text" :is="item.componentName" :user_data="user_data"></component>
            </pane>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
import { Splitpanes, Pane } from "splitpanes";

export default {
  components: {
    Splitpanes,
    Pane,
    AssignTree: () => import("@/components/Editor/Side_AssignTree"),
    Explain: () => import("@/components/Editor/Side_explain"),

    LectureTree: () => import("@/components/Editor/Side_LectureTree"),
  },
  props: ["user_data"],
  data: () => ({
    listDisable: false,
    settings: {
      value: null,
      flat: true,
      ripple: true,
    },

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
