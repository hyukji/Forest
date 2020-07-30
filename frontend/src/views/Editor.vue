<template>
<!-- <div class="wrap"> -->
<v-row no-gutters class="wrap">

  <side-tab :drawer="drawer" />

  <splitpanes id="splitpane" class="default-theme" @resize="paneResize">

    <pane v-if="drawer.open" min-size="10" max-size="25">
      <side-content :selected="drawer.selected" />
    </pane>

    <pane min-size="20" class="pane">
      <component :is="tabsChrome" class="tab" id="tab1" ref="tab1" v-model="selectedTab.tab1.key" :tabs="tabs[0]"
      @click="clickTab" @swap="swapTab" @remove="removeTab" />
      <keep-alive>
      <component :is="selectedTab.tab1.type" :data="selectedTab.tab1.data"/>
    </keep-alive>
    </pane>

    <pane min-size="20" class="pane">
      <v-btn @click="click" />
      <component :is="tabsChrome" class="tab" id="tab2" ref="tab2" v-model="selectedTab.tab2.key" :tabs="tabs[1]"
      @click="clickTab" @swap="swapTab" @remove="removeTab"/>
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
      specialTab: {
        live: false,
        sandbox: false
      },
      tabsChrome: null,
      selectedTab: {
        tab1: {
          key: 'google',
          type: 'WindowCode',
          data: "print('google')"
        },
        tab2: {
          key: 'facebook2',
          type: "WindowTerminal",
          data: ["lecture3", "problem2"]
        },
        // keys: ['google', 'facebook2', null, null],
        // types: [
        //   {type:"WindowCode",
        //   data: "print('google')"},
        //   {type:"WindowTerminal",
        //   data: ["lecture3", "problem2"]}, {type:null}, {type:null}],
        tab3: {}
      },
      //selectedTabType: [{type:"WindowCode"}, {type:"WindowTerminal"}, {type:null}, {type:null}],
      // selectedTab: [
      //   {
      //     key: 'google',
      //     type: 'WindowCode'
      //   }, {
      //     key: 'facebook',
      //     type: 'WindowTerminal'
      //   },
      //   {}, {}
      // ],
      a: "WindowCode",
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
      codeData: [ //get data from DB
        { tabkey: 'google',
          code: "print('hi')" },
        { tabkey: 'Live',
          code: 'print("bye")'},
      ]
    }
  },
  methods: {
    addTab(label, type) {
      let newTabs = [
        {
          label: label,
          key: label,
          type: type,
          data: null,
          pos: 1,
        }
      ]
      console.log(...newTabs)
      console.log(newTabs)
      this.$refs.tab1.addTab(...newTabs)
      this.selectedTab['tab1'].key = newTabs[0].key
      this.clickTab(null, newTabs[0], null)
      //this.tab = item 생성 탭 자동 선,
    },
    removeTab(tab, index) {
      console.log("removeSpecial", tab.key)
      if (tab.key == "Live") {
        this.drawer.on.splice(this.drawer.on.indexOf("Live"), 1)
        this.specialTab.live = false
      } else if (tab.key == "Sandbox") {
        this.drawer.on.splice(this.drawer.on.indexOf("Sandbox"), 1)
        this.specialTab.sandbox = false
      } else {

      }
    },
    paneResize() {
      this.$refs.tab1.doLayout()
      this.$refs.tab2.doLayout()
      //this.$refs.tab3.doLayout()
      //this.$refs.tab4.doLayout()
    },
    clickTab(event, tab, i) {
      var index = tab.pos
      this.selectedTab['tab'+`${index}`].type = tab.type
      this.selectedTab['tab'+`${index}`].data = tab.data
    },
    swapTab(tab, targetTab) {
      this.clickTab(null, tab, null)
    },
    // getTabType(key) {
    //   console.log("key", key)
    //   this.tabs.forEach(function(list) {
    //     list.forEach(function(ele) {
    //       if (ele.key == key) {
    //         console.log(ele.key, ele.type)
    //         return ele.type}
    //     })
    //   })
    // },
    click() {
      console.log(this.$refs.tab1.tabKey)

    }
  },
  computed: {

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

        console.log('watch darwer', this.drawer.on)

        if (this.drawer.selected != null) {
          this.drawer.open = true
        } else {
          this.drawer.open = false
        }

        var vue = this
        if (this.drawer.on.includes("Live") && !this.specialTab.live) {
          this.addTab("Live", "WindowCode")
          this.specialTab.live = true
        } else if (!this.drawer.on.includes("Live") && this.specialTab.live){
          console.log("else,,,", this.drawer.on)
          this.$refs.tab1.removeTab("Live")
          this.specialTab.live = false
        }

        if (this.drawer.on.includes("Sandbox") && !this.specialTab.sandbox) {
          this.addTab("Sandbox", "WindowCode")
          this.specialTab.sandbox = true
        } else if (!this.drawer.on.includes("Sandbox") && this.specialTab.sandbox) {
          console.log("else,,,@@", this.drawer.on)
          this.$refs.tab1.removeTab("Sandbox")
          this.specialTab.sandbox = false
        }
      }
    },
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
