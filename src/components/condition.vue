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
    props: ['type'],
    data: () => ({
        operator: '<',
        lhs: null,
        rhs: null,
    }),
    methods: {
        lhsUpdate(code=''){
            this.lhs = code
            this.onUpdate()
        },
        rhsUpdate(code=''){
            this.rhs = code
            this.onUpdate()
        },

        onUpdate(){
            var output = template({
                lhs: this.lhs,
                rhs: this.rhs,
                operator: this.operator,
                open: (this.type.toLowerCase().trim()=='open'),
            })

            this.$emit('change', output)
        },
    },
}
</script>
