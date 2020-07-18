<template>
  <v-card>
    <v-toolbar card color="grey lighten-3">
      <v-icon>mdi-silverware</v-icon>
      <v-toolbar-title>Local hotspots</v-toolbar-title>
    </v-toolbar>

    <v-layout>
      <v-flex>
        <v-card-text>
          <v-treeview
            v-model="tree"
            :load-children="fetch"
            :items="items"
            activatable
            active-class="grey lighten-4 indigo--text"
            selected-color="indigo"
            open-on-click
            selectable
            expand-icon="mdi-chevron-down"
            on-icon="mdi-bookmark"
            off-icon="mdi-bookmark-outline"
            indeterminate-icon="mdi-bookmark-minus"
          >
          </v-treeview>
        </v-card-text>
      </v-flex>

      <v-divider vertical></v-divider>

      <v-flex
        xs12
        md6
      >
        <v-card-text>
          <div
            v-if="selections.length === 0"
            key="title"
            class="title font-weight-light grey--text pa-3 text-xs-center"
          >
            Select your favorite breweries
          </div>

          <v-scroll-x-transition
            group
            hide-on-leave
          >
            <v-chip
              v-for="(selection, i) in selections"
              :key="i"
              color="grey"
              dark
              small
            >
              <v-icon left small>mdi-beer</v-icon>
              {{ selection.name }}
            </v-chip>
          </v-scroll-x-transition>
        </v-card-text>
      </v-flex>
    </v-layout>

  </v-card>
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
