<template>
  <v-card class="notice">
    <div>
      <v-container fluid>

        <v-row>
          <v-col cols="2">
            <v-subheader>등록일</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-text-field
              value="10.00"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-subheader>제목</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-text-field
              value="28.00"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <v-subheader>작성자</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-text-field
              value="example"
              suffix="@gmail.com"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4">
            <v-subheader>내용</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
              value="12:30:00"
              type="time"
              suffix="PST"
            ></v-text-field>
          </v-col>
        </v-row>

      </v-container>
    </div>

 </v-card>
</template>

<script>
export default{
  name: 'Write',
  data: ()=> ({
    es: 3
  })
}
</script>

<style scoped>
.notice {
  display: inline-block;
  max-width: 900px;
  min-width: 800px;
}
</style>
