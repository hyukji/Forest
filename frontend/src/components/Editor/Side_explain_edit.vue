<template>
  <div class="pt-8 black--text">
    <div v-if="isEdit" class="white">
      <editor
        :initialValue="editorText"
        :options="editorOptions"
        previewStyle="tab"
        ref="toastuiEditor"
      />
    </div>
    <div v-if="!isEdit" class="white pa-2">
      <viewer :initialValue="editorText" ref="toastuiViewer" class="px-3" />
    </div>
  </div>
</template>

<script>
// global registerx
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { Editor, Viewer } from "@toast-ui/vue-editor";

export default {
  props: {
    ExplainModel: String,
    ItemId: String,
    ExplainType: String,
    isEdit: Boolean,
  },
  components: {
    editor: Editor,
    viewer: Viewer,
  },
  data() {
    return {
      editorText: null,
      editorOptions: {
        hideModeSwitch: true,
        exts: ["colorSyntax"],
      },
    };
  },
  watch: {
    ExplainModel(val) {
      this.editorText = this.ExplainModel;
      this.$refs.toastuiViewer.invoke("setMarkdown", val);
    },
    isEdit() {
      if (!this.isEdit) {
        var content = this.$refs.toastuiEditor.invoke("getMarkdown");

        if (this.editorText != content) {
          //this.$refs.toastuiViewer.invoke("setMarkdown", content);

          this.editorText = content;

          this.$http
            .put(
              "/api/mycourse/" +
                this.$route.params.course_code +
                "/explanation",
              {
                ItemId: this.ItemId,
                content: content,
                ExplainType: this.ExplainType,
              }
            )
            .then((res) => {
              console.log("explanation save");
            })
            .catch(function (error) {
              console.log("explanation save error");
            });
        }
      }
    },
  },
  computed: {},
  created() {
    this.editorText = this.ExplainModel;
    //console.log(this.$route.params.course_code);
  },
};
</script>

<style scoped>
.tui-editor-contents {
  font-size: 3rem;
}
</style>
