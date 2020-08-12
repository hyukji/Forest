<template>
  <div class="pt-8 #252526 black--text">
    <editor
      dark
      :initialValue="editorText"
      :options="editorOptions"
      previewStyle="tab"
    />
    <div class="white pa-2 my-3">
      <viewer :initialValue="editorText" height="500px" color="primary" />
    </div>
  </div>
</template>

<script>
// global registerx
import "codemirror/lib/codemirror.css"
import "@toast-ui/editor/dist/toastui-editor.css"
import "@toast-ui/editor/dist/toastui-editor-viewer.css"

import { Editor, Viewer } from "@toast-ui/vue-editor"

export default {
  components: {
    editor: Editor,
    viewer: Viewer,
  },
  data() {
    return {
      editorText: "This is initialValue.",
      editorOptions: {
        hideModeSwitch: true,
        exts: ["colorSyntax"],
      },
    }
  },
}
</script>

<style scoped>
.tui-editor-contents {
  font-size: 3rem;
}
</style>
