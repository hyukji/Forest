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
      <SideTab :drawer="drawer" @changeTab="changeTab" />

      <splitpanes id="splitpane" class="default-theme">
        <pane v-if="drawer.open" min-size="10" max-size="25">
          <side-content :selected="drawer.selected" v-model="loading" />
        </pane>

        <pane v-for="(element, index) in tabeditor" :key="element.id">
          <newediteditor :element="element" :index="index"></newediteditor>
        </pane>
      </splitpanes>
    </v-row>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes"

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
      tabeditor: [
        [
          {
            tab_title: "L2 P1",
            data: "print(21)",
          },
          {
            tab_title: "L2 P2",
            data: "print(22)",
          },
          {
            tab_title: "L2 P3",
            data: "print(23)",
          },
        ],
        [
          {
            tab_title: "L3 P1",
            data: "print(31)",
          },
          {
            tab_title: "L3 P2",
            data: "print(32)",
          },
          {
            tab_title: "L3 P3",
            data: "print(33)",
          },
        ],
      ],
    }
  },
  watch: {
    "selectedTab.keys": {
      deep: true,
      handler: function(newVal) {
        console.log("tab change")
        newVal.forEach((item, i) => {
          //check all ele in newVal
          if (item != null) {
            var tab = this.getTab(item)
            var pos = tab.pos
            this.selectedTab["tab" + `${pos}`].type = tab.type
            this.selectedTab["tab" + `${pos}`].data = tab.data
            this.selectedTab["tab" + `${pos}`].selected = tab.selected
          }
        })
      },
    },
  },
  method: {
    removeTab(tab, index) {
      console.log("removeSpecial", this.drawer.on)
      if (tab.key == "Live" && this.drawer.on.includes(tab.key)) {
        this.drawer.on.splice(this.drawer.on.indexOf("Live"), 1)
      } else if (tab.key == "Sandbox" && this.drawer.on.includes(tab.key)) {
        this.drawer.on.splice(this.drawer.on.indexOf("Sandbox"), 1)
      } else {
      }
    },
    paneResize() {
      this.$refs.tab1.doLayout()
      this.$refs.tab2.doLayout()
      //this.$refs.tab3.doLayout()
      //this.$refs.tab4.doLayout()
    },
    clickTab(tab, pos) {
      var copy = JSON.parse(JSON.stringify(this.selectedTab.keys))
      copy[pos] = tab.key
      this.selectedTab.keys = copy
    },
    getTab(key) {
      for (var list in this.tabs) {
        list = this.tabs[list]
        for (var ele in list) {
          if (list[ele].key == key) {
            return list[ele]
          }
        }
      }
    },
    click() {},
    changeTab(action, key) {
      //request from sideTab
      console.log(action, key)
      if (action == "add") {
        let tab = {
          label: key,
          key: key,
          type: "WindowCode",
          data: "hi " + key,
          pos: 1,
        }
        this.$refs.tab1.addTab(tab)
        this.clickTab(tab, 0)
      } else if (action == "remove") {
        this.$refs.tab1.removeTab(key)
      }
    },
  },
}
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
