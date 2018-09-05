<template>
  <div id="app">
      <template v-for="(c, i) in conditions">
         <div :key="'condition-'+i">
            <condition @change="conditionHandle(i, $event)" />
            <button class="delete-btn" @click="removeCondition(i)">&times;</button>
            <hr>
         </div>
      </template>
      <br>
      <button @click="addCondition">+</button>
      <pre>{{ code }}</pre>
  </div>
</template>

<script>
import Vue from 'vue'
import Condition from '@/components/condition'

export default {
  name: 'app',
  components: { Condition },
  data: () => ({
     conditions: {},
     lastConditionIndex:0,
  }),
  computed: {
    code() {
      var code = ''      
      for (var i in this.conditions){
        code += this.conditions[i]
      }
      return code
    },
  },
  methods: {
    conditionHandle(i, condition) {
      console.log(i)
      this.conditions[i] = condition
    },
    removeCondition(i){
      Vue.delete(this.conditions, i)
    },
    addCondition(){
      this.lastConditionIndex++
      Vue.set(this.conditions, this.lastConditionIndex, '')
    }
  },
}
</script>

<style>
.delete-btn{
   background-color: red;
   color: white;
}
</style>
