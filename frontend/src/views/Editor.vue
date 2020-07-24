<template>
<span >
  <v-row class="wrap">
  <side-tab :drawer="drawer"/>
  <!-- <side-content/> -->
  <!-- <vue-tabs-chrome theme="dark" ref="tab" v-model="tab" :tabs="tabs" :value="tabs.label"/> -->
  <!-- <div class="btns"> -->
  <!-- <button @click="addTab">New Tab</button> -->
  <!-- </div> -->

  <splitpanes id="pane" class="default-theme">

    <pane v-if="drawer.open">
      <side-content :selected="drawer.selected"/>
    </pane>
    <pane>
      <window/>

    </pane>
    <pane>
      <div>3</div>
    </pane>
  </splitpanes>
  </v-row>
</span>
</template>

<script>
// @ is an alias to /src
import { eventBus } from "../main.js"
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: "editor",
  components: {
    Drawer: () => import('@/components/Editor/Drawer'),
    SideTab: () => import('@/components/Editor/Sidetab'),
    SideContent: () => import('@/components/Editor/Sidecontent'),
    Window: () => import('@/components/Editor/Window'),
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
      hide: false,
      tab: 'google',
      tabs: [{
          label: 'google',
          key: 'google',
          closable: false,
          favico: require('../assets/logo.png')
        },
        {
          label: 'facebook',
          key: 'facebook',
          favico: require('../assets/logo.png')
        },
        {
          label: 'New Tab',
          key: 'costom key',
          favico: (h, {
            tab,
            index
          }) => {
            return h('span', tab.label)
          }
        }
      ]
    }

  },
  methods: {
    addTab() {
      console.log("addtab")
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
  /* float: left; */
margin: 0px;
  /* height: 100%; */
  /* width: 100%; */
}

/* .splitpanes__pane {
  box-shadow: 0 0 3px rgba(0, 0, 0, .2) inset;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
} */
#pane {
  position: absolute;
left: 56px;
width: 100%;
height: 100%;
}

.code {
  /* height: 100%; */
  /* position: absolute;
  left: 56px;
  width: 100%;
  height: 100%; */
  /* side tab size is 56px */
}

.left_window {
  float: left;
  /* position: relative; */
  width: 50%;
  height: 100%;
  /* side tab size is 60px */
}

.right_window {
  float: left;
  width: 50%;
  height: 100%;
  /* right: 0px; */
}
</style>
