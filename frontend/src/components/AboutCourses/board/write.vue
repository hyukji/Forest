<template>
  <div class="notice">
    <p class="writeTitle">공 지 사 항</p>
    <v-row>
      <v-col>

        <v-row no-gutters>
          <v-col sm="2">
            <v-card class="pa-5" outlined style="background-color: #d7e9d6" tile>
              제목</v-card>
          </v-col>
          <v-col sm="10">
            <v-card class="card" outlined tile>
              <v-col >
                <v-text-field dense outlined></v-text-field>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col sm="2">
            <v-card class="pa-5" outlined style="background-color: #d7e9d6" tile>
              작성자</v-card>
          </v-col>
          <v-col sm="10">
            <v-card class="card" outlined tile>
              <v-col >
                <v-text-field dense outlined></v-text-field>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col sm="2">
          <v-card class="content1" outlined style="background-color: #d7e9d6" tile>
              내용</v-card>
          </v-col>
          <v-col sm="10">
            <v-card class="content" outlined tile>
              <v-col >
                <v-textarea v-model="title" counter maxlength="1000"
                full-width outlined class="content"></v-textarea>
                </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col sm="2">
            <v-card class="pa-5" outlined style="background-color: #d7e9d6" tile>
                파일첨부</v-card>
          </v-col>
          <v-col sm="10">
            <v-card
              class="card"
              outlined
              tile>
              <v-col >
                <v-file-input outlined dense></v-file-input>
                </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col sm="2">
            <v-card class="pa-5" outlined style="background-color: #d7e9d6" tile>
              비밀번호</v-card>
          </v-col>
          <v-col sm="10">
            <v-card class="card" outlined tile>
              <v-col>
                <v-text-field
                  outlined
                  dense
                  input type='password'
                  v-on:keyup.enter="signIn"
                ></v-text-field>

              </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col sm="2">
            <v-card class="pa-5" outlined style="background-color: #d7e9d6" tile>
              등록일</v-card>
          </v-col>
          <v-col sm="4">
            <v-card class="card" outlined tile>
              <v-col class="pa-5">
                <p> {{$moment().format('YYYY-MM-DD HH:mm')}}</p>
              </v-col>
            </v-card>
          </v-col>
          <v-col sm="2">
            <v-card class="pa-5" outlined style="background-color: #d7e9d6" tile>
              최종수정일</v-card>
          </v-col>
          <v-col sm="4">
            <v-card class="card" outlined tile>
              <v-col class="pa-5">
                <p> {{$moment().format('YYYY-MM-DD HH:mm')}}</p>
              </v-col>
            </v-card>
          </v-col>

        </v-row>

      </v-col>
    </v-row>
    <v-row >
          <v-col cols="8"></v-col>
          <v-col cols="4" class="mb-3">
            <v-btn
            outlined
            color="secondary"
            width="100"
            class="button"
            >저 장</v-btn>
            <v-btn
            outlined
            color="secondary"
            width="100"
            class="button ma-6"
            >취 소</v-btn>
          </v-col>
        </v-row>

  </div>
</template>

<script>
  import Vue from 'vue'
  import vueMoment from 'vue-moment'
  Vue.use(vueMoment)

  export default{
    name: 'Write',
    data: ()=> ({
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
  font-size: 1.3rem;
  font-weight: 900;
  padding-left: 20px;
  color: #616161;
}
.content{
  padding-bottom: 30px;
}
.typing{
  height: 10px;
  width: 200px;
  padding-top: 0;
}
.card{
  height: 66px;
}
.content{
  height: 200px;
}
.content1{
  height: 200px;
  padding-top: 90px;
  padding-bottom: 90px;
  padding-left: 20px;
}
.button{
  font-weight: 600;
}
</style>
