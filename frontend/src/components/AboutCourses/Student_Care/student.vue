<template>
  <v-data-table
    :headers="headers"
    :items="information"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.student_id }}</td>
      <td class="text-xs-right">{{ props.item.web_id }}</td>
      <td class="text-xs-right">{{ props.item.recent_access }}</td>
      <td class="text-xs-right">{{ props.item.progress }}</td>
      <td class="text-xs-right">{{ props.item.assignment_average_grade }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: '이 름 ',
            align: 'left',
            value: 'name'
          },
          { text: '학 번 ', value: 'student_id' },
          { text: 'I D ', value: 'web_id' },
          { text: '최근 접속 시각 ', value: 'recent_access' },
          { text: '수업 진행률 ', value: 'progress' },
          { text: '과제 평균 점수 ', value: 'assignment_average_grade' }

        ],
        information: [
          {
            value: false,
            name: '곽지혁',
            student_id: 201811001,
            web_id: '혁아혁아',
            recent_access: '2020.07.24 10:00:02',
            progress: '100%',
            assignment_average_grade: 98
          },
          {
            value: false,
            name: '김태호',
            student_id: 201611023,
            web_id: 'xoghxogh',
            recent_access: '2020.07.20 23:00:02',
            progress: '88%',
            assignment_average_grade: 68
          },
          {
            value: false,
            name: '김태희',
            student_id: 201911032,
            web_id: 'princess',
            recent_access: '2020.07.20 23:44:23',
            progress: '89%',
            assignment_average_grade: 89
          },
          {
            value: false,
            name: '유재석',
            student_id: 201711100,
            web_id: '메뚜기100',
            recent_access: '2020.07.20 23:59:59',
            progress: '77%',
            assignment_average_grade: 40
          },
          {
            value: false,
            name: '이수지',
            student_id: 201811111,
            web_id: 'ddu11111',
            recent_access: '2020.07.24 19:30:30',
            progress: '100%',
            assignment_average_grade: 90
          },
          {
            value: false,
            name: '이예람',
            student_id: 201811122,
            web_id: '라미S2',
            recent_access: '2020.07.24 20:30:45',
            progress: '100%',
            assignment_average_grade: 90
          },
          {
            value: false,
            name: '이효리',
            student_id: 201811133,
            web_id: 'sangsoon33',
            recent_access: '2020.07.21 01:34:59',
            progress: '35%',
            assignment_average_grade: 30
          },
          {
            value: false,
            name: '정슬인',
            student_id: 201811144,
            web_id: '슬아슬아',
            recent_access: '2020.07.24 19:42:42',
            progress: '100%',
            assignment_average_grade: 98
          },
          {
            value: false,
            name: '정지훈',
            student_id: 201811188,
            web_id: 'rain_oppa',
            recent_access: '2020.07.20 23:59:59',
            progress: '100%',
            assignment_average_grade: 45
          },
          {
            value: false,
            name: '황광희',
            student_id: 202011200,
            web_id: 'paperman',
            recent_access: '2020.07.20 09:40:59',
            progress: '88%',
            assignment_average_grade: 44
          }
        ]
      }
    }
  }
</script>


<style scoped>
.search {
  padding-top: 0;
}
.notice {
  display: inline-block;
  width: 79%;
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
