<template>
  <div>
      <v-card width="100%" max-width="120%" class="content" outlined>

        <v-list-item three-line>

          <v-list-item-content>
            <v-list-item-title> 수업 1 . 파이썬의 출력 방법 </v-list-item-title>

            <v-progress-linear v-model="skill" color="blue-grey" height="13" rounded >
              <template v-slot="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>

          </v-list-item-content>

          <div class="brief-text-right">
            <v-btn class="teal white--text btn-learn" outlined width="90%" height="40">수업하러 가기</v-btn>
          </div>


        </v-list-item>

      </v-card>
  </div>
</template>


<script>
// @ is an alias to /src
export default {
  name: "Dashboard",
  components: {},
  data: () => ({
    middle_title: "대시보드",
    class_list: [
      { list_title: "lab#00 파이썬 이해하기", complete: 1 }
      //{ list_title: "lab#01 변수", complete: 0 }
    ],
    assignments: [
      { list_title: "Assignment1", complete: 1 },
      { list_title: "Assignment2", complete: 0 },
      { list_title: "Assignment2", complete: 0 }
    ],
    notice: [{ list_title: "공지 1" }, { list_title: "공지 2" }],
    question: [
      { list_title: "질문있습니다" },
      { list_title: "궁금한게 있어요" }
    ]
  }),
  methods: {}
};
</script>

<style scoped>
.content{
  border : 1px solid black;
  width : 800px
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
