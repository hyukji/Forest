<template>
  <div class="wrap-introduction">
      <div class="introduction-half right">
      <v-card class="mx-auto" max-width="70%">
        <p class="card-title">개요</p>
        <v-container>
          <v-row>
            <div class="card-half left">
              <v-container fluid>
                <v-layout row wrap>
                  <v-col class="d-flex" cols="12" sm="10">
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="10">

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
              </v-container>
            </div>
            <div class="card-half right">
              <v-icon size="40pt">fas fa-chart-bar</v-icon>
              <v-col class="d-flex" cols="12" sm="10">
                <v-select
                  :items="difficulty"
                  label="difficulty"
                  item-text="title"
                  v-model="selected">
                  <option v-for="option in difficulty" v-bind:value="option.color">
                  </option>
                </v-select>
              </v-col>
            </div>
          </v-row>
        </v-container>
      </v-card>
    </div>
    <div class="introduction-half left">
      <v-card class="mx-auto" max-width="70%">
        <p class="card-title">추천 대상</p>
        <v-container>
          <v-row>
            <v-col class="wrap-total-list" v-for="item in for_who" :key="item.title">
              <v-list three-line>
                <v-icon size="40pt" v-text="item.icon"></v-icon>
                <v-list-item-title class="toal-list-title"  v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
    <p class="card-title"> 과목 소개 </p>
    <p class="body"> 준비중입니다 </p>
    <p class="card-title"> 수업 과정 </p>
    <ul>
      <v-list-item v-for="item in curriculum" :key="item.title">
        <v-list-item-avatar>
          <v-icon size="20pt" color="gray">far fa-clipboard</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="course_title" v-text="item.list_title"></v-list-item-title>
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
    selected: ,
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
      }
    ],
    difficulty:[
      {
        title: "입문",
        color: "yellow",
      },
      {
        title: "초보",
        color: "green",
      },
      {
        title: "중급",
        color: "blue",
      },
      {
        title: "고급",
        color: "red",
      }
    ],
    for_who: [
      {
        icon: "fas fa-flushed",
        title: "코딩 입문자",
        subtitle: "코딩 시작"
      },
      {
        icon: "fab fa-python",
        title: "파이썬 개발자",
        subtitle: "파이썬 기초"
      }
    ],
    curriculum: [
      {
        list_title: "Course1",
        content: "course1 내용입니다"
      },
      {
        list_title: "Course2",
        content: "course2 내용입니다"
      },
      {
        list_title: "Course3",
        content: "course3 내용입니다"
      }
    ],
    customFilter (item, queryText, itemText) {
      const hasValue = val => val != null ? val : ''
        const text = hasValue(item.name)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
        }
  }),

  methods: {
    change_title: function(title) {
      this.title = title;
    }
  },
  watch: {
    selected(val) {
      console.log(val)
    }
  }
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
.card-half{
  display: inline-block;
  width: 50%;
  padding-left: 2%;
  padding-right: 2%;
  text-align: center;
}
.course_title{
  font-size: 1.2rem;
  font-weight: 550;
}
.body{
  padding-left: 5%;
  color: gray;
}
.text-center{
  padding-bottom: 2%;
}
.d-flex{
  text-algin: center;
}
</style>
