<template>
  <div id="app">
    <indicator />
  </div>
</template>

<script>
import Indicator from '@/components/indicators'

export default {
  name: 'app',
  components: { Indicator }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
