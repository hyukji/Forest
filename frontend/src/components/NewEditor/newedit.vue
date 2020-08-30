<template>
  <div class="wrap">
    <v-card tile flat>
      <v-toolbar flat dense color="#3B3B3C">
        <v-app-bar-nav-icon color="primary">
          <v-icon class="pl-1" size="15pt">fas fa-seedling</v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title class="pl-0">
          <div class="tabfont--text">Forest_Studio</div>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon class="tabfont--text">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon class="tabfont--text">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>

    <v-row no-gutters class="wrap">
      <SideTab :drawer="drawer" />

      <splitpanes vertical>
        <pane v-if="drawer.open" size="20" min-size="15">
          <side-content :selected="drawer.selected" />
        </pane>

        <pane v-for="(element, index) in tabeditor" :key="element.id" min-size="15">
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
        selected: "MainList",
        on: [],
        // live or sandbox
      },
      tabeditor: null,
    };
  },
  method: {},
  created() {
    var openWindow_id = window.my_special_setting;

    if (openWindow_id) {
      this.$store.commit("StartTab", openWindow_id);
    }

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
</style>


<style>
.splitpanes {
  position: absolute;
  left: 56px;
  padding-right: 56px;
  height: 100%;
}

.splitpanes__pane {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.splitpanes__splitter {
  background-color: #333333;
  position: relative;
}
.splitpanes__splitter:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.4s;
  background-color: rgba(195, 195, 195, 0.9);
  opacity: 0;
  z-index: 1;
}
.splitpanes__splitter:hover:before {
  opacity: 0;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -6px;
  right: -6px;
  height: 100%;
}
</style>
