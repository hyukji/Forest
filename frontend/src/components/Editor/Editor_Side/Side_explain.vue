<template>
  <div>
    <v-carousel
      v-if="title"
      hide-delimiters
      :show-arrows="showArrow"
      show-arrows-on-hover
      class="pt-1"
    >
      <v-carousel-item v-for="(item, i) in subitems" :key="i">
        <v-row align="center">
          <div class="text-subtitle-2 pl-4">
            {{title}}
            <v-icon class="pl-1" size="4pt">fal fa-chevron-right</v-icon>
          </div>

          <div class="text-h5 pl-4 pr-10">{{item.title}}</div>

          <v-btn
            v-if="user_data.position == 'prof'"
            class="mx-1"
            x-small
            icon
            color="secondary"
            @click="Edit_explanation"
          >
            <v-icon dark>far fa-edit</v-icon>
          </v-btn>
          <v-btn
            v-if="user_data.position == 'prof'"
            class="mx-1"
            x-small
            icon
            color="secondary"
            @click="open_scoretab(item)"
          >
            <v-icon dark>far fa-browser</v-icon>
          </v-btn>
          <v-btn class="mx-1" x-small icon color="secondary" @click="opentab(item)">
            <v-icon dark>far fa-code</v-icon>
          </v-btn>
        </v-row>
        <!-- <div class="pt-6">{{ item.Text }}</div> -->
        <SideEdit
          :ExplainModel="item.explanation"
          :isEdit="isEdit"
          :ItemId="item._id"
          :ExplainType="ExplainType"
        />
      </v-carousel-item>
    </v-carousel>
    <v-row v-else justify="center">
      <v-col>
        <a class="tabfont--text">먼저 강의를 선택해주세요</a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  components: {
    SideEdit: () => import("@/components/Editor/Editor_Side/Side_explain_edit"),
  },
  props: ["user_data"],

  data() {
    return {
      showArrow: true,
      isEdit: false,
      ExplainType: null,
      title: null,
      subitems: [null],
    };
  },
  created() {
    eventBus.$on("EnterExplain", (item, type) => {
      this.title = item.title;
      this.subitems = item.children;
      this.ExplainType = type;
    });
    //console.log("user_data", this.user_data);
  },
  methods: {
    Edit_explanation() {
      this.isEdit = !this.isEdit;
      this.showArrow = !this.showArrow;
    },
    open_scoretab: function (item) {
      var newTab = {
        tab_title: "score_ " + item.title,
        data: null,
        _id: item._id + "score",
        icon: "fas fa-tree-alt",
        type: this.ExplainType == "lecture" ? "0" : "1",
      };

      this.$store.commit("setTabData", newTab);
    },
    opentab: function (item) {
      var tab_icon =
        this.ExplainType == "lecture" ? "far fa-leaf" : "far fa-leaf-oak";

      var newTab = {
        tab_title: item.title,
        _id: item._id,
        icon: tab_icon,
      };

      this.$store.commit("setTabData", newTab);
    },
  },
};
</script>

<style scoped>
.wrap {
  height: 100pt;
}
</style>
