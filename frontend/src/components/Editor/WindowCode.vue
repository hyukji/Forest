<template>
<div class="wrap">

  <div id="editor" ref="editor">default
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
  props: {
    data : {
      type: String
    }
  },
  methods: {
    getCode() {
      console.log("code excuted")
      return this.editor.getValue()
    }
    // removeTab () {
    //   this.$refs.tab.removeTab(this.tab)
    // },
  },
  created() {
    eventBus.$on('giveMeCode', () => {
      console.log(this.getCode, "this.getCode")
      eventBus.$emit('sendCode', this.getCode())
    })
    console.log('editor created')
  },
  mounted() {
    console.log('mounted')
    this.editor = ace.edit(this.$refs.editor, {
    	mode: "ace/mode/python",
    	theme: "ace/theme/chrome",
    	minLines: 1,
    	fontSize: 15
    })
    this.editor.setValue(this.data)
    this.editor.navigateLineEnd()
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
    position: relative;
    width: 100%;
    height: 100%;
}

</style>
