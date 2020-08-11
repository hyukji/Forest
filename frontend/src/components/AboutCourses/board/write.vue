<template>
  <v-card class="notice">
    <div>
      <vue-good-table
        :columns="columns"
        :rows="rows"/>
    </div>
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

import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
Vue.use(VueGoodTablePlugin)

export default{
  name: 'Write',
  data: ()=> ({
    text: 'center',
        icon: 'justify',
        toggle_none: null,
        toggle_one: 0,
        toggle_exclusive: 2,
        toggle_multiple: [0, 1, 2],
        columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'YYYY-MM-DD',
          dateOutputFormat: 'MMM Do YY',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        { id:1, name:"John", age: 20, createdAt: '201-10-31:9: 35 am',score: 0.03343 },
        { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
        { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
        { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
        { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
        { id:6, name:"John", age: 20, createdAt: '2011-10-31', score: 0.03343 },
      ]
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
