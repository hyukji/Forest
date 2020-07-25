<template>
<div class="wrap">

  <div id="editor">print("Hi I'm Ace Editor")
    #comment</div>


</div>
</template>

<script>
import 'ace-builds'
import 'ace-builds/webpack-resolver'

export default {
  components: { },
  data() {
    return {
    }
  },
  methods: {
    // removeTab () {
    //   this.$refs.tab.removeTab(this.tab)
    // },
  },
  created() {

  },
  mounted() {

    this.editor = ace.edit("editor", {
    	mode: "ace/mode/python",
    	theme: "ace/theme/chrome",
    	maxLines: 50,
    	minLines: 10,
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
