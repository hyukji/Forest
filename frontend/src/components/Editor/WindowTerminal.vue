<template>
  <div class="pl-4 pt-2 wrap">
    <v-row align="center">
      <!-- <v-col cols="5"> <v-text-field v-model="label"></v-text-field></v-col> -->
      <v-col class="white--text">
        <!-- <v-select v-model="model" :items="items" dense @click="getitmes">
        <template v-slot:selection="{ item, index }">
          <span class="grey--text">{{ item.tab_title }}</span>
        </template>
        </v-select>-->

        <v-menu close-on-click="true" dark disable-keys v-model="value" offset-y="true">
          <template v-slot:activator="{ on, attrs }">
            <v-col class="pa-0 " cols="12">
              <v-text-field
                dense
                outlined
                dark
                v-model="model.tab_title"
                v-bind="attrs"
                v-on="on"
                hide-details
                append-icon="far fa-angle-down"
                @click:append="value = !value"
              ></v-text-field>
            </v-col>
          </template>

          <v-list dense>
            <v-list-item v-for="(item, index) in items" :key="index" @click="model = item">
              <v-list-item-icon>
                <v-icon size="18" v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content class="pr-3">
                <v-list-item-title>{{ item.tab_title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>

      <v-btn color="secondary" outlined class="ma-2" @click="run">실행</v-btn>
      <v-btn color="secondary" outlined class="ma-2" @click>제출</v-btn>
      <v-spacer />
    </v-row>
    <div class="tabfont--text">{{ model }}</div>
    <div class="tabfont--text" v-for="(i,index) in results" :key="index">{{ i }}</div>
    <input v-if="waiting" v-model="input" @keyup.enter="submit" />

  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: false,
      model: { tab_title: "" },
      results: [],
      waiting: false,
      input: "",
    };
  },
  computed: {
    items() {
      var res = [];
      this.$store.state.nowTab.forEach((OneEditor, idx) => {
        OneEditor.forEach((onetab, i) => {
          if (
            !(
              onetab.tab_title == "WindowTerminal" || onetab.tab_title == "Live"
            )
          ) {
            res.push(onetab);
          }
        });
      });
      return res;
    },
  },
  // watch: {
  //   items() {
  //     console.log("item watch")
  //     this.items_title = []
  //     this.items.forEach((OneEditor, idx) => {
  //       OneEditor.forEach((onetab, i) => {
  //         if (
  //           !(
  //             onetab.tab_title == "WindowTerminal" || onetab.tab_title == "Live"
  //           )
  //         ) {
  //           this.items_title.push(onetab.tab_title)
  //           console.log(this.items_title)
  //         }
  //       })
  //     })
  //   },
  // },
  methods: {
    showitem() {
      console.log("it siadfsvdc");
    },
    getitmes() {
      this.items = this.$store.state.nowTab[0];
      this.items.push(this.$store.state.nowTab[1]);
    },
    run() {
      this.results = [];
      this.waiting = true;
      var string =
        'print("hello")\nfor i in [1, 2, 3]:\n\tprint(i)\na = input("enter the input")\nprint("input:", a)';
      this.$socket.emit("code", this.model.data);
    },
    submit(event) {
      //this.waiting = false
      //this.results.push(this.input)
      let data = { id: this.id, input: this.input };
      this.$socket.emit("input", data);
      this.input = "";
    },
  },
  created() {
    this.$socket.on("result", (result) => {
      //data format 다시 바꾸기
      console.log("result", result);
      this.results = this.results.concat(result.data.split("\n"));
      this.id = result.id;
    });
    this.$socket.on("closeStdin", () => {
      this.waiting = false;
    });
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #1d1f21;
}
</style>
