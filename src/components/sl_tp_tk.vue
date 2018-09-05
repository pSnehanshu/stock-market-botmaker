<template>
    <div>
        <indicator @change="indicator=$event;handleChange()" />
        <input type="text" v-model="modifier" placeholder="* 13 + 5">
    </div>
</template>

<script>
import Indicator from '@/components/indicators'

export default {
    components: { Indicator },
    data: () => ({
        modifier: '',
        indicator: '',
    }),
    methods: {
        handleChange() {
            var code = this.indicator + this.modifier
            this.$emit('change', code)
        }
    },
    watch: {
        modifier() {
            this.handleChange()
        },
    },
}
</script>
