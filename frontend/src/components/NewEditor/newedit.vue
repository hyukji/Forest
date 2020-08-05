<template>
  <v-card>
    <v-toolbar flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Contact Database</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <splitpanes class="default-theme">
      <pane v-for="element in tabeditor" :key="element.id">
        <newediteditor :element="element"></newediteditor>
      </pane>
    </splitpanes>
  </v-card>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";

export default {
  components: {
    Splitpanes,
    Pane,
    newediteditor: () => import("@/components/NewEditor/newediteditor"),
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
      tabeditor: [
        [
          {
            icon: "mdi-phone",
            tab_title: "L2 P1",
            data: "print(21)",
          },
          {
            icon: "mdi-heart",
            tab_title: "L2 P2",
            data: "print(22)",
          },
          {
            icon: "mdi-account-box",
            tab_title: "L2 P3",
            data: "print(23)",
          },
        ],
        [
          {
            icon: "mdi-phone",
            tab_title: "L3 P1",
            data: "print(31)",
          },
          {
            icon: "mdi-heart",
            tab_title: "L3 P2",
            data: "print(32)",
          },
          {
            icon: "mdi-account-box",
            tab_title: "L3 P3",
            data: "print(33)",
          },
        ],
      ],
    };
  },
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
