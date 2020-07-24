<template>
  <div class="sidebar">
    <v-card class="mx-auto" max-width="300" color="#f9fcfc" tile outlined>
      <div class="wrap-side-list">
        <v-list flat class="side-list-content" color="#f9fcfc">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            v-on:click="changeComponent(item)"
            active-class="false"
          >
            <p class="side-list-title">{{item.title}}</p>
          </v-list-item>
        </v-list>
      </div>
    </v-card>

    <!-- <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="side_title">게시판</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    <v-divider></v-divider>-->
  </div>
</template>

<script>
export default {
  props: ["sidebar_title"],
  data: () => ({
    middle_title: "",
    items: [{ title: "공지사항" ,
            component_name: "notice"},
            { title: "QnA" , component_name: "qnaboard"}]
  }),
  methods: {
    changeComponent: function(item) {
      this.middle_title = item.title;
      this.$emit("ChangeComponent", item.component_name);
    }
  },
  created() {
    this.middle_title = this.sidebar_title;
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
