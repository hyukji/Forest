<template>
  <v-card class="mx-auto" outlined max-width="250">
    <v-card-title>{{ this.name }}</v-card-title>
    <v-card-subtitle>{{ this.id }}</v-card-subtitle>
  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Card",
  components: {},
  data: () => ({
    name: "",
    id: "",
  }),
  props: ["card_info"],
  methods: {
    open_editor(event) {
      window.open("/editor")
    },
    to_aboutCourse(event) {
      this.$router.push("/mycourse/" + this.code)
    },
    get_position() {
      var index = this.sendData.length - 1
      this.position = this.sendData[index]
      this.sendData.pop()
    },
  },
  created() {
    this.name = this.card_info.name
    this.id = this.card_info.id
  },
}
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
