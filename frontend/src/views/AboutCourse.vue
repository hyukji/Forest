<template>
  <div>
    <div v-if="loading" class="loading">
      <img src="../assets/loading.gif" />
    </div>
    <div v-if="user_isprof" class="wrap-body">
      <v-card class="mx-auto" outlined>
        <v-container width="100%" height="150pt">
          <v-row>
            <v-img class="mx-6" src="../assets/python.png"></v-img>
            <div class="brief-text">
              <v-row align="end">
                <v-col cols="6">
                  <v-card-title class="brief-title mx-5">
                    {{ courseData.name }}
                  </v-card-title>
                  <v-card-subtitle class="brief-subtitle mx-6">
                    {{ courseData.prof[0] }}
                  </v-card-subtitle>
                </v-col>
                <v-btn
                  class="secondary white--text btn-learn mb-5"
                  x-large
                  width="175"
                  outlined
                  >바로학습</v-btn
                >
              </v-row>
              <v-col cols="11">
                <v-card-subtitle class="brief-process-line-title pt-2"
                  >진행률 70%</v-card-subtitle
                >
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
            >{{ title.middle_title }}</v-btn
          >
        </v-row>
      </div>

      <p class="body-title">{{ selectedTitle }}</p>
      <component
        v-bind:is="selectedComponent"
        :isprof="user_isprof"
      ></component>
      <!--
      <dashboard v-if="middle_title == '대시보드'"></dashboard>
      <grade v-else-if="middle_title == '학습현황'"></grade>
      <introduction v-else-if="middle_title == '강의소개'"></introduction>
      <lectures v-else-if="middle_title == '수업목록'"></lectures>
      <assignments v-else-if="middle_title == '과제목록'"></assignments>-->
      <!-- <div v-else class="wrap-board">
        <sidebar_board
          :sidebar_title="middle_title"
          @ChangeComponent="change_middle_title"
        ></sidebar_board>
        <notice v-if="middle_title == '공지사항'"></notice>
        <freeboard v-if="middle_title == '자유게시판'"></freeboard>
        <qnaboard v-if="middle_title == 'QnA'"></qnaboard>
      </div>-->
    </div>
  </div>
</template>

<script>
import { eventBus } from "../main.js"

// @ is an alias to /src
export default {
  name: "Mycourse",
  components: {
    lectures: () => import("@/components/AboutCourses/lectures"),
    dashboard: () => import("@/components/AboutCourses/dashboard"),
    grade: () => import("@/components/AboutCourses/grade"),
    introduction: () => import("@/components/AboutCourses/introduction"),
    board: () => import("@/components/AboutCourses/board/board"),
    assignments: () => import("@/components/AboutCourses/assignments"),
    stud_care: () =>
      import("../components/AboutCourses/Student_Care/student_care"),
    course_management: () => import("../components/AboutCourses/course_management"),
  },
  data: function() {
    return {
      loading: true,
      progess_data: 70,

      courseData: {
        name: null,
        prof: null,
        code: null,
        language: null,
      },

      user_isprof: null,
      selectedComponent: "dashboard",
      selectedTitle: "대시보드",

      tap_data: [
        { component_name: "dashboard", middle_title: "대시보드" },
        { component_name: "introduction", middle_title: "강의소개" },
        { component_name: "lectures", middle_title: "수업목록" },
        { component_name: "assignments", middle_title: "과제목록" },
        { component_name: "board", middle_title: "게시판" },
        { component_name: "grade", middle_title: "학습현황", limit: "prof" },
        {
          component_name: "stud_care",
          middle_title: "학생관리",
          limit: "stud",
        },
        {
          component_name: "course_management",
          middle_title: "강의관리",
          limit: "stud",
        },
      ],
    }
  },
  computed: {
    select_tap_array() {
      var selected_tap = []
      var isprof = this.user_isprof
      console.log(isprof)
      this.tap_data.forEach((items) => {
        if (items.limit != isprof) {
          selected_tap.push(items)
        }
      })
      return selected_tap
    },
  },
  methods: {
    change_middle_title: function(title) {
      var selected_com = ""
      this.tap_data.forEach(function(value) {
        if (value.middle_title == title) {
          selected_com = value.component_name
        }
      })

      this.selectedComponent = selected_com
      this.selectedTitle = title
    },
    getCoursedData: function() {
      this.$http
        .get("/api/mycourse/" + this.courseData.code + "/coursedata")
        .then((res) => {
          if (res.data.result) {
            this.courseData.name = res.data.db_course.name
            this.courseData.code = res.data.db_course.code
            this.courseData.language = res.data.db_course.language
            this.courseData.prof = res.data.db_course.prof

            this.user_isprof = res.data.isprof
            this.$store.commit("setCourseData", res.data.db_course)
          } else {
            alert(res.data.message)
            this.$router.push("/mycourse")
          }
        })
        .then(() => {
          this.loading = false
        })
        .catch(function(error) {
          alert("error to getdata")
        })
    },
  },
  created() {
    this.courseData.code = this.$route.params.course_code

    if (this.$route.query.tab != null) {
      this.middle_title = this.$route.query.tab
    }
    eventBus.$on("bell_route", (route) => {
      this.middle_title = route
    })
    this.$route.query.tab = ""
    this.getCoursedData()
  },
}
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
  font-size: 1.9rem;
  font-weight: 600;
  padding-left: 4%;
  padding-top: 4%;
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
.loading {
  position: fixed;
  width: 40%;
  height: 40%;
  text-align: center;
  top: 30%;
  left: 30%;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
