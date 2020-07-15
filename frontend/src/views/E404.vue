<template>
  <v-container fluid background-color="teal lighten-5" class="wrap-content">
    <a>없는 주소 입니다.</a>
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
  padding-top: 100pt;
  min-width: 800pt;
  max-width: 1000pt;
}
.left_div {
  width: 60%;
}
.right_div {
  width: 30%;
  max-width: 400pt;
}
.right-right-div {
  width: 100pt;
  max-width: 200pt;
}
ul {
  text-align: center;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
li {
  display: inline-block;
  margin-right: 3%;
}
a {
  text-decoration: none;
}
.text_logo {
  color: black;
  font-size: 37pt;
}
</style>
