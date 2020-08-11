<template>
  <v-row no-gutters>
    <v-btn color="secondary" small outlined class="ma-2" @click>
      실행
    </v-btn>
    <v-btn color="secondary" small outlined class="ma-2" @click>
      제출
    </v-btn>

    <v-text-field v-model="label"></v-text-field>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="white--text ma-8" v-bind="attrs" v-on="on">
          Radius
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="item in items" :key="item" link>
          <v-list-item-title v-text="item"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      Label: null,
      items: ["1", "2", "3"],
    }
  },
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd;
}
</style>
