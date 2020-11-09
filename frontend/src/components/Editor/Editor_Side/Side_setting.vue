<template>
  <div>
    <v-card color="dark_gray">
      <v-card-subtitle> Setting </v-card-subtitle>
    </v-card>
    <div class="pa-3" font-size="10px">
      <v-checkbox v-model="checkbox" label="Auto Indent" value="Auto Indent"></v-checkbox>
      <v-checkbox v-model="checkbox" label="Show Line Number" value="Show Line Number"></v-checkbox>

      <v-overflow-btn
        :items="UI_Theme"
        label="UI Theme"
        overflow
      ></v-overflow-btn>
      Syntax Theme
      Font Family
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      checkbox: [],
      UI_Theme: [
        { text: 'Light', callback: () => console.log('list') },
        { text: 'Dark', callback: () => console.log('favorite') },
      ],
    }
  },
};
</script>

<style scoped>

</style>
