<template>
  <div class="lecturebody">
    <v-row v-if="user_isprof == 'prof'" justify="end" class="mb-3">
      <!--
      <v-btn class="my-3" v-bind="attrs" v-on="on" outlined color="secondary">강좌 개설하기</v-btn>-->

      <v-dialog v-if="!EditBool" v-model="NewLectureSend.dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-3" v-bind="attrs" v-on="on" outlined color="secondary" width="100">생 성</v-btn>
        </template>
        <inoutform v-model="NewLectureSend"></inoutform>
      </v-dialog>
      <v-btn
        v-if="!EditBool"
        class="ma-3"
        outlined
        color="secondary"
        width="100"
        @click="EditOn"
      >수 정</v-btn>
      <v-btn
        v-if="EditBool"
        class="ma-3"
        outlined
        color="secondary"
        width="100"
        @click="Editcancle"
      >취 소</v-btn>
      <v-btn
        v-if="EditBool"
        class="ma-3"
        outlined
        color="secondary"
        width="100"
        @click="EditLecture"
      >저 장</v-btn>
    </v-row>
    <v-row v-if="user_isprof == 'stud'" class="my-7"></v-row>
    <LectureCard
      v-model="showitem"
      :lectureCardSend="LectureCardSend"
      :EditBool="EditBool"
      :user_isprof="user_isprof"
    ></LectureCard>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Dashboard",
  components: {
    inoutform: () => import("../AboutCourses/Input_Form"),
    LectureCard: () => import("../AboutCourses/lectureCard"),
  },
  props: ["isprof"],
  data: function () {
    return {
      user_isprof: this.isprof,

      showitem: [],
      items: [],

      NewLectureSend: {
        dialog: false,
        typeofdata: "Lecture",
      },
      LectureCardSend: {
        isprof: this.isprof,
        pick_color: "secondary",
      },
      EditBool: null,
    };
  },
  watch: {
    EditBool() {
      this.showitem = this.EditBool ? this.items : this.$store.state.lecture;

      this.items = JSON.parse(JSON.stringify(this.$store.state.lecture));
    },
  },
  methods: {
    EditOn() {
      this.EditBool = true;
      this.LectureCardSend.pick_color = this.EditBool ? "none" : "secondary";
    },
    Editcancle() {
      this.$store.state.lecture = JSON.parse(JSON.stringify(this.items));
      this.EditBool = false;
    },
    EditLecture() {
      this.$store.state.lecture = JSON.parse(JSON.stringify(this.showitem));

      this.$http
        .put("/api/mycourse/" + this.$route.params.course_code + "/lecture", {
          newLecture: this.showitem,
        })
        .then((res) => {
          // alert(res.data.message);
        })
        .catch(function (error) {
          alert("error");
        });

      this.EditBool = false;
    },
  },
  created() {
    var course_code = this.$route.params.course_code;
    this.items = JSON.parse(JSON.stringify(this.$store.state.lecture));

    this.EditBool = false;
  },
};
</script>

<style scoped>
.lecturebody {
  margin: 0 auto;
  max-width: 93%;
}
</style>
