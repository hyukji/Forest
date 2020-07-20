<template>
  <div>
    <v-chip class="body-title" color="secondary" label text-color="white" large>
      <v-icon left>mdi-label</v-icon>내 강의실
    </v-chip>
    <v-row>
      <v-col>
        <div class="body-title">수강 중인 과목</div>
        <v-divider class="ma-3" />
        <v-row>
          <card class="px-4" v-for="item in notfinish_course" :key="item" v-bind:card_info="item" />
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="body-title">수강 종료한 과목</div>
        <v-divider class="ma-3" />
        <card v-for="item in isfinish_course" :key="item" v-bind:card_info="item" />
      </v-col>
    </v-row>
  </div>
</template>



<script>
// @ is an alias to /src

export default {
  name: "Mycourse",
  components: {
    Card: () => import("@/components/MyCourse/Card")
  },
  model: {
    prop: "sendData"
  },
  props: ["sendData"],
  data: function() {
    return {
      position: "",
      isfinish_course: [],
      notfinish_course: []
    };
  },
  computed: {},
  methods: {
    course_classify() {
      this.sendData.forEach(element => {
        if (element.isfinish) {
          this.isfinish_course.push(element);
        } else {
          this.notfinish_course.push(element);
        }
      });
    }
  },
  created() {
    this.course_classify();
  }
};
</script>

<style scoped>
.wrap {
}
.body-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 2%;
}
.card {
}
</style>
