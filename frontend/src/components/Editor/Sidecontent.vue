<template>
      <!-- <v-navigation-drawer permanent="permanent" dark class="content"> -->
    <component :is="selected" class="content"/>
      <!-- </v-navigation-drawer> -->
</template>

<script>
export default {
  props: { 'selected': String },
  components: {
    Tree: () => import('@/components/Editor/Side_tree'),
    Explain: () => import('@/components/Editor/Side_explain'),
    Search: () => import('@/components/Editor/Side_search'),
    Setting: () => import('@/components/Editor/Side_setting')
  },
  data() {
    return {
    }
  }
}

</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background-color: #363636;
  color: #ffffff;
}

</style>
