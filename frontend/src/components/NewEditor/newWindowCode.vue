<template>
  <div class="wrap" @keyup.enter="save">
    <editor
      v-model="content"
      @init="editorInit"
      lang="python"
      theme="tomorrow_night"
      width="100%"
      height="100%"
      ref="myEditor"
    >
      <!-- <ScrollBar class="ace_scrollbar"></ScrollBar> -->
    </editor>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Card",
  components: {
    editor: require("vue2-ace-editor"),
  },
  props: ["tabitem", "user_data"],
  data: () => ({
    addr: null,
    content: null,
    settings: {
      fontsize: 17,
    },
  }),
  methods: {
    editorInit: function () {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      //require("brace/mode/javascript") //language
      require("brace/mode/python"); //language
      require("brace/mode/less");
      require("brace/theme/tomorrow_night");
      require("brace/theme/tomorrow_night_bright");

      require("brace/snippets/javascript"); //snippet
    },
    saveDB() {
      this.$http
        .post(this.addr, {
          //axios 사용
          Tabdata: this.tabitem,
          user_data: this.user_data,
        })
        .then((res) => {})
        .catch(function (err) {
          alert("error to save code", err);
        });
    },
    saveVuex() {
      this.$store.commit("setTabCode", {
        icon: this.tabitem.icon,
        TabId: this.tabitem._id,
        newcode: this.content,
      });
    },
    save() {
      console.log('tabitem', this.tabitem)
      this.$store.commit("setTabCode", {
        icon: this.tabitem.icon,
        TabId: this.tabitem._id,
        newcode: this.content,
      });
      this.$http
        .post(this.addr, {
          //axios 사용
          Tabdata: this.tabitem,
          user_data: this.user_data,
        })
        .then((res) => {})
        .catch(function (err) {
          console.log(err)
          alert("error to save code", err);
        });
    },
    createtab(res) {},
  },
  mounted() {
    this.editor = this.$refs.myEditor.editor;
    this.editor.setFontSize(this.settings.fontsize);
    this.editor.on('change', function(e) {
      // this.saveVuex()
    })
  },
  created() {
    //console.log("here", this.tabitem);
    this.content = "#" + this.tabitem.tab_title;

    if (this.tabitem.icon == "fas fa-tree-alt") {
      this.addr =
        "/api/editor/" +
        this.$route.params.course_code +
        "/" +
        this.tabitem._id +
        "/" +
        this.tabitem.type +
        "/score";
    } else {
      this.addr =
        "/api/editor/" +
        this.$route.params.course_code +
        "/" +
        this.tabitem._id +
        "/" +
        this.user_data.email;
    }

    this.$http
      .get(this.addr)
      .then((res) => {
        //console.log("res.codedata", res.data.codedata);
        if (res.data.codedata) {
          this.content = res.data.codedata;
        } else {
          console.log("저장된 데이터강 없어유");
        }

        this.$store.commit("setTabCode", {
          icon: this.tabitem.icon,
          TabId: this.tabitem._id,
          newcode: this.content,
        });
      })
      .catch(function (error) {
        alert("error to create scoring", err);
      });
    //console.log("user_data", this.user_data);
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 95%;
  /* margin: 1% 0; */
}
.wrap-Mycourse-cards {
  float: left;
}
.btn-nowlearn {
  padding-right: 5%;
  padding-bottom: 3%;
  text-align: right;
}
</style>

<style>
.ace_scrollbar {
  overflow-y: auto;
}

.ace_scrollbar::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

.ace_scrollbar::-webkit-scrollbar-thumb {
  height: 12px;
  background-color: rgba(196, 188, 188, 0.445);
}
</style>
