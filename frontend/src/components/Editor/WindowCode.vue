<template>
<div class="wrap">

  <div id="editor">print("hi")
  </div>


</div>
</template>

<script>
import 'ace-builds'
import 'ace-builds/webpack-resolver'
import { eventBus } from "../../main.js"

export default {
  components: { },
  data() {
    return {
      editor: null
    }
  },
  methods: {
    code() {
      console.log("code excuted")
      return this.editor.getValue()
    }
    // removeTab () {
    //   this.$refs.tab.removeTab(this.tab)
    // },
  },
  created() {
    eventBus.$on('giveMeCode', () => {
      console.log(this.code, "this.code")
      eventBus.$emit('sendCode', this.code())
    })
  },
  computed: {
  },
  mounted() {

    this.editor = ace.edit("editor", {
    	mode: "ace/mode/python",
    	theme: "ace/theme/chrome",
    	minLines: 1,
    	fontSize: 18
    });
  }

}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd
}

#editor {
    width: 100%;
    height: 100%;
}

</style>
