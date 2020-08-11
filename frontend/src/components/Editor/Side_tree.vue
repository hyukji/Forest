<template>
  <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="_id"
    open-on-click
    dense
    expand-icon="mdi-chevron-down"
  >
    <template v-slot:prepend="{ item, open }">
      <v-row align="center" justify="end" @click="opentab(item)">
        <v-col class="mr-2">
          <v-icon size="19px" v-if="!item.file">{{ open ? "mdi-folder-open" : "mdi-folder" }}</v-icon>
          <v-icon v-else size="19px">{{ files[item.file] }}</v-icon>
        </v-col>
        <v-text class="label">{{ item.title }}</v-text>
        <v-col>
          <v-icon v-if="item.file" size="16px" color="grey" @click="ToDetail">far fa-file-search</v-icon>
        </v-col>
      </v-row>
    </template>
  </v-treeview>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  data: () => ({
    lecturedata: null,
    open: [],
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-json",
      md: "mdi-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
      py: "fab fa-python",
    },
    tree: [],
    items: null,
  }),
  created() {
    var openWindow_id = window.my_special_setting;
    var openWindowTab = null;

    // console.log("it is called ");

    this.items = this.$store.state.lecture;
    this.items.forEach((element) => {
      element.subitems.forEach((el) => {
        el.title = el.subtitle;
        el.file = "py";
        delete el.subtitle;
        if (openWindow_id == el._id) {
          openWindowTab = el;
        }
      });
      element.children = element.subitems;
      delete element.subitems;
    });
    if (openWindow_id) {
      this.opentab(openWindowTab);
    }
  },
  methods: {
    opentab: function (item) {
      if (item.file) {
        var newTab = {
          tab_title: item.title,
          data: "#" + item.title,
          _id: item._id,
        };
      }
      this.$store.commit("setTabData", newTab);
    },
    ToDetail: function (item) {
      if (item.file) {
        var newTab = {
          tab_title: item.title,
          data: "#" + item.title,
          _id: item._id,
        };
      }
      console.log("detail");
    },
  },
};
</script>

<style scoped>
.label {
  font-size: 13px;
}
</style>
