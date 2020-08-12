<template>
  <div>
    <editor
      :initialValue="editorText"
      :options="editorOptions"
      previewStyle="tab"
    />
    <div>end</div>
    <viewer :initialValue="editorText" height="500px" />
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
      },
    }
  },
}
</script>

<style scoped></style>
