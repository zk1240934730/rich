<template>
  <div id="app">
    <router-view/> 
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  components: { }
}
</script>
<style lang="scss">
@import url('./assets/css/common.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  background-color: #f3f6fb;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
