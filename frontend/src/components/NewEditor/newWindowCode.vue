<template>
  <div class="wrap">
    <editor
      v-model="content"
      @init="editorInit"
      lang="python"
      theme="tomorrow_night"
      width="100%"
      height="100%"
      ref="myEditor"
    ></editor>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Card",
  components: {
    editor: require("vue2-ace-editor"),
  },
  data: () => ({
    content: "content it it",
    settings: {
      fontsize: 17,
    },
  }),
  props: ["tabitem"],
  methods: {
    editorInit: function () {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      //require("brace/mode/javascript") //language
      require("brace/mode/python"); //language
      require("brace/mode/less");
      require("brace/theme/tomorrow_night");
      require("brace/theme/tomorrow_night_bright");

      require("brace/snippets/javascript"); //snippet
    },
  },
  mounted() {
    this.editor = this.$refs.myEditor.editor;
    this.editor.setFontSize(this.settings.fontsize);
  },
  watch: {
    content(val) {
      console.log(val);

      this.$store.commit("setTabCode", {
        TabId: this.tabitem._id,
        newcode: val,
      });
    },
  },
  created() {
    //console.log("here", this.tabitem);
    this.content = this.tabitem.data;
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.wrap-Mycourse-cards {
  float: left;
}
.btn-nowlearn {
  padding-right: 5%;
  padding-bottom: 3%;
  text-align: right;
}
</style>
