<template>
  <div class="wrap">
    <div id="editor" ref="editor">default</div>
  </div>
</template>

<script>
import "ace-builds";
import "ace-builds/webpack-resolver";
import { eventBus } from "../../main.js";

export default {
  components: {},
  data() {
    return {
      editor: null,
    };
  },
  props: {
    data: {
      type: String,
    },
    selected: null,
  },
  methods: {
    getCode() {
      return this.editor.getValue();
    },
  },
  created() {
    eventBus.$on("exeCode", (selected) => {
      if (
        this.selected.lecture == selected.lecture &&
        this.selected.problem == selected.problem
      ) {
        //eventBus.$emit('sendCode', this.getCode())
        this.$socket.emit("code", { code: this.getCode() });
      }
    });
  },
  mounted() {
    this.editor = ace.edit(this.$refs.editor, {
      mode: "ace/mode/python",
      theme: "ace/theme/chrome",
      minLines: 1,
      fontSize: 15,
    });
    this.editor.setValue(this.data);
    this.editor.navigateLineEnd();
    // $('.editor').each(function (index) {
    //   this.editor = ace.edit(this)
    //   editor.getSession().setMonde('ace/mode/python')
    //   // {
    //   //   mode: "ace/mode/python",
    //   //   theme: "ace/theme/chrome",
    //   //   minLines: 1,
    //   //   fontSize: 18
    //   // }
    // })
  },
  watch: {
    data(val) {
      this.editor.setValue(val);
      this.editor.navigateLineEnd();
      console.log(val);
    },
  },
  beforeDestroy() {
    eventBus.$off("exeCode");
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd;
}

#editor {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
