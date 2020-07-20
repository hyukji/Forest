<template>
  <v-card class="wrap" flat>
      <v-row class="fill-height" no-gutters>
        <v-navigation-drawer dark mini-variant mini-variant-width="56" permanent class="menu">
          <v-list dense nav>
            <v-list-item-group v-model="selected" active-class>
            <v-list-item v-for="tab in main" :key="tab.name" :value="tab.name">
              <v-list-item-action>
                <v-icon>{{ tab.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ tab.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>

          <v-divider/>
          <v-divider/>

            <v-list-item-group v-model="on" active-class multiple>
            <v-list-item v-for="tab in additional" :key="tab.name">
              <v-list-item-action>
                <v-icon>{{ tab.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ tab.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          </v-list>


        </v-navigation-drawer>

        <!-- <v-col class="content"> -->
      <v-navigation-drawer v-model="drawer" :permanent="permanent" dark class="content">
        <component :is="selected"/>
      </v-navigation-drawer>
      <!-- </v-col> -->

      </v-row>

    <!-- <v-navigation-drawer
          permanent
          width="100%"
        >
        </v-navigation-drawer> -->
  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "sidetab",
  components: {
    Tree: () => import('@/components/Editor/Side_tree'),
    Explain: () => import('@/components/Editor/Side_explain'),
    Search: () => import('@/components/Editor/Side_search'),
    Setting: () => import('@/components/Editor/Side_setting')
  },
  data () {
    return {
      selected: null,
      drawer: false,
      permanent: false,
      on: [],
      main: [
        { name: 'Tree', icon: 'fas fa-list' },
        { name: 'Explain', icon: 'far fa-file-alt' },
        { name: 'Search', icon: 'fas fa-search'},
        { name: 'Setting', icon: 'fas fa-cog'}
      ],
      additional: [
        { name: 'Live', icon: 'fas fa-laptop-code'},
        { name: 'Sandbox', icon: 'fas fa-code'}

      ]
    }
  },
  watch : {
    selected: function(val) {
      console.log(this.selected, val, this.drawer)
      if (val === undefined) {
        this.drawer = false
        this.permanent = false
        console.log('if', this.drawer)
      } else {
        this.drawer = true
        this.permanent = true
        console.log('else', this.drawer)
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  position: absolute;
  height: 100%;
}
.menu {
  z-index: 2;
}
.content {
  z-index: 1;
  width: 100%;
}
</style>
