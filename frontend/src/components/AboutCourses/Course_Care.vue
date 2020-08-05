<template>
  <div>
    <v-row  justify="end" class="mb-3">
      <v-dialog v-if="!EditBool"  persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="!EditBool"
            class="ma-3"
            outlined
            color="secondary"
            width="100"
            @click="EditOn"
          >수 정</v-btn>
        </template>
        <inoutform ></inoutform>
      </v-dialog>
    </v-row>
    <v-col>
      <p class="card-title"> 강좌 제목 </p>
      <p v-if="!EditBool">{{this.title}}</p>
    </v-col>
    <div class="save">
      <v-btn
        v-if="EditBool"
        class="ma-3"
        outlined
        color="secondary"
        width="100"
        @click="EditLecture"
      >저 장</v-btn>
    </div>
  </div>

</template>

<script>

// @ is an alias to /src
export default {
  name: "course_care",
  data: () => ({
    EditBool: null,
    title: "",
    code: "",
    prof: "",
  }),
  props: [""],
  watch: {
    EditBool() {
      this.showitem = this.EditBool ? this.items : this.$store.state.introduction;
      this.items = JSON.parse(JSON.stringify(this.$store.state.introduction));
    },
  },
  methods: {
    savecourse: function(event) {
      alert("저장되었습니다");
    },
    EditOn() {
      this.EditBool = true;
    },
    EditLecture() {
      this.EditBool = false;
    },
  },
  created() {
  }
};
</script>

<style scoped>
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  padding-top: 3%;
  padding-left: 6%;
  padding-bottom: 3%;
  border-bottom: 1px solid #d3d1d1;
}
.save{
  padding-right: 5%;
  padding-bottom: 3%;
  text-align: center;
}
</style>
