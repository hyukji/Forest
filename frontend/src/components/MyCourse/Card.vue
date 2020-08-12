<template>
  <div class="wrap-Mycourse-cards">
    <v-card class="mx-auto" outlined max-width="250" hover @click="to_aboutCourse">
      <v-img src="../../assets/python.png" height="150px"></v-img>

      <v-card-title>{{this.title}}</v-card-title>

      <v-card-subtitle>{{this.prof}}</v-card-subtitle>
      <div class="btn-nowlearn">
        <v-btn class="secondary" small @click="open_editor">바로학습</v-btn>
      </div>

      <v-divider class="mx-4"></v-divider>
      <v-card-subtitle>{{this.progess_data}}</v-card-subtitle>
      <v-progress-linear v-model="progess" color="primary"></v-progress-linear>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Card",
  components: {},
  data: () => ({
    title: "",
    code: "",
    prof: "",
    logoname: "",
    progess: 0,
    progess_data: "",
  }),
  props: ["card_info"],
  methods: {
    open_editor(event) {
      window.open("/editor");
    },
    to_aboutCourse(event) {
      this.$router.push("/mycourse/" + this.code);
    },
    get_position() {
      var index = this.sendData.length - 1;
      this.position = this.sendData[index];
      this.sendData.pop();
    },
  },
  created() {
    this.title = this.card_info.title;
    this.code = this.card_info.code;
    this.prof = "prof. " + this.card_info.professor;
    this.progess_data = "진행률 " + this.card_info.progress + "%";
    this.progess = this.card_info.progress;
    this.logoname = this.card_info.logo_name;
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
