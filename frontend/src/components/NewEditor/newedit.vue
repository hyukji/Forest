<template>
  <div class="wrap">
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
    </v-card>

    <v-row no-gutters class="wrap">
      <SideTab :drawer="drawer" />

      <splitpanes id="splitpane" class="default-theme">
        <pane v-if="drawer.open" size="20">
          <side-content :selected="drawer.selected" />
        </pane>

        <pane v-for="(element, index) in tabeditor" :key="element.id">
          <newediteditor :index="index"></newediteditor>
        </pane>
      </splitpanes>
    </v-row>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import { eventBus } from "@/main.js";

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
      loading: true,
      drawer: {
        open: true,
        selected: "Tree",
        on: [],
        // live or sandbox
      },
      tabeditor: null,
    };
  },
  method: {
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
  created() {
    this.tabeditor = this.$store.state.nowTab;
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#splitpane {
  position: absolute;
  left: 56px;
  padding-right: 56px;
  height: 100%;
}

.pane {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tab {
  display: block;
}
</style>
