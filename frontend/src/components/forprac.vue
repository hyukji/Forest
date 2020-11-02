<template>
  <div id="menu">
    <ul>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
        <li>owepwew</li>
    </ul>
</div>      
</template>

<script>
  export default {
    data: () => ({
      offsetTop: 0
    }),

    methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      }
    }
  }
</script>

<style scoped>
#container {
    width: 500px;
    border: 3px solid red;
    margin: 0 auto;
}

#sidebar {
    width: 150px;
    height: 100%;
    background-color: yellow;
    overflow-y: scroll;
}


p, ul {
    padding: 10px;
}
</style>




  
