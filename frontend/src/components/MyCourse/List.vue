<template>
<div class="wrap">
  <v-chip class="body-title" color="secondary" label text-color="white" large>
    <v-icon left>mdi-label</v-icon>
    내 강의실
  </v-chip>
  <v-row>
    <v-col>
      <div class="body-title">수강 중인 과목</div>
      <v-divider class="ma-3" />
      <card />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <div class="body-title">수강 종료한 과목</div>
      <v-divider class="ma-3" />
      <card />
    </v-col>
  </v-row>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Mycourse",
  components: {
    Card: () => import('@/components/MyCourse/Card')
  },
  data: () => ({})
};
</script>

<style scoped>
.wrap {
  padding-left: 2%;
}
.body-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 2%;
}
.card {
  float: left;
}
</style>
