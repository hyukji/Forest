<template>
  <div>
    <v-row  justify="end" class="mb-3">
      <v-dialog  persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="!EditBool"
            class="ma-3"
            outlined
            color="secondary"
            width="100"
            @click="EditOn"
          >수 정</v-btn>
          <v-btn
            v-if="EditBool"
            class="ma-3"
            outlined
            color="secondary"
            width="100"
            @click="Editcancle"
          >취 소</v-btn>
        </template>
        <inoutform ></inoutform>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col>
        <v-card v-if="!EditBool" class="cards">
          <p class="card-title">개요</p>
          <v-container>
            <v-row>
              <v-col class="wrap-total-list">
                <p>Language</p>
                <p class="intro-title">{{ course.language}}</p>
              </v-col>
              <v-col class="wrap-total-list">
                <p>Difficulty</p>
                <p class="intro-title">{{ course.difficulty}}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card v-if="EditBool" class="cards">
          <p class="card-title">개요</p>
          <v-container>
            <v-row>
              <v-col class="wrap-total-list">
                <v-autocomplete
                  :items="language"
                  :filter="customFilter"
                  label="Language"
                  v-model="course.language"
                ></v-autocomplete>
              </v-col>
              <v-col class="wrap-total-list">
                <v-autocomplete
                  :items="difficulty"
                  :filter="customFilter"
                  label="Difficulty"
                  v-model="course.difficulty"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card v-if="!EditBool" class="cards">
          <p class="card-title">추천 대상</p>
          <v-container>
            <v-row v-if="!course.recommend">
              <v-col class="wrap-total-list">
                <v-icon class="fad fa-carrot" style="font-size: 50pt; --fa-primary-color: green; --fa-secondary-color: tomato; --fa-secondary-opacity: 1.0;" ></v-icon>
                <v-list-item-title> 선택해주세요 </v-list-item-title>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col class="wrap-total-list" v-for="item in course.recommend" :key="item.title">
                <v-list-item-title class="toal-list-title" v-text="item"></v-list-item-title>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card v-if="EditBool" class="cards">
          <p class="card-title">추천 대상</p>
          <v-container>
            <v-autocomplete
              :items="recommend"
              :filter="customFilter"
              label="추천대상"
              v-model="course.recommend"
              multiple
            ></v-autocomplete>
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
      v-model="course.intro"
      />
    <Editor
      v-if="!EditBool"
      class="wrap-app "
      mode="viewer"
      ref="editor"
      hint="markdown 형식으로 작성하세요"
      :outline="false"
      :render-config="renderConfig"
      v-model="course.intro"
      />
    <div class="save">
      <v-btn
        v-if="EditBool"
        class="ma-3"
        outlined
        color="secondary"
        width="100"
        @click="EditIntro"
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
    showitem: [],
    EditBool: null,
        renderConfig: {
      // Mermaid config
      mermaid: {
        theme: "dark"
      }
    },
    language: [ "python", "javascript", "vue.js"],
    difficulty: [ "입문", "초보", "중급", "고급"],
    recommend: [ "코딩 입문자", "파이썬 개발자", "java 개발자"],
    course: null,

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
      this.showitem = this.EditBool ? this.course : this.$store.state.introduction;
      this.course = JSON.parse(JSON.stringify(this.$store.state.introduction));
    },
  },
  methods: {
    EditOn() {
      this.EditBool = true;
    },
    Editcancle() {
      this.$store.state.introduction = JSON.parse(JSON.stringify(this.course));
      this.EditBool = false;
    },
    EditIntro() {
      this.$store.state.introduction = JSON.parse(JSON.stringify(this.showitem));
      this.$http
        .put("/api/mycourse/" + this.$route.params.course_code + "/intro", {
          newIntro: this.course,
        })
        .then((res) => {
          // alert(res.data.message);
        })
        .catch(function (error) {
          alert("error");
        });

      this.EditBool = false;
    },

  },
  created() {
    var course_code = this.$route.params.course_code;
    this.course = JSON.parse(JSON.stringify(this.$store.state.introduction));
    console.log("this ",this.course);
    this.EditBool = false;
  },
};
</script>

<style scoped>
.cards{
  min-height: 250px;
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
.intro-title{
  margin-bottom: 0;
}
</style>
