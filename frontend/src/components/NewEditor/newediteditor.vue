<template>
  <div class="wrap">
    <v-row class="wrap" no-gutters>
      <v-col>
        <v-tabs
          dark
          color="#3d6039"
          grow
          v-model="selectedtab"
          class="wrap px-0"
          background-color="#252526"
          :hide-slider="false"
        >
          <draggable
            class="v-tab px-0 wrap"
            :clone="clone"
            v-model="element"
            group="tabgroup"
            :move="checkMove"
          >
            <v-tab
              v-for="(el, i) in element"
              :key="el"
              :href="'#tabs-L' + index + '-P' + i"
              class="tab_border tabBack tabfont--text px-0"
              @click="doThat"
              :ripple="false"
            >
              <v-row no-gutters justify="center" align="center">
                <v-col class="pl-3" md="auto">
                  <v-btn icon>
                    <v-icon small color="secondary">{{ el.icon }}</v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-text>{{ el.tab_title }}</v-text>
                </v-col>
                <v-col class="pr-3" md="auto" @click="removeTab(i)">
                  <v-btn class="my-1" icon>
                    <v-icon small color="tabfont">fal fa-times</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-tab>
          </draggable>

          <v-tabs-items v-model="selectedtab" class="wrap">
            <v-tab-item
              class="wrap"
              v-for="(el, i) in element"
              :key="el"
              :value="'tabs-L' + index + '-P' + i"
            >
              <WindowTerminal
                v-if="el.tab_title == 'WindowTerminal' && el._id == 0"
                :savedcode="el.data"
              ></WindowTerminal>
              <WindowCode v-else :tabitem="el"></WindowCode>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-col>
      <v-col md="auto" class="extra_editor">
        <v-tabs background-color="#252526" vertical>
          <v-btn icon class="ma-1">
            <v-icon size="16pt" color="tabfont">fal fa-columns</v-icon>
          </v-btn>
          <v-btn icon class="ma-1">
            <v-icon size="16pt" color="tabfont">fal fa-align-slash</v-icon>
          </v-btn>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import draggable from "vuedraggable";
import { eventBus } from "@/main.js";

export default {
  components: {
    draggable,
    Splitpanes,
    Pane,
    Drawer: () => import("@/components/Editor/Drawer"),
    SideTab: () => import("@/components/Editor/SideTab"),
    SideContent: () => import("@/components/Editor/SideContent"),
    WindowCode: () => import("../NewEditor/newWindowCode"),

    WindowTerminal: () => import("../NewEditor/newWindowTerminal"),
  },
  props: ["index"],
  data() {
    return {
      more: ["News", "Maps", "Books", "Flights", "Apps"],
      allSelected: null,
      selectedtab: null,
      element: null,
    };
  },
  computed: {
    backcolor() {
      return "tabBack";
    },
  },
  watch: {
    selectedtab(val) {
      this.$store.commit("ChangeSelectedTab", {
        selected: this.selectedtab,
        idx: this.index,
      });
      // console.log("selectedtab", this.selectedtab);
      //this.$store.state.selectedTab[this.index] = this.selectedtab
    },
    element(val) {
      console.log("console nowtab", this.element);
      this.$store.commit("ChangeNowTab", { el: this.element, idx: this.index });

      //this.$store.state.nowTab[this.index] = this.element
    },
  },
  methods: {
    doThat: function (evt) {
      //console.log("mouse", evt);
    },
    checkMove: function (evt) {
      //console.log("move go", evt.to, evt.related);
    },
    removeTab(i) {
      this.element.splice(i, 1);
      console.log("it is stroe tab ", this.$store.state.nowTab[this.index]);
    },
  },
  created() {
    this.element = this.$store.state.nowTab[this.index];
    eventBus.$on("selectedTab", (selectedTab) => {
      this.selectedtab = selectedTab[this.index];
    });
  },
};
</script>

<style scoped>
.wrap-width {
  width: 100%;
}
.wrap {
  height: 100%;
}
.tab_border {
  margin-left: 1pt;
}
.extra_editor {
  background-color: #1d1f21;
}
</style>
