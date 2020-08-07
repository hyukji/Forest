<template>
  <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="title"
    open-on-click
    hoverable
    dense
    expand-icon="mdi-chevron-down"
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon size="19px" v-if="!item.file">{{
        open ? "mdi-folder-open" : "mdi-folder"
      }}</v-icon>
      <v-icon v-else size="19px">{{ files["py"] }}</v-icon>
    </template>
    <template v-slot:label="{ item }">
      <div class="label">{{ item.title }}</div>
    </template>
  </v-treeview>
</template>

<script>
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
    this.items = this.$store.state.lecture
    this.items.forEach((element) => {
      var sub = element.subitems
      sub.forEach((el) => {
        el.title = el.subtitle
        delete el.subtitle
      })
      element.children = element.subitems
      delete element.subitems
    })
  },
  method: {},
}
</script>

<style scoped>
.label {
  font-size: 13px;
}
</style>
