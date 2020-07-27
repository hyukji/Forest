<template>
  <v-navigation-drawer dark mini-variant mini-variant-width="56" permanent class="menu">
    <v-list dense nav>
      <v-list-item-group v-model="drawer.selected" active-class>
        <v-list-item v-for="tab in main" :key="tab.name" :value="tab.name">
          <v-list-item-action>
            <v-icon>{{ tab.icon }}</v-icon>
          </v-list-item-action>

<<<<<<< HEAD:frontend/src/components/Editor/Sidetab.vue
          <v-list-item-content>
            <v-list-item-title>{{ tab.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-divider />
      <v-divider />
=======
              <v-list-item-content>
                <v-list-item-title>{{ tab.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
    
          <v-divider/>
          <v-divider/>
>>>>>>> 39a7c75ca0186e417ec7cb1133ce4170024a37ce:frontend/src/components/Editor/SideTab.vue

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
        { name: "Tree", icon: "fas fa-list" },
        { name: "Explain", icon: "far fa-file-alt" },
        { name: "Search", icon: "fas fa-search" },
        { name: "Setting", icon: "fas fa-cog" },
      ],
      additional: [
        { name: "Live", icon: "fas fa-laptop-code" },
        { name: "Sandbox", icon: "fas fa-code" },
      ],
    };
  },
  watch: {
    drawer: {
      deep: true,
      handler(val) {
        console.log("watch");
        if (this.drawer.selected != null) {
          this.drawer.open = true;
        } else {
          this.drawer.open = false;
        }
      },
    },
  },
  methods: {
    click() {
      console.log(this.drawer);
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
.content {
}
</style>
