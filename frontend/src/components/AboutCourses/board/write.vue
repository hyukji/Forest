<template>
  <v-card class="notice">
    <div>
      <v-container fluid class="pa-9">
        <p class="writeTitle"> 공지사항</p>
        <v-row >
          <v-col>
            <v-text-field label="제 목" single-line></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field label="작성자" single-line>
            </v-text-field>
          </v-col>
          <v-col cols="6">
              <p> 등록일 : {{$moment().format('YYYY-MM-DD HH:mm')}}</p>
          </v-col>
        </v-row>

        <v-textarea
          v-model="title"
          label="내 용"
          counter
          maxlength="1000"
          full-width
          single-line
          class="content"
        ></v-textarea>
        <template>
            <v-file-input label="파일 첨부" outlined dense></v-file-input>
        </template>


        <v-row >
          <v-col cols="8"></v-col>
          <v-col cols="4" class="mb-3">
            <v-btn
            outlined
            color="secondary"
            width="100"
            >저 장</v-btn>
            <v-btn
            outlined
            color="secondary"
            width="100"
            class="ma-3"
            >취 소</v-btn>
          </v-col>
        </v-row>
      </v-container>

  </div>


 </v-card>
</template>

<script>
import Vue from 'vue'
import vueMoment from 'vue-moment'
Vue.use(vueMoment)

export default{
  name: 'Write',
  data: ()=> ({
    text: 'center',
        icon: 'justify',
        toggle_none: null,
        toggle_one: 0,
        toggle_exclusive: 2,
        toggle_multiple: [0, 1, 2],
  }),
  methods: {
    moment: function () {
      return moment();
    }
  }
}
</script>

<style scoped>
.notice {
  display: inline-block;
  max-width: 900px;
  min-width: 800px;
}
.writeTitle{
  font-size: 1.5rem;
  font-weight: 300;
}
.content{
  padding-bottom: 30px;
}
</style>
