<template>
  <div class="wrap-introduction">
    <div class="introduction-half right">
      <v-card class="mx-auto" max-width="70%">
        <p class="card-title">개요</p>
        <v-container>
          <v-row>
            <div class="card-half left">
              <v-layout row wrap>
                <v-col class="wrap-total-list" cols="12" sm="10">
                  <v-icon size="40pt">{{ selected }}</v-icon>
                  <v-select
                    :items="language"
                    item-text="title"
                    item-value="icon"
                    label="Language"
                    v-model="selected">
                  </v-select>
                </v-col>
              </v-layout>
            </div>
            <div class="card-half right">
              <v-icon size="40pt">{{selected2}}</v-icon>
              <v-col class="d-flex" cols="12" sm="10">
                <v-select
                  :items="difficulty"
                  label="difficulty"
                  item-text="title"
                  item-value="icon"
                  v-model="selected2">
                </v-select>
              </v-col>
            </div>
          </v-row>
        </v-container>
      </v-card>
    </div>
    <div class="introduction-half left">
      <v-card class="mx-auto" max-width="100%">
        <p class="card-title">추천 대상</p>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-select
                :items="for_who"
                item-text="title"
                item-value="icon"
                label="Select"
                multiple
                chips
                deletable-chips
                v-model="selectwho">
              </v-select>
              <v-icon size="40pt">{{selectwho}}</v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
    <p class="card-title">과목 소개</p>
    <p class="body">준비중입니다</p>
    <p class="card-title">수업 과정</p>
    <ul>
      <v-list-item v-for="item in curriculum" :key="item.title">
        <v-list-item-avatar>
          <v-icon size="20pt" color="grey">far fa-clipboard</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            class="course_title"
            v-text="item.list_title"
          ></v-list-item-title>
          <v-list-item-content v-text="item.content"></v-list-item-content>
        </v-list-item-content>
      </v-list-item>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "introduction",
  components: {},
  data: () => ({
    selected: null,
    selected2: null,
    selectwho: [],
    middle_title: "강의소개",
    language: [
      {
        icon: "fab fa-python",
        title: "python",
      },
      {
        icon: "fab fa-java",
        title: "java",
      },
      {
        icon: "fab fa-vuejs",
        title: "vue.js",
      },
    ],
    difficulty: [
      {
        title: "입문",
        icon: "far fa-smile-wink",
      },
      {
        title: "초보",
        icon: "far fa-smile-beam",
      },
      {
        title: "중급",
        icon: "far fa-flushed",
      },
      {
        title: "고급",
        icon: "far fa-sad-tear",
      }
    ],
    for_who: [
      {
        icon: "fas fa-flushed",
        title: "코딩 입문자",
      },
      {
        icon: "fab fa-python",
        title: "파이썬 개발자",
      },
      {
        icon: "fab fa-java",
        title: "java 개발자",
      },
    ],
    curriculum: [
      {
        list_title: "Course1",
        content: "course1 내용입니다",
      },
      {
        list_title: "Course2",
        content: "course2 내용입니다",
      },
      {
        list_title: "Course3",
        content: "course3 내용입니다",
      },
    ],
    customFilter(item, queryText, itemText) {
      const hasValue = (val) => (val != null ? val : "")
      const text = hasValue(item.name)
      const query = hasValue(queryText)
      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      )
    },
  }),
  methods: {},
};
</script>

<style scoped>
.wrap-body {
  min-width: 800pt;
  max-width: 1000pt;
  width: 70%;
  padding-top: 1%;
  margin: 0 auto;
}
.wrap-total-list {
  margin: 0 auto;
  text-align: center;
}
.toal-list-title {
  font-size: 1.25rem;
  padding-top: 6%;
  font-weight: 550;
}
.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  padding-top: 3%;
  padding-left: 6%;
  padding-bottom: 3%;
  border-bottom: 1px solid #d3d1d1;
}
.total-card {
  padding-top: 10%;
}
.body-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 3%;
  padding-top: 3%;
  padding-bottom: 2%;
}
.introduction-half {
  display: inline-block;
  width: 50%;
  padding-left: 2%;
  padding-right: 2%;
}
.card-half {
  display: inline-block;
  width: 50%;
  padding-left: 2%;
  padding-right: 2%;
  text-align: center;
}
.course_title {
  font-size: 1.2rem;
  font-weight: 550;
}
.body {
  padding-left: 5%;
  color: gray;
}
.text-center {
  padding-bottom: 2%;
}
.d-flex {
  text-algin: center;
}

</style>
