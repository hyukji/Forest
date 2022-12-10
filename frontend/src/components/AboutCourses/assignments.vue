<template>
  <div class="assignbody">
    <v-row v-if="user_isprof == 'prof'" justify="end" class="mb-3">
      <!--
      <v-btn class="my-3" v-bind="attrs" v-on="on" outlined color="secondary">강좌 개설하기</v-btn>-->

      <v-dialog v-if="!EditBool" v-model="NewAssignSend.dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-3" v-bind="attrs" v-on="on" outlined color="secondary" width="100">생 성</v-btn>
        </template>
        <inoutform v-model="NewAssignSend"></inoutform>
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
        @click="EditAssign"
      >저 장</v-btn>
    </v-row>
    <v-row v-if="user_isprof == 'stud'" class="my-7"></v-row>
    <AssignCard
      v-model="showitem"
      :assignCardSend="AssignCardSend"
      :EditBool="EditBool"
      :user_isprof="user_isprof"
    ></AssignCard>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Dashboard",
  components: {
    inoutform: () => import("../AboutCourses/Input_Form"),
    AssignCard: () => import("../AboutCourses/assignCard"),
  },
  props: ["isprof"],
  data: function () {
    return {
      user_isprof: this.isprof,

      showitem: [],
      items: [],

      NewAssignSend: {
        dialog: false,
        typeofdata: "Assignment",
      },
      AssignCardSend: {
        isprof: this.isprof,
        pick_color: "secondary",
      },
      EditBool: null,
    };
  },
  watch: {
    EditBool() {
      this.showitem = this.EditBool
        ? this.items
        : this.$store.state.assignments;

      this.items = JSON.parse(JSON.stringify(this.$store.state.assignments));
    },
  },
  methods: {
    EditOn() {
      this.EditBool = true;
      this.AssignCardSend.pick_color = this.EditBool ? "none" : "secondary";
    },
    Editcancle() {
      this.$store.state.assignments = JSON.parse(JSON.stringify(this.items));
      this.EditBool = false;
    },
    EditAssign() {
      this.$store.state.assignments = JSON.parse(JSON.stringify(this.showitem));
      this.$http
        .put("/api/mycourse/" + this.$route.params.course_code + "/assign", {
          newAssign: this.showitem,
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
    this.items = JSON.parse(JSON.stringify(this.$store.state.assignments));
    this.EditBool = false;
  },
};
</script>

<style scoped>
.assignbody {
  margin: 0 auto;
  max-width: 93%;
}
.extracharge {
  margin: 0 100pt;
}
</style>
