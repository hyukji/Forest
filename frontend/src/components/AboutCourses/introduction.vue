<template>
  <div>
    <v-row  justify="end" class="mb-3">
      <!--
      <v-btn class="my-3" v-bind="attrs" v-on="on" outlined color="secondary">강좌 개설하기</v-btn>-->

      <v-dialog v-if="!EditBool"  persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="!EditBool"
            class="ma-3"
            outlined
            color="secondary"
            width="100"
            @click="EditOn"
          >수 정</v-btn>
        </template>
        <inoutform ></inoutform>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="cards">
          <p class="card-title">개요</p>
          <v-container>
            <v-row>
              <v-col class="wrap-total-list">
                <p>Language</p>
                <v-icon size="40pt">{{ course.language.icon }}</v-icon>
                <p>{{ course.language.title }}</p>
              </v-col>
              <v-col class="wrap-total-list">
                <p>Difficulty</p>
                <v-icon size="40pt">{{ course.difficulty.icon }}</v-icon>
                <p>{{ course.difficulty.title }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="cards">
          <p class="card-title">추천 대상</p>
          <v-container>
            <v-row>
              <v-col class="wrap-total-list" v-for="item in course.recommend" :key="item.title">
                <v-icon size="40pt" v-text="item.icon"></v-icon>
                <v-list-item-title class="toal-list-title" v-text="item.title"></v-list-item-title>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>
    <p class="card-title">과목 소개</p>
    <Editor
      v-if="EditBool"
      class="wrap-app "
      mode="preview"
      ref="editor"
      hint="markdown 형식으로 작성하세요"
      :outline="false"
      :render-config="renderConfig"
      v-model="text"
      />
    <Editor
      v-if="!EditBool"
      class="wrap-app "
      mode="viewer"
      ref="editor"
      hint="markdown 형식으로 작성하세요"
      :outline="false"
      :render-config="renderConfig"
      v-model="text"
      />
    <p class="card-title">수업 과정</p>
    <ul>
      <v-list-item v-for="item in curriculum" :key="item.title">
        <v-list-item-avatar>
          <v-icon size="20pt" color="grey">far fa-clipboard</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="course_title" v-text="item.list_title"></v-list-item-title>
          <v-list-item-content v-text="item.content"></v-list-item-content>
        </v-list-item-content>
      </v-list-item>
    </ul>
    <div class="save">
      <v-btn
        v-if="EditBool"
        class="ma-3"
        outlined
        color="secondary"
        width="100"
        @click="EditLecture"
      >저 장</v-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Editor } from "vuetify-markdown-editor";
import { VApp } from 'vuetify/lib';
export default {
  name: "introduction",
  components: {Editor, VApp},
  data: () => ({
    selected: null,
    selected2: null,
    EditBool: null,
    selectwho: null,
    text: "",
        renderConfig: {
      // Mermaid config
      mermaid: {
        theme: "dark"
      }
    },
    course: {
      language: {
        icon: "fab fa-python",
        title: "python",
      },
      difficulty: {
        icon: "far fa-smile-wink",
        title: "입문",
      },
      recommend: [
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
      intro: "파이썬 기본 강좌입니다",
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
    },
    middle_title: "강의소개",
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
      const hasValue = (val) => (val != null ? val : "");
      const text = hasValue(item.name);
      const query = hasValue(queryText);
      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  }),
  watch: {
    EditBool() {
      this.showitem = this.EditBool ? this.items : this.$store.state.introduction;
      this.items = JSON.parse(JSON.stringify(this.$store.state.introduction));
    },
  },
  methods: {
    EditOn() {
      this.EditBool = true;
    },
    EditLecture() {
      this.EditBool = false;
    },
  },
};
</script>

<style scoped>
.cards{
  height: 220px;
}
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
  width: 50%;
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
