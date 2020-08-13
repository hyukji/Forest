<template>
  <div class="wrap">
    <editor
      v-model="content"
      @init="editorInit"
      lang="python"
      theme="chrome"
      width="100%"
      height="100%"
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
  }),
  props: ["tabitem"],
  methods: {
    editorInit: function() {
      require("brace/ext/language_tools") //language extension prerequsite...
      require("brace/mode/html")
      //require("brace/mode/javascript") //language
      require("brace/mode/python") //language
      require("brace/mode/less")
      require("brace/theme/chrome")
      require("brace/snippets/javascript") //snippet
    },
  },
  watch: {
    content(val) {
      console.log(val)

      this.$store.commit("setTabCode", {
        TabId: this.tabitem._id,
        newcode: val,
      })
    },
  },
  created() {
    console.log("here", this.tabitem)
    this.content = this.tabitem.data
  },
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 500pt;
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
