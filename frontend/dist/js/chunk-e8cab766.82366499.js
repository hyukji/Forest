(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e8cab766"],{"52ff":function(t,e,i){},"8ce1":function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pt-2 black--text"},[t.isEdit?i("div",{staticClass:"white"},[i("editor",{ref:"toastuiEditor",attrs:{initialValue:t.editorText,options:t.editorOptions,previewStyle:"tab"}})],1):t._e(),t.isEdit?t._e():i("div",{staticClass:"white pa-2"},[i("viewer",{ref:"toastuiViewer",staticClass:"px-3",attrs:{initialValue:t.editorText}})],1)])},n=[],s=(i("a7be"),i("f513"),i("fe5f"),i("4ede")),a={props:{ExplainModel:String,ItemId:String,ExplainType:String,isEdit:Boolean},components:{editor:s["Editor"],viewer:s["Viewer"]},data:function(){return{editorText:null,editorOptions:{hideModeSwitch:!0,exts:["colorSyntax"]}}},watch:{ExplainModel:function(t){this.editorText=this.ExplainModel,this.$refs.toastuiViewer.invoke("setMarkdown",t)},isEdit:function(){if(!this.isEdit){var t=this.$refs.toastuiEditor.invoke("getMarkdown");this.editorText!=t&&(this.editorText=t,this.$http.put("/api/mycourse/"+this.$route.params.course_code+"/explanation",{ItemId:this.ItemId,content:t,ExplainType:this.ExplainType}).then((function(t){console.log("explanation save")})).catch((function(t){console.log("explanation save error")})))}}},computed:{},created:function(){this.editorText=this.ExplainModel}},r=a,d=(i("e0f3"),i("2877")),c=Object(d["a"])(r,o,n,!1,null,"587de2b2",null);e["default"]=c.exports},e0f3:function(t,e,i){"use strict";var o=i("52ff"),n=i.n(o);n.a}}]);
//# sourceMappingURL=chunk-e8cab766.82366499.js.map