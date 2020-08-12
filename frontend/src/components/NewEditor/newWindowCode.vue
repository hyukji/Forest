<template>
  <div class="wrap">
    <div id="editor" ref="editor">default</div>
  </div>
</template>

<script>
import "ace-builds";
import "ace-builds/webpack-resolver";

export default {
  data() {
    return {
      code: null,
      editor: null,
    };
  },
  props: { savedcode: { type: String } },
  created() {
    this.code = this.savedcode;
  },
  mounted() {
    this.editor = ace.edit(this.$refs.editor, {
      mode: "ace/mode/python",
      theme: "ace/theme/chrome",
      minLines: 1,
      fontSize: 15,
    });
    this.editor.setValue(this.code);
    this.editor.navigateLineEnd();
  },
  watch: {
    code(val) {
      this.editor.setValue(val);
      this.editor.navigateLineEnd();
    },
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 500pt;
  border: 1px solid #dddddd;
}

#editor {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
