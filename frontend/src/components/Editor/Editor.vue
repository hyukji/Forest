<template>
  <div class="wrap">
    <div class="wrap_toolbar">
      <EditToolbar />
    </div>

    <v-row no-gutters class="wrap_pane">
      <SideTab :drawer="drawer" />
      <v-col>
        <splitpanes vertical class="wrap_splitpanes">
          <pane  v-if="drawer.open" size="25" min-size="15" max-size="50">
            <side-content :selected="drawer.selected" :user_data="user_data" />
          </pane>
          <pane>
            <splitpanes horizontal>
              <pane>
                <splitpanes>
                  <pane v-for="(element, index) in tabeditor" :key="index" min-size="15">
                    <NewEditorWindow :index="index" :element="element" :user_data="user_data"></NewEditorWindow>
                  </pane>
                </splitpanes>
              </pane>
              <pane size="25" min-size="15">
                <WindowTerminal></WindowTerminal>
              </pane>
            </splitpanes>
          </pane>
        </splitpanes>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { authentication } from "@/mixins/authentication";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css"
import { eventBus } from "@/main.js";

export default {
  components: {
    Splitpanes,
    Pane,
    EditToolbar: () => import("@/components/Editor/EditorHeader"),

    NewEditorWindow: () => import("@/components/Editor/NewEditorWindow"),
    EditorWindow: () => import("@/components/Editor/EditorWindow"),

    SideTab: () => import("@/components/Editor/Editor_Side/SideTab"),
    SideContent: () => import("@/components/Editor/Editor_Side/SideContent"),

    WindowTerminal: () => import("../Editor/WindowTerminal"),
  },
  data() {
    return {
      // height: calc(height),
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
  mixins: [authentication],
  method: {
    llog() {
      console.log("added");
    },
  },
  watch: {
    tabeditor(val) {
      console.log("tabeditor", val);
    },
  },
  created() {
    this.check_isauth(true);
    if (window.my_special_setting) {
      this.$store.commit("StartTab", window.my_special_setting);
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
.wrap_toolbar {
  width: 100%;
  height: 5%;
  margin: 0;
  padding: 0;
}
.wrap_pane {
  width: 100%;
  height: 95%;
  margin: 0;
  padding: 0;
}
</style>

<style>
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
  left: -3px;
  right: -7px;
  height: 100%;
}

</style>
