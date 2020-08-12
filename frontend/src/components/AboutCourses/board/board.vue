<template>
  <div class="mx-auto">
  <v-layout col wrap>
  <div class="sidebar">
  <v-card class="mx-auto" max-width="210">
    <v-list>
      <v-list-item v-on:click="selectedComponent='notice'">
        <v-list-item-title >공지사항</v-list-item-title>
      </v-list-item>

      <v-list-item v-on:click="selectedComponent='qnaboard'">
        <v-list-item-title>QnA</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
  </div>

  <div class="pa-4"> </div>

  <div>
    <keep-alive>
      <component v-bind:is="selectedComponent" @eventData="changewrite">
        <p> Default content </p>
      </component>
    </keep-alive>

  </div>


</v-layout>
</div>
</template>

<script>
import notice from "@/components/AboutCourses/board/notice"
import qnaboard from "@/components/AboutCourses/board/qnaboard"
import write from "@/components/AboutCourses/board/write"

export default {
  name: 'Child',
  data: function() {
    return{
      selectedComponent: 'notice',
      childData: 20
    }
  },
  components: {
    notice, qnaboard, write
  },
  methods: {
    changewrite (data) {
      console.log(data)
      this.selectedComponent = "write"
      console.log(this.childData)
    }
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
