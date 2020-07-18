<template>
  <v-container fluid background-color="teal lighten-5" class="wrap-content">
    <v-col cols="12">
      <v-img :src="require('../assets/E404.png')" class="my-3" contain height="300" />
    </v-col>
    <h2 id="select"> 찾으시는 페이지가 없습니다!</h2>
    <a id="select" href="/">메인으로 돌아가기</a>
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
