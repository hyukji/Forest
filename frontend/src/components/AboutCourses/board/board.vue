<template>
  <div class="wrap-body">
    <p class="body-title"></p>

    <div class="wrap-board">
      <sidebar-board sidebar_title="게시판" @ChangeComponent="change_middle_title"></sidebar-board>
      <component :is="selectedComponent" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Mycourse",
  components: {
    qnaboard: () => import("@/components/AboutCourses/board/qnaboard"),
    notice: () => import("@/components/AboutCourses/board/notice"),

    SidebarBoard: () => import("@/components/AboutCourses/board/sidebar_board"),
  },
  data: function () {
    return {
      selectedComponent: "notice",
    };
  },
  computed: {
    select_tap_array() {
      var selected_tap = [];
      var isprof = this.user_isprof;
      console.log(isprof);
      this.tap_data.forEach((items) => {
        if (items.limit != isprof) {
          selected_tap.push(items);
        }
      });
      return selected_tap;
    },
  },
  methods: {
    change_middle_title: function (component) {
      this.selectedComponent = component;
      console.log(this.selectedComponent);
    },
  },
  created() {},
};
</script>

<style scoped>
</style>
