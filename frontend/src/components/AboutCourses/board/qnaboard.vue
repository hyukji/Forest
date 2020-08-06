<template>
  <div class="freeboard">
    <v-card>
      <v-card-title>
        <div class="pa-2"></div>
        QnA
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Search"
          append-icon="mdi-magnify"
          single-line
          hide-details
          ></v-text-field>
          <v-btn
            v-if="!EditBool"
            class="ma-3"
            outlined
            color="secondary"
            width="100"
            @click="EditOn"
          >글쓰기</v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="notice_items">
        <template slot="items" slot-scope="props">
          <tr>
            <td class="text-xs-right">11</td>
            <td class="text-xs-right">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.hits }}</td>
            <td class="text-xs-right">{{ props.item.hits }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "board",
  components: {},
  data: () => ({
    middle_title: "게시판",
    search: "",
    headers: [
      {
        text: "글번호",
        sortable: false,
        width: "9%"
      },
      {
        text: "제목",
        sortable: false,
        value: "title",
        width: "60%"
      },
      { text: "작성일", sortable: false, value: "date" },
      { text: "작성자", sortable: false, value: "writer", width: "11%" },
      { text: "조회수", sortable: false, value: "hits" }
    ],
    notice_items: [
      {
        title: "첫 질문입니다.",
        date: "2020.3.6",
        writer: "곽지혁",
        hits: 3
      },
      {
        title: "첫 질문입니다.",
        date: "2020.3.6",
        writer: "곽지혁",
        hits: 2
      }
    ]
  }),
  methods: {}
};
</script>

<style scoped>
.bottom-btn {
  margin-top: 1%;
  margin-left: 1.5%;
  float: right;
}
.search {
  padding-top: 0;
}
.freeboard {
  display: inline-block;
  width: 180%;
  padding-left: 5%;
}
.body-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 3%;

  padding-top: 3%;

  padding-bottom: 2%;
}
.table {
  background-color: "#f9fcfc";
}
</style>
