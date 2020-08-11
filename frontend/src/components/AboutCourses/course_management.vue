title<template>
  <div>
    <v-row  justify="end" class="mb-3">
      <v-dialog  persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="!EditBool"
            class="ma-3"
            outlined
            color="secondary"
            width="100"
            @click="EditOn"
          >수 정</v-btn>
          <v-btn
            v-show="EditBool"
            class="ma-3"
            outlined
            color="secondary"
            width="100"
            @click="Editcancle"
          >취 소</v-btn>
        </template>
        <inoutform ></inoutform>
      </v-dialog>
    </v-row>
    <div>
      <p class="card-title"> 강좌 제목 </p>
      <v-col v-show="!EditBool">
        <p>{{course.title}}</p>
      </v-col>
      <v-col v-show="EditBool">
        <v-form>
            <v-text-field
              v-model="course.title"
              label="강좌 제목"
            ></v-text-field>
          </v-form>
      </v-col>
    </div>
    <div>
      <p class="card-title"> 이미지 관리 </p>
    </div>
    <div>
      <p class="card-title"> 교수 목록 </p>
      <v-col v-show="!EditBool" class="wrap-total-list" v-for="item in course.prof" :key="item.title">
        <v-list-item-title class="toal-list-title" v-text="item"></v-list-item-title>
      </v-col>
      <v-col v-show="EditBool">
        <v-form>
            <v-autocomplete
              :filter="customFilter"
              multiple
              :items="professor"
              v-model="course.prof"
              label="교수 추가"
            ></v-autocomplete>
        </v-form>
      </v-col>
    </div>
    <div class="save">
      <v-btn
        v-if="EditBool"
        class="ma-3"
        outlined
        color="secondary"
        width="100"
        @click="EditCM"
      >저 장</v-btn>
    </div>
  </div>

</template>

<script>

// @ is an alias to /src
export default {
  name: "course_management",
  data: () => ({
    showitem: [],
    EditBool: null,
    course: null,
    professor: [ "신동훈", "이성진", "김선준"],
    customFilter(item, queryText, itemText) {
      const hasValue = (val) => (val != null ? val : "");
      const text = hasValue(item.name);
      const query = hasValue(queryText);
      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  }),
  watch: {
    EditBool() {
      this.showitem = this.EditBool ? this.course : this.$store.state.course_management;
      this.course = JSON.parse(JSON.stringify(this.$store.state.course_management));
    },
  },
  methods: {
    EditOn() {
      this.EditBool = true;
    },
    Editcancle() {
      this.$store.state.course_management = JSON.parse(JSON.stringify(this.course));
      this.EditBool = false;
    },
    EditCM() {
      this.$store.state.course_management = JSON.parse(JSON.stringify(this.showitem));
      this.$http
        .put("/api/mycourse/" + this.$route.params.course_code + "/course_management", {
          newCM: this.course,
        })
        .then((res) => {
          // alert(res.data.message);
        })
        .catch(function (error) {
          alert("error");
        });
      this.EditBool = false;
      console.log(this.EditBool);
    },
  },
  created() {
    var course_code = this.$route.params.course_code;
    this.course = JSON.parse(JSON.stringify(this.$store.state.course_management));
    console.log("this ",this.course);
    this.EditBool = false;
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
.total-list-title {
  font-size: 1.25rem;
  padding-top: 6%;
  font-weight: 550;
}
.wrap-total-list {
  margin: 0 auto;
  text-align: center;
}
</style>
