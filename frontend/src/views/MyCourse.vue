<template>
  <div class="wrap-body">
    <v-row>
      <div>
        <side />
      </div>
      <v-col class="pl-10">
        <list v-model="user_course_info"></list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Mycourse",
  components: {
    list: () => import("@/components/MyCourse/List"),
    side: () => import("@/components/MyCourse/Side")
  },
  data: function() {
    return {
      user_course_info: []
    };
  },
  created() {
    this.$http
      .get("/api/home/mycourse")
      .then(res => {
        this.user_course_info = res.data.course_info;
      })
      .catch(function(error) {
        alert("error");
      });
  }
};
</script>

<style scoped>
.wrap-body {
  width: 100%;
  height: 100%;
  background-color: "#51844c";
}
.body-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 2%;
}
</style>
