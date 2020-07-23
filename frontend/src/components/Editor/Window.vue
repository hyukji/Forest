<template>
<div class="wrap">

  <!-- <vue-tabs-chrome v-model="tab" :tabs="tabs">
  </vue-tabs-chrome> -->

  <!-- <vue-resizable
    :max-height="800" :min-width="100" fitParent>
        <div class="resizable-content"> -->
        <pane v-for="i in 3" :key="i">
  <component :is="selected" ref="tab" v-model="tab" :tabs="tabs"/>
    <!-- </vue-resizable> --></pane>
</div>
</template>

<script>
// import VueResizable from 'vue-resizable'
import VueTabsChrome from 'vue-tabs-chrome'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default {
  components: { VueResizable, Pane },
  data: () => {
    return {
      selected: null,
      tab: 'google',
      tabs: [
        {
          label: 'google',
          key: 'google',
          favico: require('../../assets/logo.png')
        },
        {
          label: 'facebook',
          key: 'facebook',
          favico: require('../../assets/logo.png')
        },
        {
          label: 'New Tab',
          key: 'costom_key',
          favico: (h, { tab, index }) => {
            return h('span', tab.label)
          }
        }
      ]
    }
  },
  methods: {
    addTab () {
      let item = 'tab' + Date.now()
      let newTabs = [
        {
          label: 'New Tab',
          key: item,
          closable: false
        }
      ]
      this.$refs.tab.addTab(...newTabs)
      this.tab = item
    },
    removeTab () {
      this.$refs.tab.removeTab(this.tab)
    },
    handleClick (e, tab, i) {
      console.log(e, tab, i)
    }

  },
  created() {
    this.selected = VueTabsChrome.VueTabsChrome //typeerror?
  }

}
</script>

<style scoped>
.wrap {
  /* width: 100%; */
  height: 100%;
  border: 1px solid #dddddd
}
    .resizable-content {
        width: 100%;
        height: 100%;
        background-color: #565656;
    }
</style>
