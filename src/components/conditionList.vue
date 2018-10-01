<template>
  <div>
      <template v-for="(c, i) in conditions">
         <div :key="'condition-'+i">
            <condition @change="conditionHandle(i, $event)" :type="type" />
            <button class="delete-btn" @click="removeCondition(i)">&times;</button>
            <hr>
         </div>
      </template>
      <br>
      <button @click="addCondition">+</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Condition from '@/components/condition'

export default {
  components: { Condition },
  props: ['type'],
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
  watch: {
      code(code){
          this.$emit('change', code)
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
