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
        <v-row align="end">
          <div class="text-subtitle-2 pl-4">
            {{title}}
            <v-icon class="pl-1 pb-1" size="4pt">fal fa-chevron-right</v-icon>
          </div>

          <div class="text-h5 pl-4 pr-10">{{item.title}}</div>

          <v-btn class="mx-2" fab outlined x-small color="primary" @click="ClickPencil">
            <v-icon dark>mdi-pencil</v-icon>
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
  },
  methods: {
    ClickPencil() {
      this.isEdit = !this.isEdit;
      this.showArrow = !this.showArrow;
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 10%;
}
</style>
