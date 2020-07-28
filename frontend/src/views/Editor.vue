<template>
<!-- <div class="wrap"> -->
  <v-row no-gutters class="wrap">

  <side-tab :drawer="drawer"/>
  <!-- <side-content/> -->
  <!-- <vue-tabs-chrome theme="dark" ref="tab" v-model="tab" :tabs="tabs" :value="tabs.label"/> -->
  <!-- <div class="btns"> -->
  <!-- <button @click="addTab">New Tab</button> -->
  <!-- </div> -->

  <splitpanes id="splitpane" class="default-theme" @resize="paneResize">

    <pane v-if="drawer.open" min-size="10" max-size="25">
      <side-content :selected="drawer.selected" />
    </pane>

    <pane min-size="20" class="pane">
  <component :is="tabsChrome" class="tab" id="tab1" ref="tab1" v-model="selectedTab[0]" :tabs="tabs[0]"
  @remove="removeSpecial"/>
<window-code/>
</pane>

    <pane min-size="20" class="pane">
  <v-btn @click="addTab('hi')"/>
  <component :is="tabsChrome" class="tab" id="tab2" ref="tab2" v-model="selectedTab[1]" :tabs="tabs[1]"/>
  <window-terminal/>
    </pane>

  </splitpanes>

  </v-row>
<!-- </div> -->
</template>

<script>
// @ is an alias to /src
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import VueTabsChrome from 'vue-tabs-chrome'
import Pdf from 'pdfvuer'

export default {
  name: "editor",
  components: {
    Drawer: () => import('@/components/Editor/Drawer'),
    SideTab: () => import('@/components/Editor/SideTab'),
    SideContent: () => import('@/components/Editor/SideContent'),
    WindowCode: () => import('@/components/Editor/WindowCode'),
    WindowTerminal: () => import('@/components/Editor/WindowTerminal'),
    Splitpanes,
    Pane
  },
  data() {
    return {
      drawer: {
        open: false,
        selected: null,
        on: []
      },
      specialTab: {
        live: false,
        sandbox: false
      },
      tabsChrome: null,
      leftPaneSize: 50, //percent
      selectedTab: ['google', 'facebook', null, null],
      tabs: [
        [{
          label: 'google',
          key: 'google',
          closable: false,
          favico: require('../assets/logo.png')
        },
        {
          label: 'facebook',
          key: 'facebook',
          favico: require('../assets/logo.png')
        }],
        [{
          label: 'google',
          key: 'google',
          closable: false,
          favico: require('../assets/logo.png')
        },
        {
          label: 'facebook',
          key: 'facebook',
          favico: require('../assets/logo.png')
        }]
      ]
    }
  },
  methods: {
    addTab(label) {
      let newTabs = [
        {
          label: label,
          key: label,
          closable: true
        }
      ]
      console.log(...newTabs)
      console.log(newTabs)
      console.log(this.drawer.on)
      this.$refs.tab1.addTab(...newTabs)
      //this.tab = item 생성 탭 자동 선,
    },
    removeSpecial(tab, index) {
      console.log("tabkey", tab.key)
      if (tab.key == "Live") {
        this.drawer.on.splice(this.drawer.on.indexOf("Live"), 1)
        this.specialTab.live = false
      } else if (tab.key == "Sandbox") {
        this.drawer.on.splice(this.drawer.on.indexOf("Sandbox"), 1)
        this.specialTab.sandbox = false
      }
    },
    paneResize() {
      this.$refs.tab1.doLayout()
      this.$refs.tab2.doLayout()
      //this.$refs.tab3.doLayout()
      //this.$refs.tab4.doLayout()
    },
  },
  created() {
    console.log("created")
    //document.documentElement.style.overflow='hidden'
    this.tabsChrome = VueTabsChrome.VueTabsChrome //typeerror?
  },
  watch: {
    drawer: {
      deep: true,
      handler() {

        if (this.drawer.selected != null) {
          this.drawer.open = true
        } else {
          this.drawer.open = false
        }

        var vue = this
        if (this.drawer.on.includes("Live") && !this.specialTab.live) {
          this.addTab("Live")
          this.specialTab.live = true
        } else if (!this.drawer.on.includes("Live") && this.specialTab.live){
          console.log("else")
          this.$refs.tab1.removeTab("Live")
          this.specialTab.live = false
        }

        if (this.drawer.on.includes("Sandbox") && !this.specialTab.sandbox) {
          this.addTab("Sandbox")
          this.specialTab.sandbox = true
        } else if (!this.drawer.on.includes("Sandbox") && this.specialTab.sandbox) {
          this.$refs.tab1.removeTab("Sandbox")
          this.specialTab.sandbox = false
        }
      }
    }
  }

};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.side {

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
}

.tab {
  display: block;

}


</style>
