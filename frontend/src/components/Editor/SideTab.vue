<template>
  <v-navigation-drawer
    color="#333333"
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
            <v-icon :color="(drawer.selected == tab.name) ? 'white' : '#858585'">{{ tab.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ tab.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-divider class="my-2" color="#858585" />

      <v-list-item-group v-model="drawer.on" active-class multiple>
        <v-list-item v-for="tab in additional" :key="tab.name" :value="tab.name">
          <v-list-item-action>
            <v-icon :color="(drawer.on.includes(tab.name)) ? 'white' : '#858585'">{{ tab.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ tab.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// @ is an alias to /src

export default {
  //:type="show_pw ? 'text' : 'password'"
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
      beforeChange: [],
      main: [
        { name: "MainList", icon: "far fa-list" },
        { name: "Search", icon: "fas fa-search" },
        { name: "Setting", icon: "fas fa-cog" },
      ],
      additional: [
        { name: "Live", icon: "fas fa-chalkboard-teacher" },
        { name: "WindowTerminal", icon: "far fa-window-alt" },
        { name: "Sandbox", icon: "fas fa-box-open" },
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
      var oldVal = this.beforeChange;
      this.beforeChange = newVal;
      if (newVal.length > oldVal.length) {
        newVal.forEach((item, i) => {
          if (!oldVal.includes(item)) {
            this.$store.commit("setSideTabData", item);
          }
        });
      } else if (oldVal.length > newVal.length) {
        oldVal.forEach((item, i) => {
          if (!newVal.includes(item)) {
            this.$store.commit("delSideTabData", item);
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
