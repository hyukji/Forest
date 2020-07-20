<template>
<div>
    <div class="side">
    <side-tab/>
  <!-- <drawer/> -->
</div>
    <!-- <vue-tabs-chrome theme="dark" ref="tab" v-model="tab" :tabs="tabs" :value="tabs.label"/> -->
    <!-- <div class="btns"> -->
      <!-- <button @click="addTab">New Tab</button> -->
    <!-- </div> -->

<!-- <v-row class="code"> -->
<div class="code">
<div class="left_window">
  <window/>
</div>
<div class="right_window">
  <window />
</div>
<!-- </v-row> -->
</div>

</div>
</template>

<script>
// @ is an alias to /src
import { eventBus } from "../main.js"

export default {
  name: "editor",
  components: {
    Drawer: () => import('@/components/Editor/Drawer'),
    SideTab: () => import('@/components/Editor/Sidetab'),
    Window: () => import('@/components/Editor/Window')
  },
  data() {
    return {
      tab: 'google',
tabs: [
  {
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
    favico: (h, { tab, index }) => {
      return h('span', tab.label)
    }
  }
]
}

},
methods: {
  addTab () {
console.log("addtab")
}
}

};
</script>

<style scoped>
.side{
  /* float: left; */

}
.code {
  /* height: 100%; */
  position: absolute;
  left: 56px;
  width: 100%;
  height: 100%;
  /* side tab size is 56px */
}
.left_window{
  float:left;
  /* position: relative; */
  width: 50%;
  height: 100%;
  /* side tab size is 60px */
}
.right_window{
  float: left;
  width: 50%;
  height: 100%;
  /* right: 0px; */
}

</style>
