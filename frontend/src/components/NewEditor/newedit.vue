<template>
  <div class="wrap">
    <EditToolbar />

    <v-row no-gutters class="wrap">
      <SideTab :drawer="drawer" />

      <splitpanes vertical class="wrap_splitpanes">
        <pane v-if="drawer.open" size="20" min-size="15" max-size="50">
          <side-content :selected="drawer.selected" :user_data="user_data" />
        </pane>
        <pane>
          <splitpanes>
            <pane v-for="(element, index) in tabeditor" :key="index" min-size="15">
              <newediteditor :index="index" :element="element" :user_data="user_data"></newediteditor>
            </pane>
          </splitpanes>
        </pane>
      </splitpanes>
    </v-row>
  </div>
</template>

<script>
import { authentication } from "@/mixins/authentication";
import { Splitpanes, Pane } from "splitpanes";
import { eventBus } from "@/main.js";

export default {
  components: {
    Splitpanes,
    Pane,
    EditToolbar: () => import("@/components/NewEditor/newEditToolbar"),

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
      panesize: 20,
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
</style>


<style>
.wrap_splitpanes {
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
