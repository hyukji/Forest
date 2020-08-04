<template>
  <div>
  <row>
  <div class="sidebar">
  <v-card class="mx-auto" max-width="210">
    <v-list>
      <v-list-item
      v-on:click="selectedComponent='student'"
      >
        <v-list-item-title>학생별</v-list-item-title>
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
            v-for="(admin, i) in admins"
            :key="i"
            link
            @click=""
          >
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
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
            v-for="(crud, i) in cruds"
            :key="i"
            link
            @click=""
          >
            <v-list-item-title v-text="crud[0]"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-group>

      <v-list-item   v-on:click="selectedComponent='lec_ass'">
        <v-list-item-title>통계</v-list-item-title>
      </v-list-item>

    </v-list>
  </v-card>
</div>
</row>
<row>
<keep-alive>
  <component v-bind:is="selectedComponent">
    <p> Default content </p>
  </component>
</keep-alive>
</row>

</div>
</template>

<script>
import student from '@/components/AboutCourses/Student_Care/student';
import lec_ass from '@/components/AboutCourses/Student_Care/lec_ass_list/lec1';
import statistics from '@/components/AboutCourses/Student_Care/statistics';


  export default {
    data: function() {
      return{
            selectedComponent: 'student'
            }
      },
    components : {
      student, lec_ass, statistics
    }
};
</script>

<style scoped>
.sidebar {
  padding-top: 3%;
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
