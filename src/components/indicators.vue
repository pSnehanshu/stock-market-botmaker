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
            <input type="number" :placeholder="input.name" :title="input.name"
                v-for="(input, k) in indicators[selectedIndicator].inputs"
                :key="'input-'+k" :value="input.dflt"
            >
        </template>

        <!--Timeframe-->
        <select v-model="timeframe" v-if="selectedIndicator != null">
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
    }),
}
</script>

