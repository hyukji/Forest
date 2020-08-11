<template>
  <v-navigation-drawer
    dark
    mini-variant
    mini-variant-width="56"
    height="100%"
    permanent
    class="menu"
  >
    <v-list dense nav>
      <v-list-item-group v-model="drawer.selected" active-class>
        <v-list-item v-for="tab in main" :key="tab.name" :value="tab.name">
          <v-list-item-action>
            <v-icon>{{ tab.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ tab.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-divider />
      <v-divider />

      <v-list-item-group v-model="drawer.on" active-class multiple>
        <v-list-item v-for="tab in additional" :key="tab.name" :value="tab.name">
          <v-list-item-action>
            <v-icon>{{ tab.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ tab.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn @click="click" />
  </v-navigation-drawer>
</template>

<script>
// @ is an alias to /src

export default {
  name: "sidetab",
  components: {
    // tree: () => import('@/components/editor/side_tree'),
    // explain: () => import('@/components/editor/side_explain'),
    // search: () => import('@/components/editor/side_search'),
    // setting: () => import('@/components/editor/side_setting')
  },
  props: {
    drawer: {
      type: Object, //object props reference parent's data
      required: true,
    },
  },
  data() {
    return {
      main: [
        { name: "Tree", icon: "far fa-list" },
        { name: "AssignTree", icon: "far fa-check-square" },
        { name: "Explain", icon: "fas fa-book-reader" },
        { name: "Search", icon: "fas fa-search" },
        { name: "Setting", icon: "fas fa-cog" },
      ],
      additional: [
        { name: "Live", icon: "fas fa-chalkboard-teacher" },
        { name: "Sandbox", icon: "fas fa-code" },
      ],
    };
  },
  watch: {
    drawer: {
      deep: true,
      handler(val) {},
    },
  },
  methods: {
    click() {
      console.log(this.drawer.on);
      console.log(this.beforeChange);
    },
    changeTab(action, key) {
      this.$emit("changeTab", action, key);
    },
  },
  watch: {
    "drawer.selected": function (newVal) {
      if (newVal != null) {
        this.drawer.open = true;
      } else {
        this.drawer.open = false;
      }
    },
    "drawer.on": function (newVal) {
      console.log("watch drawer.on start");
      var oldVal = this.beforeChange;
      this.beforeChange = newVal;
      console.log(newVal, oldVal);
      if (newVal.length > oldVal.length) {
        newVal.forEach((item, i) => {
          console.log(item, !oldVal.includes(item), oldVal);
          if (!oldVal.includes(item)) {
            this.changeTab("add", item);
          }
        });
      } else if (oldVal.length > newVal.length) {
        oldVal.forEach((item, i) => {
          if (!newVal.includes(item)) {
            this.changeTab("remove", item);
          }
        });
      } else {
        console.log("removed by Editor tab");
        // already removed by Editor tab
      }
    },
  },
};
</script>

<style scoped>
.wrap {
  /* width: 56px;
  height: 100%;
  padding: 0px;
  margin: 0px; */
}
.menu {
  height: 100%;
}
.content {
}
</style>
