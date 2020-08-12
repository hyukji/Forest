<template>
  <div>
    <v-row no-gutters align="center">
      <!-- <v-col cols="5"> <v-text-field v-model="label"></v-text-field></v-col> -->
      <v-col class="">
        <!-- <v-select v-model="model" :items="items" dense @click="getitmes">
        <template v-slot:selection="{ item, index }">
          <span class="grey--text">{{ item.tab_title }}</span>
        </template>
      </v-select> -->

        <v-menu close-on-click="true">
          <template v-slot:activator="{ on, attrs }">
            <v-col cols="12">
              <v-text-field
                dense
                outlined
                v-model="model.tab_title"
                v-bind="attrs"
                v-on="on"
                hide-details
                append-icon="far fa-angle-down"
              ></v-text-field>
            </v-col>
          </template>

          <v-list dense>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="model = item"
            >
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

      <v-btn color="secondary" outlined class="ma-2" @click="run">
        실행
      </v-btn>
      <v-btn color="secondary" outlined class="ma-2" @click>
        제출
      </v-btn>
      <v-spacer />
    </v-row>
    <div>
      {{ model }}
    </div>
    <div v-for="i in results">{{ i }}</div>
    <input v-if="waiting" v-model="input" @keyup.enter="submit" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      model: { tab_title: "" },
      results: [],
      waiting: true,
      input: ""
    }
  },
  computed: {
    items() {
      var res = []
      this.$store.state.nowTab.forEach((OneEditor, idx) => {
        OneEditor.forEach((onetab, i) => {
          if (
            !(
              onetab.tab_title == "WindowTerminal" || onetab.tab_title == "Live"
            )
          ) {
            res.push(onetab)
          }
        })
      })
      return res
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
    getitmes() {
      this.items = this.$store.state.nowTab[0]
      this.items.push(this.$store.state.nowTab[1])
    },
    run() {
      this.results = []
      this.$socket.emit('code', {code:
        'print("hello")\nfor i in [1, 2, 3]:\n\tprint(i)\na = input("enter the input")\nprint("input:", a)'})
    },
    submit(event) {
      //this.waiting = false
      //this.results.push(this.input)
      this.$socket.emit('input', this.id, this.input)
      this.input=""
    }

  },
  created() {
    this.$socket.on('result', (result) => {
      //data format 다시 바꾸기
      console.log("result", result)
      this.results = this.results.concat(result.data.split('\n'))
      this.id = result.id
    })
  }
  }
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd;
}
</style>
