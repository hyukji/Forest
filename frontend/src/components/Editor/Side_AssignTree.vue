<template width="100%">
  <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="_id"
    open-on-click
    dense
    expand-icon="mdi-chevron-down tabfont--text"
  >
    <template v-slot:prepend="{ item, open }">
      <v-row align="center" @click="opentab(item)" no-gutters>
        <v-col cols="auto">
          <v-icon
            color="tabfont"
            size="19px"
            v-if="!item.file"
          >{{ open ? "mdi-folder-open" : "mdi-folder" }}</v-icon>
          <v-icon color="tabfont" v-else size="19px">
            {{
            files[item.file]
            }}
          </v-icon>
          <v-text class="tabfont--text ml-2">{{ item.title }}</v-text>
        </v-col>

        <v-spacer></v-spacer>

        <v-col v-if="item.file" cols="auto" class="ml-6">
          <div size="0.5rem" class="primary--text font-weight-medium ml-2">100</div>
        </v-col>
        <v-col v-else cols="auto">
          <v-btn class="ml-12 tabfont--text" icon x-small>
            <v-icon class="fal fa-desktop" size="14px" @click="OpenExplain(item)"></v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-treeview>
</template>

<script>
import { eventBus } from "@/main.js";
export default {
  props: ["selected", "user_data"],
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
    this.items = JSON.parse(JSON.stringify(this.$store.state.assignments));

    this.items.forEach((element) => {
      element.subitems.forEach((el) => {
        el.title = el.subtitle;
        el.file = "py";
        delete el.subtitle;
      });

      element.children = element.subitems;
      delete element.subitems;
    });
  },
  methods: {
    OpenExplain: async function (item) {
      eventBus.$emit("OpenExplain", item, 0);
      eventBus.$emit("EnterExplain", item, "assign");
    },
    opentab: function (item) {
      if (item.file) {
        var newTab = {
          tab_title: item.title,
          data: item.data ? item.data : null,
          _id: item._id,
          icon: "far fa-leaf-oak",
        };
        this.$store.commit("setTabData", newTab);
      }
    },
  },
};
</script>

<style scoped>
v-text {
  font-size: 10pt;
}
</style>
