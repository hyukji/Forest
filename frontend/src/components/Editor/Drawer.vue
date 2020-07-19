<template>

  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group"
      active-class="green--text text--darken-5">
        <v-list-item
          v-for="(item, i) in lectures" :key="i"
          router :to="{name: 'Editor',
                      params: { lecture: item.title }}">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

</div>
</template>

<script>
// @ is an alias to /src
import { eventBus } from "../../main.js"

export default {
  name: "drawer",
  components: {},
  data: () => ({
    drawer: false,
    group: 0, //current location
    lectures: [
      {title: "lecture1"},
      {title: "lecture2"},
    ]
  }),
  methods: {
  },
  watch: {
    group () {
      this.drawer = false
      eventBus.$emit("selectLecture", this.drawer)
    }
  },
  created() {
    eventBus.$on("clickDrawer", (drawer) => {
      this.drawer = drawer
    })
  }
};
</script>

<style scoped>
.wrap-Mycourse-cards {
  float: left;
}
.btn-nowlearn {
  padding-right: 5%;
  padding-bottom: 3%;
  text-align: right;
}
</style>
