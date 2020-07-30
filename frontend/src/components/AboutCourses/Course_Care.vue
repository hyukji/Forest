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
                  <v-icon size="40pt">{{ course.language }}</v-icon>
                  <v-select
                    :items="language"
                    item-text="title"
                    item-value="icon"
                    label="Language"
                    v-model="course.language">
                  </v-select>
                </v-col>
              </v-layout>
            </div>
            <div class="card-half right">
              <v-icon size="40pt">{{course.difficulty}}</v-icon>
              <v-col class="d-flex" cols="12" sm="10">
                <v-select
                  :items="difficulty"
                  label="difficulty"
                  item-text="title"
                  item-value="icon"
                  v-model="course.difficulty">
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
                v-model="course.recommend">
              </v-select>
              <v-icon size="40pt">{{course.recommend}}</v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
    <p class="paragraph-title">과목 소개</p>
    <v-app>
      <Editor
        mode="preview"
        ref="editor"
        hint="markdown 형식으로 작성하세요"
        :outline="false"
        :render-config="renderConfig"
        v-model="text"/>
    </v-app>
    <p class="paragraph-title">수업 과정</p>
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
    <div class="save">
      <v-btn class="teal white--text"
      v-on:click="savecourse"
      x-large>
      저장</v-btn>
    </div>
  </div>

</template>

<script>
import { Editor } from "vuetify-markdown-editor";
import { VApp } from 'vuetify/lib';
// @ is an alias to /src
export default {
  name: "introduction",
  components: {Editor, VApp},
  data: () => ({
    selected: null,
    selected2: null,
    selectwho: null,
    text: "",
    renderConfig: {
      // Mermaid config
      mermaid: {
        theme: "dark"
      }
    },
    middle_title: "강의소개",
    course: {
      language: "",
      difficulty: "",
      recommend: "",
      intro: "",
    },
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
  methods: {
    savecourse: function(event) {
      alert("저장되었습니다");
    },
  },
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
  padding-bottom: 3%;
  border-bottom: 1px solid #d3d1d1;
  text-align: center;
  margin: 20px auto;
}
.paragraph-title {
  font-size: 1.2rem;
  font-weight: 600;
  padding-top: 3%;
  padding-bottom: 3%;
  border-bottom: 1px solid #d3d1d1;
  max-width: 90%;
  text-align: center;
  margin: 20px auto;
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
.save{
  padding-right: 5%;
  padding-bottom: 3%;
  text-align: center;
}

</style>
