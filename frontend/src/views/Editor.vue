<template>
<div class="wrap-Mycourse-cards">

  {{$route.params.lecture }}
    <side-tab/>
  <drawer/>


</div>
</template>

<script>
// @ is an alias to /src
import { eventBus } from "../main.js"

export default {
  name: "editor",
  components: {
    Drawer: () => import('@/components/Editor/Drawer'),
    SideTab: () => import('@/components/Editor/Sidetab')
  },
};
</script>

<style scoped>
.wrap-Mycourse-cards {
  float: left;
}
.btn-nowlearn {
  padding-right: 5%;
  padding-bottom: 3%;
  text-align: right;
}
</style>
