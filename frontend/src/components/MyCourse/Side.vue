<template>
  <div class="wrap">
    <v-layout>
      <v-date-picker
      no-title
      v-model="picker"
      color="primary"
      full-width
      class="mt-3"
      :events= "dateFunctionEvents"
      @click:date="dialog = true"
      dark>
      <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">숙제하세용</v-card-title>
        <v-card-text>
          숙제는 1p부터 끝까지
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false">
            okay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-date-picker>
    </v-layout>
    <!--hover 참조하기-->
    <v-card dark class="pa-1" title>
      <v-list :two-line="true" color="dark_gray" dark dense>
        <v-subheader class="subheader">
          새 알림
          <v-spacer />
          <v-btn depressed small>더 보기</v-btn>
        </v-subheader>
        <v-list-item-group v-model="item">
          <v-list-item v-for="(item, i) in items" :key="i" :inactive="true" dense>
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Mycourse",
  components: {},
  data: () => ({
    value: "",
    events: null,
    picker:"",
    done: false,
    dialog: false,
    item: 3,
    items: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "프로그래밍 공지사항이 등록되었습니다.",
        subtitle: "30분 전"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "자료구조 과제가 등록되었습니다.",
        subtitle: "1일 전"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "프로그래밍 게시판 질문에 답글이 달렸습니다.",
        subtitle: "7월 2일"
      }
    ]
  }),
  mounted () {
    this.events = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30)
      const d = new Date()
      d.setDate(day)
      return d.toISOString().substr(0, 10)
    })
  },
  computed: {
    functionEvents () {
      return this.dateFunctionEvents
    },
  },
  methods: {
    dateFunctionEvents (date) {
      const [,, day] = date.split('-')
      if ([12, 19, 28].includes(parseInt(day, 10))) return 'yellow'
      if ([1, 17, 22].includes(parseInt(day, 10))) return 'red'
      return false
    },
    clickdate (date) {
      this.$set(this.done, 0, true)
      alert(`You have just clicked the following date: ${date}`)
    },
  },
};
</script>

<style scoped>
.wrap {
  margin: 0;
  padding: 1%;
  height: 100%;
  width: 280pt;
  background-color: #3d3d3d;
}
.subheader {
  font-weight: bold;
  font-size: 90%;
  color: #ffffff;
  margin-left: 2%;
}
.pa-1{
  margin-left: 3%;
}
</style>
