<template>
  <div class="wrap">
    <div>prac</div>
    <editor
      v-model="content"
      @init="editorInit"
      lang="py"
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
  props: { savedcode: { type: String } },
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
    content() {
      console.log(this.content)
    },
  },
  created() {
    this.name = this.card_info.name
    this.id = this.card_info.id
  },
}
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
