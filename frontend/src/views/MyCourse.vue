<template>
  <div>
    <div v-if="loading" class="loading">
      <img src="../assets/loading.gif">
    </div>
    <div class="wrap-body" v-if="!loading" id="content">
      <v-row>
        <div>
          <side />
        </div>
        <v-col class="pl-10">
          <list_stud v-if="user_position == 'stud'" v-model="user_course_info"></list_stud>
          <list_prof v-if="user_position == 'prof'" v-model="user_course_info"></list_prof>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Mycourse",
  components: {
    list_stud: () => import("@/components/MyCourse/List_Stud"),
    list_prof: () => import("@/components/MyCourse/List_Prof"),

    side: () => import("@/components/MyCourse/Side"),
  },
  data: function () {
    return {
      loading: true,
      user_course_info: [],
      user_position: "",
    };
  },
  created() {
    this.$http
      .get("/api/home/mycourse")
      .then((res) => {
        this.user_course_info = res.data.course_info;
        this.user_position = res.data.position;
      })
      .then(() => {
        this.loading = false;
      })
      .catch(function (error) {
        alert("error");
      })
      .then(() => {
        this.loading=false;
      })

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
.loading {
    position: fixed;
    width: 40%;
    height: 40%;
    text-align: center;
    top: 30%;
    left: 30%;
}
img{
  max-width: 100%;
  height: auto;
}
#content{
}
</style>
