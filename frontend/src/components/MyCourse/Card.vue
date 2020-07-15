<template>
    <div class="wrap-Mycourse-cards">
      <v-card class="mx-auto" max-width="250" hover href="/course/courseid">
        <v-img src="../../assets/python.png" height="150px"></v-img>

        <v-card-title>프로그래밍(실습)</v-card-title>

        <v-card-subtitle>prof. 신동훈</v-card-subtitle>
        <div class="btn-nowlearn">
          <v-btn class="teal white--text" small>바로학습</v-btn>
        </div>

        <v-divider class="mx-4"></v-divider>
        <v-card-subtitle>진행률 70%</v-card-subtitle>
        <v-progress-linear v-model="progess_data" color="teal"></v-progress-linear>
      </v-card>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Card",
  components: {},
  data: () => ({
    progess_data: 70
  })
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
