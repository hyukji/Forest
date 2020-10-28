<template>
  <div class="notice">
    <v-card>
      <v-card-title>
        <div class="pa-2"></div>
        공지사항
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
            class="button ma-3"
            outlined
            color="secondary"
            width="100"
            @click="sendEditData"
          >글쓰기</v-btn>
      </v-card-title>
      <v-data-table
        class="table"
        :headers="headers"
        :items="notice_items"
        style="cursor:pointer"
        :search="search"
        style:=""
      ></v-data-table>
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
        title: "첫 공지사항 게시물입니다.",
        date: "2020.3.6",
        writer: "신동훈",
        hits: 24,
        file: 1
      },
      {
        title: "첫 공지사항 게시물입니다.",
        date: "2020.3.6",
        writer: "신동훈",
        hits: 24,
        file: 1
      },
      {
        title: "첫 공지사항 게시물입니다.",
        date: "2020.3.6",
        writer: "신동훈",
        hits: 24,
        file: 1
      },
      {
        title: "첫 공지사항 게시물입니다.",
        date: "2020.3.6",
        writer: "신동훈",
        hits: 24,
        file: 1
      },
      {
        title: "첫 공지사항 게시물입니다.",
        date: "2020.3.6",
        writer: "신동훈",
        hits: 24,
        file: 1
      },
      {
        title: "첫 공지사항 게시물입니다.",
        date: "2020.3.6",
        writer: "신동훈",
        hits: 24,
        file: 1
      },
      {
        title: "첫 공지사항 게시물입니다.",
        date: "2020.3.6",
        writer: "신동훈",
        hits: 24,
        file: 1
      },
      {
        title: "첫 공지사항 게시물입니다.",
        date: "2020.3.6",
        writer: "신동훈",
        hits: 24,
        file: 1
      }
    ]
  }),
  props: ['sendData'],
  methods: {
    sendEditData: function() {
      console.log('child 데이터 수정 후 전달')
      let changeData = this.sendData + 30
      this.$emit('eventData', changeData)
    },
  },
  created() {
    var course_code = this.$route.params.course_code;
    this.notice = JSON.parse(JSON.stringify(this.$store.state.board));
  },
};
</script>

<style scoped>
.search {
  padding-top: 0;
}
.notice {
  display: inline-block;
  max-width: 900px;
  min-width: 800px;
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
.button{
  font-weight: 600;
}

</style>
