<template>
  <div>
    <p class="body-title">내 강의</p>
    <card />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Mycourse",
  components: {
    Card: () => import('@/components/MyCourse/Card')
  },
  data: () => ({})
};
</script>

<style scoped>
.body-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 2%;
}
.card {
  float: left;
}
</style>
