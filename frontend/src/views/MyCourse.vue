<template>
<div class="wrap-body">
  <v-row no-gutters>
    <v-col :cols="3">
      <side />
    </v-col>
    <v-col :cols="9" class="pa-4">
      <list />
    </v-col>
  </v-row>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Mycourse",
  components: {
    list: () => import('@/components/MyCourse/List'),
    side: () => import('@/components/MyCourse/Side')
  },
  data: () => ({
  })
}
</script>

<style scoped>
.wrap-body {
  width: 100%;
  height: 100%;
  background-color: "#51844c";
}
.body-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 2%;
}
</style>
