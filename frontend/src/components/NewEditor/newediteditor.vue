<template>
  <div>
    <v-tabs>
      <draggable class="v-tab" :clone="clone" v-model="element" group="tabgroup">
        <v-tab
          v-for="(el) in element"
          :key="el"
          :href="'#tabs-' + el.tab_title"
          class="primary--text"
        >
          <v-text>{{el.tab_title}}</v-text>
        </v-tab>
      </draggable>

      <v-tab-item v-for="(el) in element" :key="el" :value="'tabs-'+ el.tab_title">
        <v-card flat>
          <v-card-text>{{el.data}}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
    Splitpanes,
    Pane,
    Drawer: () => import("@/components/Editor/Drawer"),
    SideTab: () => import("@/components/Editor/SideTab"),
    SideContent: () => import("@/components/Editor/SideContent"),
  },
  data() {
    return {
      drawer: {
        open: false,
        selected: null,
        on: [],
        // live or sandbox
      },
      tabs: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },

  props: ["element"],
  watch: {
    "selectedTab.keys": {
      deep: true,
      handler: function (newVal) {
        console.log("tab change");
        newVal.forEach((item, i) => {
          //check all ele in newVal
          if (item != null) {
            var tab = this.getTab(item);
            var pos = tab.pos;
            this.selectedTab["tab" + `${pos}`].type = tab.type;
            this.selectedTab["tab" + `${pos}`].data = tab.data;
            this.selectedTab["tab" + `${pos}`].selected = tab.selected;
          }
        });
      },
    },
  },
  method: {
    removeTab(tab, index) {
      console.log("removeSpecial", this.drawer.on);
      if (tab.key == "Live" && this.drawer.on.includes(tab.key)) {
        this.drawer.on.splice(this.drawer.on.indexOf("Live"), 1);
      } else if (tab.key == "Sandbox" && this.drawer.on.includes(tab.key)) {
        this.drawer.on.splice(this.drawer.on.indexOf("Sandbox"), 1);
      } else {
      }
    },
    paneResize() {
      this.$refs.tab1.doLayout();
      this.$refs.tab2.doLayout();
      //this.$refs.tab3.doLayout()
      //this.$refs.tab4.doLayout()
    },
    clickTab(tab, pos) {
      var copy = JSON.parse(JSON.stringify(this.selectedTab.keys));
      copy[pos] = tab.key;
      this.selectedTab.keys = copy;
    },
    getTab(key) {
      for (var list in this.tabs) {
        list = this.tabs[list];
        for (var ele in list) {
          if (list[ele].key == key) {
            return list[ele];
          }
        }
      }
    },
    click() {},
    changeTab(action, key) {
      //request from sideTab
      console.log(action, key);
      if (action == "add") {
        let tab = {
          label: key,
          key: key,
          type: "WindowCode",
          data: "hi " + key,
          pos: 1,
        };
        this.$refs.tab1.addTab(tab);
        this.clickTab(tab, 0);
      } else if (action == "remove") {
        this.$refs.tab1.removeTab(key);
      }
    },
  },
};
</script>
