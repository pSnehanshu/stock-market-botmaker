<template>
    <div>
        <!--Indicator-->
        <select v-model="selectedIndicator">
            <option :value="null">-SELECT-</option>
            <option :value="i" v-for="(indicator, i) in indicators" :key="'indicator-'+i">
                {{ indicator.name }}
            </option>
        </select>

        <template v-if="selectedIndicator != null" >
            <!--Inputs-->
            <template v-for="(input, k) in indicators[selectedIndicator].inputs">
                <div :key="'input-'+k">
                    <label>
                        {{ input.name }}:
                        <input
                            type="number"
                            :placeholder="input.name"
                            :title="input.name"
                            v-model="inputValues[input.code]"
                            @input="emitChange"
                        >
                    </label><br>
                </div>
            </template>

            <!--Timeframe-->
            <select v-model="timeframe" @change="emitChange">
                <option :value="j" v-for="(tf, j) in timeframes" :key="'tf-'+j">
                    {{ tf.name }}
                </option>
            </select>

            Candle: <input type="number" v-model="candle">
        </template>
    </div>
</template>

<script>
import indicators from '@/indicators'
import ejs from 'ejs'
import indicatorTmpt from '@/py-templates/indicator'

const template = ejs.compile(indicatorTmpt)

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
        inputValues: {},
        candle: 1,
    }),

    methods: {
        emitChange() {
            var indicator = this.indicators[this.selectedIndicator]

            var output = template({
                fn: indicator.code,
                inputs: this.inputValues,
                timeframe: this.timeframes[this.timeframe].code,
                ohlcKeys: indicator.ohlcKeys,
                nonp: indicator.nonp,
                candle: this.candle,
            })

            this.$emit('change', output)
        },
    },

    watch: {
      selectedIndicator (index){
         this.inputValues = {}

         this.indicators[index].inputs.forEach((input, i) => {
            this.inputValues[input.code] = input.dflt
         })

         this.emitChange()
      },
      candle (){
          this.emitChange()
      }
    },
}
</script>
