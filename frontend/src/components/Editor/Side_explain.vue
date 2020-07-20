<template>
  <div>
    <v-card title raised>

    <v-row justify="space-around">
    <v-btn icon color="success">
      <v-icon>{{ "fas fa-arrow-left" }}</v-icon>
    </v-btn>
          <p class="text-center text-h6 ma-1">prob2</p>
    <v-btn icon color="success">
      <v-icon>{{ "fas fa-arrow-right" }}</v-icon>
    </v-btn>
  </v-row>
    </v-card>
    <v-sheet
      :class="overflow-y-auto"
      class="pa-5"
      max-height="600"
      tile
      color="dark_gray"
    >
    <div v-for="item in items" :key="item">
    <div class="text-h6" v-text="item.title"/>
    <div class="text-body1" v-text="item.content"/>
    <br/>
  </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      selected: 0,
      items: [
        { title: '문제 설명' , content: 'content' },
        { title: 'Parameter' , content: 'name: string' },
        { title: 'Return' , content: 'id: int' },
      ]
    }
  },
};
</script>

<style scoped>
.wrap{
  width:10%;
}
</style>
