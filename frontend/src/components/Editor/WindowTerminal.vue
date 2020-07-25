<template>
<div class="wrap">
  <v-row no-gutters>
    <v-menu transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="ma-2"
          v-bind="attrs"
          v-on="on"
        >
          {{ selected.lecture }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group v-model="selected.lecture" mandatory>
        <v-list-item v-for="n in lectures" :key="n" :value="n" link>
          <v-list-item-title v-text="n"></v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      </v-list>
    </v-menu>

    <v-menu transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary"
          class="ma-2"
          v-bind="attrs"
          v-on="on"
        >
          {{ selected.problem }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group v-model="selected.problem" mandatory>
        <v-list-item v-for="n in problems" :key="n" :value="n" link>
          <v-list-item-title v-text="n"></v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      </v-list>
    </v-menu>
  </v-row>




</div>
</template>

<script>
export default {
  components: { },
  data() {
    return {
      selected: { lecture: "lecture1", problem: "problem2"},
      lectures: ["lecture1", "lecture2", "lecture3"],
      problems: ["problem1", "problem2"]
    }
  },
  methods: {

  },
  created() {

  },

}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd
}

</style>
