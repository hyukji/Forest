<template>
  <v-carousel hide-delimiters show-arrows-on-hover>
    <v-carousel-item v-for="(item, i) in items" :key="i">
      <v-row align="end">
        <div class="text-subtitle-2 pl-4">
          1주차
          <v-icon class="pl-1 pb-1" size="4pt">fal fa-chevron-right</v-icon>
        </div>

        <div class="text-h5 pl-4 pr-10">문자열 정리</div>

        <v-btn color="secondary" outlined fab x-small dark>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-row>
      <!-- <div class="pt-6">{{ item.Text }}</div> -->
      <SideEdit />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  components: {
    SideEdit: () => import("@/components/Editor/Side_explain_edit"),
  },
  data() {
    return {
      items: [
        {
          Text: "fist textdd",
        },
        {
          Text: "2 text",
        },
        {
          Text: "3 text",
        },
        {
          Text: "4 text",
        },
      ],
    }
  },
}
</script>

<style scoped>
.wrap {
  width: 10%;
}
</style>
