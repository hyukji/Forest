<template>
  <v-data-table
    :headers="headers"
    :items="information"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.exam1 }}</td>
      <td class="text-xs-right">{{ props.item.exam2 }}</td>
      <td class="text-xs-right">{{ props.item.exam3 }}</td>
      <td class="text-xs-right">{{ props.item.exma4 }}</td>
      <td class="text-xs-right">{{ props.item.exam5 }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          { text: '이 름 (학 번) ', align: 'left', value: 'name'},
          { text: '문 제 1 ', value: 'exam1' },
          { text: '문 제 2 ', value: 'exam2' },
          { text: '문 제 3 ', value: 'exam3' },
          { text: '문 제 4 ', value: 'exam4' },
          { text: '문 제 5 ', value: 'exam5' }
        ],
        information: [
          {
            value: false,
            name: '곽지혁 (201811001)',
            exam1: 90,
            exam2: 80,
            exam3: 100,
            exam4: 100,
            exam5: 100
          },
          {
            value: false,
            name: '김태호 (201611023)',
            exam1: 70,
            exam2: 80,
            exam3: 100,
            exam4: 70,
            exam5: 100
          },
          {
            value: false,
            name: '김태희 (201911032)',
            exam1: 90,
            exam2: 80,
            exam3: 100,
            exam4: 90,
            exam5: 100
          },
          {
            value: false,
            name: '유재석 (201711100)',
            exam1: 90,
            exam2: 80,
            exam3: 30,
            exam4: 30,
            exam5: 50
          },
          {
            value: false,
            name: '이수지 (201811111)',
            exam1: 90,
            exam2: 80,
            exam3: 100,
            exam4: 70,
            exam5: 100
          },
          {
            value: false,
            name: '이예람 (201811122)',
            exam1: 90,
            exam2: 80,
            exam3: 70,
            exam4: 100,
            exam5: 100
          },
          {
            value: false,
            name: '이효리 (201811133)',
            exam1: 60,
            exam2: 80,
            exam3: 60,
            exam4: 60,
            exam5: 60
          },
          {
            value: false,
            name: '정슬인 (201811144)',
            exam1: 90,
            exam2: 80,
            exam3: 100,
            exam4: 100,
            exam5: 100
          },
          {
            value: false,
            name: '정지훈 (201811188)',
            exam1: 90,
            exam2: 80,
            exam3: 100,
            exam4: 80,
            exam5: 80
          },
          {
            value: false,
            name: '황광희 (202011200)',
            exam1: 90,
            exam2: 80,
            exam3: 70,
            exam4: 90,
            exam5: 100
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
