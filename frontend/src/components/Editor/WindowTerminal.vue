<template>
  <div class="wrap">
    <v-row no-gutters>
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" class="ma-2" v-bind="attrs" v-on="on">{{ selected.lecture }}</v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="selected.lecture" mandatory>
            <v-list-item v-for="n in lectures" :key="n" :value="n" link>
              <v-list-item-title v-text="n"></v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="secondary" class="ma-2" v-bind="attrs" v-on="on">{{ selected.problem }}</v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="selected.problem" mandatory>
            <v-list-item v-for="n in problems" :key="n" :value="n" link>
              <v-list-item-title v-text="n"></v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>

      <v-btn color="primary" class="ma-2" @click="getCode">Run</v-btn>
    </v-row>
    <div v-for="i in results">{{ i }}</div>
    <input v-if="waiting" v-model="input" @keyup.enter="submit" />
  </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {
  components: {},
  data() {
    return {
      lectures: ["lecture1", "lecture2", "lecture3"],
      problems: ["problem1", "problem2"],
      results: [],
      input: "",
      waiting: false,
      a: 0
    }
  },
  props: {
    data: {
      type: Array
    },
    selected: {
      type: Object
    }
  },
  methods: {
    getCode() {
      eventBus.$emit('exeCode', this.selected)
    },
    submit(event) {
      this.waiting = false
      this.results.push(this.input)
      this.$socket.emit('input', {
        input: this.input
      })
      this.input=""
    }
  },
  computed: {
    hi() {
      return this.a
    }
  },
  created() {
    this.$socket.on('result', (result) => {
      //data format 다시 바꾸기
      console.log("result", result)
      this.results.push(result.message)
      //results를 리스트 말고 스트링으로 바꿔야 함
      this.result = result.message;
    })
      // this.$socket.on("input", () => {
      //   this.waiting = true;
      // });
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
