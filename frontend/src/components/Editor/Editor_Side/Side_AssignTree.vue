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
      <v-row class="pl-2 panel_text" align="center" @click="opentab(item)" no-gutters>
        
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
          
          <v-text v-if="item.file" size="0.5rem" class="primary--text font-weight-medium ml-6">100</v-text>

          <v-btn v-else class="ml-12 tabfont--text" icon x-small>
            <v-icon class="fas fa-display" size="14px" @click="OpenExplain(item)"></v-icon>
          </v-btn>
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
          icon: "fas fa-leaf-oak",
        };
        this.$store.commit("setTabData", newTab);
      }
    },
  },
};
</script>

<style scoped>
.panel_text {
  display: inline;
}
v-text {
  font-size: 10pt;
}
</style>
