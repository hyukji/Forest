<template>
  <div class="wrap-introduction">
    <v-card class="ma-3" max-width="30%" outlined>
      <v-container>
        <v-row>
          <v-col class="wrap-total-list" v-for="item in class_info" :key="item.title">
            <v-list three-line>
              <v-icon size="40pt" v-text="item.icon"></v-icon>
              <v-list-item-title class="toal-list-title"  v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <p class="card-title"> 과목 소개 </p>
    <p class="body"> 준비중입니다 </p>
    <p class="card-title"> 수업 과정 </p>
    <ul>
      <li v-for="el of curriculum">
        <v-icon
          color="teal darken-2"
          size="24"
        >far fa-clipboard</v-icon>
        <p class="li-title">{{el.list_title}}</p>
      </li>
    </ul>
    <p>
      <p class="card-title">추천 대상</p>
      <v-card class="ma-3" max-width="30%" outlined >
        <v-container>
          <v-row>
            <v-col class="wrap-total-list" v-for="item in for_who" :key="item.title">
              <v-list three-line>
                <v-icon size="40pt" v-text="item.icon"></v-icon>
                <v-list-item-title class="toal-list-title"  v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "introduction",
  components: {},
  data: () => ({
    middle_title: "강의소개",
    class_info: [
      {
        icon: "fas fa-code",
        title: "파이썬",
        subtitle: "프로그래밍 언어"
      },
      {
        icon: "fas fa-chart-bar",
        title: "입문",
        subtitle: "난이도"
      },
    ],
    for_who: [
      {
        icon: "fas fa-flushed",
        title: "코딩 입문자",
      },
      {
        icon: "fab fa-python",
        title: "파이썬 개발자"
      }
    ],
    curriculum: [
      {
        list_title: "Course1",
      },
      {
        list_title: "Course2",
      },
      {
        list_title: "Course3",
      }
    ],
  }),
  methods: {
    printDatePast(date) {
      let nowdate = new Date();
      var obj_date = new Date(date);
      if (nowdate.getFullYear() != obj_date.getFullYear()) {
        let num = nowdate.getFullYear() - obj_date.getFullYear();
        return num + "년 전";
      }
      if (nowdate.getMonth() != obj_date.getMonth()) {
        let num = nowdate.getMonth() - obj_date.getMonth();
        return num + "달 전";
      }
      if (nowdate.getDate() != obj_date.getDate()) {
        let num = nowdate.getDate() - obj_date.getDate();
        return num + "일 전";
      } else {
        return "오늘";
      }
    }
  }
};
</script>

<style scoped>
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
}
.total-card {
  padding-top: 10%;
}
.body-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding-left: 3%;
  padding-top: 3%;
  padding-bottom: 2%;
}
.body{
  padding-left: 5%;
  color: gray;
}
</style>
