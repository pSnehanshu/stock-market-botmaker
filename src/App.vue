<template>
  <div id="app">
      <template v-for="i in numConditions">
         <condition :key="'condition-'+i"/>
         <button :key="'del-btn-'+i" >&times;</button>
         <hr :key="'sep-hr-'+i">
      </template>
      <br>
      <button @click="numConditions++">+</button>
  </div>
</template>

<script>
import Condition from '@/components/condition'

export default {
  name: 'app',
  components: { Condition },
  data: () => ({
     numConditions:1,
  }),
}
</script>

<style>
.operator{
   text-align: center;
}
.delete-btn{
   background-color: red;
   color: white;
}
</style>
