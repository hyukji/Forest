<template>
  <div class="wrap-body">


    <p class="body-title"></p>

    <div class="wrap-board">
      <sidebar-board
        @ChangeComponent="change_middle_title"
      ></sidebar-board>
      <component :is='selectedComponent'/>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
export default {
  name: "Mycourse",
  components: {
    student: () => import("@/components/AboutCourses/Student_Care/lec_ass_list/lec1"),
    lec_ass: () => import("@/components/AboutCourses/Student_Care/lec_ass_list/lec2"),
    statics: () => import("@/components/AboutCourses/Student_Care/lec_ass_list/ass1"),

    SidebarBoard: () =>
      import("@/components/AboutCourses/Student_Care/lec_ass_select"),

  },
  data: function() {
    return {
      selectedComponent: 'student'
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
    change_middle_title: function(component) {
      this.selectedComponent = component
      console.log(this.selectedComponent)
    },
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
</style>
