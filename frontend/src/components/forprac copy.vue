<template>
  <Layout :edit="state.edit" :resize="state.resize" :splits="state.splits">
    <div class="nopane">
      <div>
        Also drag me on the gray area<button>random button</button>
        <ul>
          <li>Random</li>
          <li>list</li>
        </ul>
        <div>{{ state.edit }}</div>
      </div>
    </div>
    <Pane title="Drag me">testing</Pane>
    <Pane title="Drag me too">Stuff<MyInput /></Pane>
    <Pane title="Third">Testing dynamic split</Pane>
    <div class="custom-drag">
      <div class="container">
        testing a drag handle
        <div class="drag-handle" pane-drag>DRAG HERE</div>
        test
      </div>
    </div>
  </Layout>
</template>

<script>
import Vue from "vue"
import { Layout, Pane } from "vue-split-layout"
var MyInput = Vue.component("MyInput", {
  data() {
    return {
      value: "",
    }
  },
  template: `<div><div>{{value}}</div><input type='text' v-model='value'></div>`,
})
const layouts = [
  {
    dir: "horizontal",
    first: {
      dir: "vertical",
      first: 0,
      second: 2,
    },
    second: {
      dir: "horizontal",
      first: 4,
      second: 1,
    },
  },
  // Second layout
  {
    dir: "horizontal",
    first: {
      dir: "vertical",
      first: { dir: "horizontal", first: 0, second: 3, split: "20%" },
      second: 2,
    },
    second: 1,
  },
]

export default {
  name: "App",
  components: { Layout, Pane, MyInput },
  data() {
    return {
      state: {
        extraStyle: false,
        edit: true,
        resize: true,
        splits: layouts[0],
        layoutN: 0,
      },
      hi: "world",
    }
  },
  methods: {
    changeSplits() {
      this.state.layoutN = (this.state.layoutN + 1) % layouts.length
      this.state.splits = layouts[this.state.layoutN]
    },
    toggleEdit() {
      this.state.edit = !this.state.edit
    },
    toggleResize() {
      this.state.resize = !this.state.resize
    },
    toggleBoth() {
      if (this.state.edit || this.state.resize) {
        this.state.edit = this.state.resize = false
        return
      }
      this.state.edit = this.state.resize = true
    },
    toggleStyle() {
      this.state.extraStyle = !this.state.extraStyle
    },
  },
}
</script>
