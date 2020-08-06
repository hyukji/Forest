<template>
  <div>
  <v-layout col wrap>
  <div class="sidebar">
  <v-card class="mx-auto" max-width="210">
    <v-list>
      <v-list-item v-on:click="selectedComponent='student'">
        <v-list-item-title >학생별</v-list-item-title>
      </v-list-item>

      <v-list-group>
        <template v-slot:activator>
          <v-list-item-title>수업 및 과제별</v-list-item-title>
        </template>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>수업</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(lec, i) in lecture"
            :key="i"
            link
            v-on:click="lec[1]"
          >
            <v-list-item-title v-text="lec[0]"> </v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-group
          sub-group
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>과제</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(ass,i) in assignment"
            :key="i"
            @click=""
          >
            <v-list-item-title v-text="ass[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>

      <v-list-item v-on:click="selectedComponent='lec_ass'">
        <v-list-item-title>통계</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
  </div>

  <div class="pa-4"> </div>

  <div>
  <keep-alive>
    <component v-bind:is="selectedComponent">
      <p> Default content </p>
    </component>
  </keep-alive>
</div>
</v-layout>
</div>
</template>

<script>
import student from '@/components/AboutCourses/Student_Care/student';
import lec_ass from '@/components/AboutCourses/Student_Care/lec_ass_list/lec1';
import statistics from '@/components/AboutCourses/Student_Care/statistics';


  export default {
    data: function() {
      return{
            selectedComponent: 'student',
            lecture: [['수업1','lec1'],['수업2','lec2']],
            assignment: [['과제1','ass1'],['과제2','ass2']]
      }
    },
    components: {
      student, lec_ass, statistics
    }
  }

</script>

<style scoped>
.sidebar {
  float: left;
  width: 20%;
  padding-left: 2%;
}
.side_title {
  font-size: 1.15rem;
  font-weight: 700;
}
.wrap-side-list {
  border-top: 2px solid #8d8d8d;
}
.side-list-title {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
