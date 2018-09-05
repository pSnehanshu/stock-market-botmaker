<template>
    <div>
        <indicator @change="lhsUpdate"/>
        
        <select v-model="operator" @input="onUpdate">
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="<=">&le;</option>
            <option value=">=">&ge;</option>
            <option value="==">=</option>
            <option value="!=">&ne;</option>
        </select>
        
        <indicator @change="rhsUpdate"/>
    </div>
</template>

<script>
import Indicator from '@/components/indicators'
import ejs from 'ejs'
import conditionTmpt from '@/py-templates/condition'

const template = ejs.compile(conditionTmpt)

export default {
    components: { Indicator },
    data: () => ({
        operator: '<',
        lhs: null,
        rhs: null,
        candle: {
            lhs: 1,
            rhs: 1,
        },
    }),
    methods: {
        lhsUpdate(code='', candle=1){
            this.lhs = code
            this.candle.lhs = candle
            this.onUpdate()
        },
        rhsUpdate(code='', candle=1){
            this.rhs = code
            this.candle.rhs = candle
            this.onUpdate()
        },

        onUpdate(){
            var output = template({
                lhs: this.lhs,
                rhs: this.rhs,
                operator: this.operator,
                open: true,
                candle: this.candle,
                nonp: this.nonp,
            })

            this.$emit('change', output)
            console.log(output)
        },
    },
}
</script>
