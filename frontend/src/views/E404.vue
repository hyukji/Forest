<template>
  <v-container fluid background-color="teal lighten-5" class="wrap-content">
    <v-col cols="12">
      <v-img :src="require('../assets/E404.png')" class="my-3" contain height="300" />
    </v-col>
    <h2> 찾으시는 페이지가 없습니다! </h2>
    <h2><a href="http://localhost:8080">메인으로 돌아가기</a></h2>
  </v-container>
</template>

<script>
export default {
  data: function() {},
  methods: {},
}
</script>

<style scoped>
.wrap-content {
  padding-top: 50pt;
  min-width: 800pt;
  max-width: 1000pt;
}
h2 {
  text-align : center;
}
a {
  font-size: large;
  text-decoration: none;
}
</style>
