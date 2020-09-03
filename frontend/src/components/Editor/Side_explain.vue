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
            v-if="user_data.position"
            class="mx-1"
            large
            icon
            color="secondary"
            @click="ClickPencil"
          >
            <v-icon dark>far fa-edit</v-icon>
          </v-btn>
          <v-btn class="mx-1" large icon color="secondary" @click="opentab(item)">
            <v-icon dark>far fa-external-link-square</v-icon>
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
    SideEdit: () => import("@/components/Editor/Side_explain_edit"),
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
    ClickPencil() {
      this.isEdit = !this.isEdit;
      this.showArrow = !this.showArrow;
    },
    opentab: function (item) {
      var tab_icon =
        this.ExplainType == "lecture" ? "far fa-leaf" : "far fa-leaf-oak";

      var newTab = {
        tab_title: item.title,
        data: null,
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
  width: 10%;
}
</style>
