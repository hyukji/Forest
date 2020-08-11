<template>
  <div class="wrap">
    <v-tabs v-model="selectedtab" grow>
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
          <v-btn class="mr-1" icon>
            <v-icon small color="primary">{{ el.icon }}</v-icon>
          </v-btn>
          <v-row>
            <v-col>
              <v-text>{{ el.tab_title }}</v-text>
            </v-col>

            <v-btn class="my-1" icon @click="removeTab(i)">
              <v-icon small color="primary">fal fa-times</v-icon>
            </v-btn>
          </v-row>
        </v-tab>
      </draggable>

      <v-tabs-items v-model="selectedtab">
        <v-tab-item
          v-for="(el, i) in element"
          :key="el"
          :value="'tabs-L' + index + '-P' + i"
        >
          <WindowTeminal
            v-if="el.tab_title == 'WindowTeminal' && el._id == 0"
            :savedcode="el.data"
          ></WindowTeminal>
          <WindowCode v-else :savedcode="el.data"></WindowCode>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes"
import draggable from "vuedraggable"
import { eventBus } from "@/main.js"

export default {
  components: {
    draggable,
    Splitpanes,
    Pane,
    Drawer: () => import("@/components/Editor/Drawer"),
    SideTab: () => import("@/components/Editor/SideTab"),
    SideContent: () => import("@/components/Editor/SideContent"),
    WindowCode: () => import("../NewEditor/newWindowCode"),

    WindowTeminal: () => import("../NewEditor/newWindowTerminal"),
  },
  props: ["index"],
  data() {
    return {
      allSelected: null,
      selectedtab: null,
      element: null,
    }
  },
  computed: {},
  watch: {
    selectedtab(val) {
      this.$store.state.selectedTab[this.index] = this.selectedtab
    },
    element(val) {
      this.$store.state.nowTab[this.index] = this.element
    },
  },
  methods: {
    removeTab(i) {
      this.element.splice(i, 1)
    },
  },
  created() {
    this.element = this.$store.state.nowTab[this.index]
    eventBus.$on("selectedTab", (selectedTab) => {
      this.selectedtab = selectedTab[this.index]
    })
  },
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
</style>
