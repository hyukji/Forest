<template>
  <v-card
    max-width="1200"
    class="ma-10"
  >
    <v-list >
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
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
              <v-chip color="primary" text-color="white"  class="assignment-right" v-text="`${Total} / ${PerfectTotal}`"></v-chip>
            </v-list-item-action>
            </v-col>
          </v-row>
          </v-list-item-content>

        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          @click="">

          <v-list-item-content>
            <v-row>
              <v-col>
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-col>
              <v-col cols="3">
                <v-list-item-title v-text="`${subItem.score} / ${subItem.perfect}`"
                class="text-center"></v-list-item-title>
              </v-col>
              <!-- <v-col cols="1" class="brief-center">
                /
              </v-col>
              <v-col cols="1"  class="brief-left">
                <v-list-item-title v-text="subItem.perfect"></v-list-item-title>
              </v-col> -->

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

data: function() {
    return {
      items: [
        {
          icon: "fas fa-edit",
          title: '과제 01',
          items: [
            { title: '01. 문자열 출력하기', score: 10, perfect:20},
            { title: '02. 사칙연산 활용하기', score: 20, perfect:20 },
            { title: '03. 구구단 식 만들기', score: 25, perfect:30 }
          ]
        }
      ],

      model: null,
      classes: [
         ['h1', 'Heading 1', '6rem', '300', '-0.09375rem', -1],
         ['h2', 'Heading 2', '3.75rem', '300', '-0.03125rem', 0],
         ['h3', 'Heading 3', '3rem', '400', 'normal', 1],
         ['h4', 'Heading 4', '2.125rem', '400', '0.015625rem', 2],
         ['h5', 'Heading 5', '1.5rem', '400', 'normal', 2],
         ['h6', 'Heading 6', '1.25rem', '500', '0.009375rem', 3],
         ['subtitle-1', 'Subtitle 1', '1rem', '400', '0.009375rem', 4],
         ['subtitle-2', 'Subtitle 2', '0.875rem', '500', '0.00625rem', 4],
         ['body-1', 'Body 1', '1rem', '400', '0.03125rem', 4],
         ['body-2', 'Body 2', '0.875rem', '400', '0.015625rem', 4],
         ['button', 'Button', '0.875rem', '500', '0.078125rem', 4],
         ['caption', 'Caption', '0.75rem', '400', '0.025rem', 4],
         ['overline', 'Overline', '0.75rem', '500', '0.1666666667em', 4],
       ],

      show: false,
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

    }
          },
  methods: {},
  computed: {
  Total: function () {
    var total_score = 0
  this.items[0].items.forEach((item) => {
      console.log( item.score );
      total_score += item.score
  });
    return total_score
  },
  PerfectTotal: function () {
    var Perfecttotal_score = 0
  this.items[0].items.forEach((item) => {
      console.log( item.perfect );
      Perfecttotal_score += item.perfect
  });
    return Perfecttotal_score
  },
}
}

</script>

<style scoped>
.title_font {
  font-size : 1.2rem;
  padding-top : 4px;
  font-weight : 600;
}
.text-center{
  font-size: 1rem
}
.score-chip {
  padding : 0;
  text-align: right;
}
.assignment-right {
  margin-left: 30;
  font-size: 1.1rem;
}
.brief-right {
  padding-right: 0;
}

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
