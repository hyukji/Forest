<template>
<div class="wrap-Mycourse-cards">
  <v-card class="mx-auto" max-width="250" hover href="/course/courseid">
    <v-img src="../assets/python.png" height="150px"></v-img>

    <v-card-title>{{ $route.params.lecture }}</v-card-title>

    <v-card-subtitle></v-card-subtitle>
    <div class="btn-nowlearn">
      <v-btn class="teal white--text" small>바로학습</v-btn>
    </div>

    <v-divider class="mx-4"></v-divider>
    <v-card-subtitle>진행률 70%</v-card-subtitle>
    <v-progress-linear color="teal"></v-progress-linear>
  </v-card>

  <drawer/>

</div>
</template>

<script>
// @ is an alias to /src
import { eventBus } from "../main.js"

export default {
  name: "editor",
  components: {
    Drawer: () => import('@/components/Editor/Drawer')
  },
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
