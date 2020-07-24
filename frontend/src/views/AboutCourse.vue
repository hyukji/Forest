<template>
  <div v-if="user_isprof" class="wrap-body">
    <v-card class="mx-auto" outlined>
      <v-container width="100%" height="150pt">
        <v-row>
          <v-img class="mx-6" src="../assets/python.png"></v-img>
          <div class="brief-text">
            <v-row align="end">
              <v-col cols="6">
                <v-card-title class="brief-title mx-5">{{courseData.name}}</v-card-title>
                <v-card-subtitle class="brief-subtitle mx-6">{{courseData.prof}}</v-card-subtitle>
              </v-col>
              <v-btn class="secondary white--text btn-learn mb-5" x-large width="175" outlined>바로학습</v-btn>
            </v-row>
            <v-col cols="11">
              <v-card-subtitle class="brief-process-line-title pt-2">진행률 70%</v-card-subtitle>
              <v-progress-linear
                class="mx-3"
                v-model="progess_data"
                color="primary"
                height="10"
                :rounded="true"
              ></v-progress-linear>
            </v-col>
          </div>
        </v-row>
      </v-container>
    </v-card>

    <div class="wrap-app-menu">
      <v-row class="mt-3">
        <v-btn
          v-for="(title, i) of select_tap_array"
          :key="i"
          class="menu-title"
          text
          v-on:click="change_middle_title(title.middle_title)"
        >{{ title.middle_title }}</v-btn>
      </v-row>
    </div>

    <p class="body-title">{{ selectedTitle }}</p>

    <component v-bind:is="selectedComponent"></component>

    <!--
    <dashboard v-if="middle_title == '대시보드'"></dashboard>
    <grade v-else-if="middle_title == '학습현황'"></grade>
    <introduction v-else-if="middle_title == '강의소개'"></introduction>
    <lectures v-else-if="middle_title == '수업목록'"></lectures>
    <assignments v-else-if="middle_title == '과제목록'"></assignments>

    <div v-else class="wrap-board">
      <sidebar_board
        :sidebar_title="middle_title"
        @ChangeComponent="change_middle_title"
      ></sidebar_board>
      <notice v-if="middle_title == '공지사항'"></notice>
      <freeboard v-if="middle_title == '자유게시판'"></freeboard>
      <qnaboard v-if="middle_title == 'QnA'"></qnaboard>
    </div>-->
  </div>
</template>

<script>
import { eventBus } from "../main.js";

// @ is an alias to /src
export default {
  name: "Mycourse",
  components: {
    lectures: () => import("@/components/AboutCourses/lectures"),
    freeboard: () => import("@/components/AboutCourses/board/freeboard"),
    qnaboard: () => import("@/components/AboutCourses/board/qnaboard"),
    notice: () => import("@/components/AboutCourses/board/notice"),
    dashboard: () => import("@/components/AboutCourses/dashboard"),
    grade: () => import("@/components/AboutCourses/grade"),
    introduction: () => import("@/components/AboutCourses/introduction"),
    sidebar_board: () =>
      import("@/components/AboutCourses/board/sidebar_board"),
    assignments: () => import("@/components/AboutCourses/assignments"),
    stud_care: () => import("../components/AboutCourses/Student_Care/student"),
    course_care: () => import("../components/AboutCourses/Course_Care")
  },
  data: function() {
    return {
      courseData: {
        name: null,
        prof: null,
        code: null,
        language: null
      },

      dashboard: [null],
      introduction: [null],
      lecture: [null],
      assignment: [null],
      board: [null],

      selectedComponent: "dashboard",
      selectedTitle: "대시보드",

      tap_data: [
        { component_name: "dashboard", middle_title: "대시보드" },
        { component_name: "introduction", middle_title: "강의소개" },
        { component_name: "lectures", middle_title: "수업목록" },
        { component_name: "assignments", middle_title: "과제목록" },
        { component_name: "notice", middle_title: "게시판" },
        { component_name: "grade", middle_title: "학습현황", limit: "prof" },
        {
          component_name: "stud_care",
          middle_title: "학생관리",
          limit: "stud"
        },
        {
          component_name: "course_care",
          middle_title: "강의관리",
          limit: "stud"
        }
      ],
      progess_data: 70,
      user_isprof: null
    };
  },
  computed: {
    select_tap_array() {
      var selected_tap = [];
      var isprof = this.user_isprof;
      console.log(isprof);
      this.tap_data.forEach(items => {
        if (items.limit != isprof) {
          selected_tap.push(items);
        }
      });
      return selected_tap;
    }
  },
  methods: {
    change_middle_title: function(title) {
      var selected_com = "";
      this.tap_data.forEach(function(value) {
        if (value.middle_title == title) {
          selected_com = value.component_name;
        }
      });

      this.selectedComponent = selected_com;
      this.selectedTitle = title;
    },
    getCoursedData: function(code) {
      console.log(code);
      this.$http
        .post("/api/mycourse/coursedata", { code: code })
        .then(res => {
          if (res.data.result) {
            this.user_isprof = res.data.isprof;
            this.courseData = res.data.basic_data;
            this.dashboard = res.data.dashboard;
            this.introduction = res.data.introduction;
            this.lecture = res.data.lecture;
            this.assignment = res.data.assignment;
            this.board = res.data.board;

            console.log(this.user_isprof);
          } else {
            alert(res.data.message);
            this.$router.push("/mycourse");
          }
        })
        .catch(function(error) {
          alert("error to getdata");
        });
    }
  },
  created() {
    this.courseData.code = this.$route.params.course_code;

    if (this.$route.query.tab != null) {
      this.middle_title = this.$route.query.tab;
    }
    eventBus.$on("bell_route", route => {
      this.middle_title = route;
    });
    this.$route.query.tab = "";
    this.getCoursedData(this.courseData.code);
  }
};
</script>
<style scoped>
.wrap-body {
  min-width: 800pt;
  max-width: 1000pt;
  width: 70%;
  padding-top: 1%;
  margin: 0 auto;
}
.wrap-app-menu {
  padding-bottom: 1%;
  border-bottom: 1px solid #d3d1d1;
}
.body-title {
  width: auto;
  font-size: 1.7rem;
  font-weight: 600;
  padding-left: 3%;
  padding-top: 3%;
}
.brief-text {
  width: 65%;
}
.brief-text-left {
  width: 70%;
  display: inline-block;
}
.v-card-title {
  font-size: 5rem;
}
.brief-title {
  padding-top: 6%;
  font-size: 1.8rem;
  font-weight: 550;
}
.brief-subtitle {
  padding-top: 1%;
  font-size: 1.1rem;
}
.brief-process-line-title {
  padding-top: 2.5%;
  padding-bottom: 1.2%;
}
.btn-learn {
  margin: 0 auto;
}
</style>
