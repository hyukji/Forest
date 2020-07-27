<template>
<div class="wrap">

  <div id="editor">{{ code }}</div>


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
      code: "print(\"Hi I'm Ace Editor\") #comment"
    }
  },
  methods: {
    // removeTab () {
    //   this.$refs.tab.removeTab(this.tab)
    // },
  },
  created() {
    eventBus.$on('giveMeCode', () => {
      eventBus.$emit('sendCode', this.code)
    })
  },
  mounted() {

    this.editor = ace.edit("editor", {
    	mode: "ace/mode/python",
    	theme: "ace/theme/chrome",
    	maxLines: 200,
    	minLines: 40,
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

/* #editor {
    width: 100%;
    height: 100%;
} */

</style>
