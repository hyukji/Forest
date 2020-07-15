<template>
  <div class="wrap">
    <v-card dark>
      <v-toolbar flat dark>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer />
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.start }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
      </v-toolbar>
      <v-sheet height="300%">
        <v-calendar dark ref="calendar"
        v-model="value" type="month"
        :events="events"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"></v-calendar>
      </v-sheet>
    </v-card>

    <v-card class="my-6" tile>
      <v-list :two-line="true" color="dark_gray" dark dense>
        <v-subheader class="subheader">새 알림
          <v-spacer/>
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
    </v-col>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Mycourse",
  components: {
  },
  data: () => ({
    value: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    item: 3,
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: '프로그래밍 공지사항이 등록되었습니다.',
        subtitle: "30분 전",
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: '자료구조 과제가 등록되었습니다.',
        subtitle: "1일 전",
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: '프로그래밍 게시판 질문에 답글이 달렸습니다.',
        subtitle: "7월 2일",
      },
    ]
  }),
  mounted () {
         this.$refs.calendar.checkChange()
  },
  methods: {
    getEvents ({ start, end }) {
      const events = []
      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < 5; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        first = String(first.getFullYear())+'-'+String(first.getMonth()+1)+'-'+String(first.getDate())
        second = String(second.getFullYear())+'-'+String(second.getMonth()+1)+'-'+String(second.getDate())
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    prev () {
      console.log(this.$refs)
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    }
  },
};
</script>

<style scoped>
.wrap {
  padding: 3%;
  height: 100%;
  background-color: #3d3d3d;
}
.card {
  float: left;
}
.subheader{
  font-weight: bold;
  font-size: 90%;
  color: #ffffff;
  margin-left: 2%;
}
</style>
