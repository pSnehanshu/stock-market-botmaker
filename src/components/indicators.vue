<template>
    <div>
        <!--Indicator-->
        <select v-model="selectedIndicator">
            <option :value="null">INDICATOR</option>
            <option :value="i" v-for="(indicator, i) in indicators" :key="'indicator-'+i">
                {{ indicator.name }}
            </option>
        </select>

        <!--Inputs-->
        <template v-if="selectedIndicator != null">
           <template v-for="(input, k) in indicators[selectedIndicator].inputs">
              <div :key="'input-'+k">
                  <label>
                      {{ input.name }}:
                      <input
                        type="number"
                        :placeholder="input.name"
                        :title="input.name"
                        v-model="inputValues[k]"
                        @input="emitChange"
                      >
                  </label><br>
              </div>
           </template>
        </template>

        <!--Timeframe-->
        <select v-model="timeframe" v-if="selectedIndicator != null" @change="emitChange">
            <option :value="j" v-for="(tf, j) in timeframes" :key="'tf-'+j">
                {{ tf.name }}
            </option>
        </select>
    </div>
</template>

<script>
import indicators from '@/indicators'

export default {
    data: () => ({
        indicators,
        selectedIndicator: null,
        timeframe: 1,
        timeframes: [
            {
                name: '1 min',
                code: 'T1',
            },
            {
                name: '5 min',
                code: 'T5',
            },
            {
                name: '10 min',
                code: 'T10',
            },
            {
                name: '30 min',
                code: 'T30',
            },
            {
                name: '60 min',
                code: 'T60',
            },
        ],
        inputs: null,
        inputValues: {},
        output: null,
    }),

    methods: {
        emitChange() {
            var indicator = this.indicators[this.selectedIndicator].code
            var timeframe = this.timeframes[this.timeframe].code
            var inputs = this.inputValues

            this.output = { indicator, inputs, timeframe }
            this.$emit('change', this.output)
        },
    },

    watch: {
      selectedIndicator (index){
         this.inputs = this.indicators[index].inputs
         this.inputValues = {}
         this.inputs.forEach((input, i) => {
            this.inputValues[i] = input.dflt
         })
         this.emitChange()
      }
    },
}
</script>
