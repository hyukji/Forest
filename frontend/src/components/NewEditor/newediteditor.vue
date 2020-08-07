<template>
  <div class="wrap">
    <v-tabs class="wrap" grow min-width>
      <draggable
        class="v-tab"
        :clone="clone"
        v-model="element"
        group="tabgroup"
      >
        <v-tab
          v-for="(el, i) in element"
          :key="el"
          :href="'#tabs-L' + index + '-P' + i"
          class="primary--text"
        >
          <v-text>
            {{ el.tab_title }}
          </v-text>
          <v-icon>fad fa-times</v-icon>
        </v-tab>
      </draggable>

      <v-tab-item
        v-for="(el, i) in element"
        :key="el"
        :value="'tabs-L' + index + '-P' + i"
      >
        <WindowCode :savedcode="el.data"></WindowCode>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes"
import draggable from "vuedraggable"

export default {
  components: {
    draggable,
    Splitpanes,
    Pane,
    Drawer: () => import("@/components/Editor/Drawer"),
    SideTab: () => import("@/components/Editor/SideTab"),
    SideContent: () => import("@/components/Editor/SideContent"),
    WindowCode: () => import("../NewEditor/newWindowCode"),
  },
  model: {
    prop: "element",
  },
  props: ["element", "index"],
  data() {
    return {}
  },
  method: {
    removeTab(i) {},
  },
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
</style>
