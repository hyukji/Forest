<template>
  <v-card max-width="1200" class="ma-10">
    <v-list v-if="items[0]">
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        prepend-icon="fas fa-edit"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content class="pt-1">
            <v-row>
              <v-col>
                <v-list-item-title v-text="item.title" class="title_font" s></v-list-item-title>
              </v-col>
              <v-col cols="2" class="score-chip">
                <v-list-item-action>
                  <v-chip
                    color="primary"
                    text-color="white"
                    class="assignment-right"
                    v-text="`${Total} / ${PerfectTotal}`"
                  ></v-chip>
                </v-list-item-action>
              </v-col>
            </v-row>
          </v-list-item-content>
        </template>

        <v-list-item v-for="subItem in item.subitems" :key="subItem.title" @click>
          <v-list-item-content>
            <v-row>
              <v-col>
                <v-list-item-title v-text="subItem.subtitle"></v-list-item-title>
              </v-col>
              <v-col cols="3">
                <v-list-item-title
                  v-text="`${subItem.score} / ${subItem.perfect}`"
                  class="text-center"
                ></v-list-item-title>
              </v-col>
              <!-- <v-col cols="1" class="brief-center">
                /
              </v-col>
              <v-col cols="1"  class="brief-left">
                <v-list-item-title v-text="subItem.perfect"></v-list-item-title>
              </v-col>-->
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Dashboard",

  data: function () {
    return {
      items: [null],

      model: null,

      middle_title: "대시보드",
      class_list: [
        { list_title: "lab#00 파이썬 이해하기", complete: 1 },
        //{ list_title: "lab#01 변수", complete: 0 }
      ],
      assignments: [
        { list_title: "Assignment1", complete: 1 },
        { list_title: "Assignment2", complete: 0 },
        { list_title: "Assignment2", complete: 0 },
      ],
      notice: [{ list_title: "공지 1" }, { list_title: "공지 2" }],
      question: [
        { list_title: "질문있습니다" },
        { list_title: "궁금한게 있어요" },
      ],
    };
  },
  methods: {},
  computed: {
    Total: function () {
      var total_score = 0;
      this.items[0].subitems.forEach((item) => {
        //console.log(item.score);
        total_score += item.score;
      });
      return total_score;
    },
    PerfectTotal: function () {
      var Perfecttotal_score = 0;
      this.items[0].subitems.forEach((item) => {
        //console.log(item.perfect);
        Perfecttotal_score += item.perfect;
      });
      return Perfecttotal_score;
    },
  },
  created() {
    this.items = this.$store.state.assignments;
    console.log(this.items);
  },
};
</script>

<style scoped>
.title_font {
  font-size: 1.2rem;
  padding-top: 4px;
  font-weight: 600;
}
.text-center {
  font-size: 1rem;
}
.score-chip {
  padding: 0;
  text-align: right;
}
.assignment-right {
  margin-left: 30;
  font-size: 1.1rem;
}
.brief-right {
  padding-right: 0;
}

.content {
  border: 1px solid black;
  width: 800px;
}

.wrap-dashboard {
  padding-top: 1%;
}
.body-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 3%;
  padding-top: 3%;
  padding-bottom: 2%;
}
.right {
  float: right;
}

.dashboard-cards-half {
  display: inline-block;
  width: 50%;
  padding-left: 2%;
  padding-right: 2%;
}
.dashboard-cards {
  display: block;
  width: 100%;
}
.wrap-card {
  padding-bottom: 3%;
}
.card_title {
  color: #2c2e37;

  padding-top: 2.3%;
  padding-left: 3%;
  font-size: 1.25rem;
  font-weight: 550;
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
li {
  font-size: 1.2rem;
  color: #2c2e37;
  padding: 1%;
  margin: 0;
}
</style>