<template>
  <div>
    <v-expansion-panels multiple accordion tile>
      <v-expansion-panel v-for="(item, i) in panels" :key="i">
        <v-expansion-panel-header color="#252526" class="white--text">
          {{ item.panelTitle }}
          <template v-slot:actions>
            <v-icon color="white" size="13pt">$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content color="#252526">
          <component class="white--text" :is="item.componentName"></component>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  components: {
    AssignTree: () => import("@/components/Editor/Side_AssignTree"),
    Explain: () => import("@/components/Editor/Side_explain"),

    LectureTree: () => import("@/components/Editor/Side_LectureTree"),
  },
  data: () => ({
    panels: [
      { panelTitle: "Lectures", componentName: "LectureTree" },
      { panelTitle: "Assignments", componentName: "AssignTree" },
      { panelTitle: "Explain", componentName: "Explain" },
    ],
  }),
}
</script>

<style scoped>
v-expansion-panel {
  color: white;
}
</style>
