<template>
<!-- <div class="wrap"> -->
<v-row no-gutters class="wrap">

  <side-tab :drawer="drawer" @changeTab="changeTab"/>

  <splitpanes id="splitpane" class="default-theme" @resize="paneResize">

    <pane v-if="drawer.open" min-size="10" max-size="25">
      <side-content :selected="drawer.selected"/>
    </pane>

    <pane min-size="20" class="pane">
      <component :is="tabsChrome" class="tab" id="tab1" ref="tab1"
      v-model="selectedTab.keys[0]" :tabs="tabs[0]"
      @remove="removeTab" @click="clickk"/>
      <keep-alive>
      <component :is="selectedTab.tab1.type" :data="selectedTab.tab1.data"/>
    </keep-alive>
    </pane>

    <pane min-size="20" class="pane">
      <v-btn @click="click" />
      <component :is="tabsChrome" class="tab" id="tab2" ref="tab2"
      v-model="selectedTab.keys[1]" :tabs="tabs[1]"
      @remove="removeTab" />
      <keep-alive>
      <component :is="selectedTab.tab2.type" :data="selectedTab.tab2.data"/>
    </keep-alive>
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
      tabsChrome: null,
      selectedTab: {
        keys: ['google', 'facebook2', null, null],
        tab1: {
          type: 'WindowCode',
          data: "print('google')"
        },
        tab2: {
          type: "WindowTerminal",
          data: ["lecture3", "problem2"]
        },
        tab3: {}
      },
      tabs: [
        [{
          label: 'google',
          key: 'google',
          type: 'WindowCode',
          data: "print('google')",
          pos: 1,
          favico: require('../assets/logo.png')
        },
        {
          label: 'facebook',
          key: 'facebook',
          type: 'WindowTerminal',
          data: ["lecture3", "problem1"],
          pos: 1,
          favico: require('../assets/logo.png')
        }],
        [{
          label: 'google2',
          key: 'google2',
          type: 'WindowCode',
          data: "print('google2')",
          pos: 2,
          favico: require('../assets/logo.png')
        },
        {
          label: 'facebook2',
          key: 'facebook2',
          type: 'WindowTerminal',
          data: ["lecture3", "problem2"],
          pos: 2,
          favico: require('../assets/logo.png')
        }]
      ],
    }
  },
  methods: {
    // addTab(label, type) {
    //   let newTabs = [
    //     {
    //       label: label,
    //       key: label,
    //       type: type,
    //       data: null,
    //       pos: 1,
    //     }
    //   ]
    //   this.$refs.tab1.addTab(...newTabs)
    //   this.selectedTab['tab1'].key = newTabs[0].key
    //   this.clickTab(null, newTabs[0], null)
    //   //this.tab = item 생성 탭 자동 선택
    // },
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
      console.log("clickTAb")
      var copy = JSON.parse(JSON.stringify( this.selectedTab.keys ));
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
    click() {
      console.log(this.$refs.tab1.props)
      console.log(this.$refs.tab1.tabs)
      console.log(this.selectedTab.keys)
    },
    clickk() {
      console.log('clickkk')
    },
    changeTab(action, key) { //request from sideTab
      console.log(action, key)
      if (action == 'add') {
        let tab = {
          label: key,
          key: key,
          type: "WindowCode",
          data: "hi "+key,
          pos: 1
        }
        this.$refs.tab1.addTab(tab)
        this.clickTab(tab, 0)
      } else if (action == "remove") {
        this.$refs.tab1.removeTab(key)
      }
    },
  },
  computed: {

  },
  created() {
    console.log("created")
    //document.documentElement.style.overflow='hidden'
    this.tabsChrome = VueTabsChrome.VueTabsChrome //typeerror?
  },
  watch: {
      "selectedTab.keys": {
        deep: true,
        handler: function(newVal) {
        console.log(this.tabs[0], 'dddddddddddddd')
        newVal.forEach((item, i) => { //check all ele in newVal
          if (item != null) {
            var tab = this.getTab(item)
            var pos = tab.pos
            this.selectedTab['tab'+`${pos}`].type = tab.type
            this.selectedTab['tab'+`${pos}`].data = tab.data
          }
        });
      },
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
