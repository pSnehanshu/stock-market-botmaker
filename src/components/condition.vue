<template>
    <div>
        <indicator/>
        
        <select v-model="operator">
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="<=">&le;</option>
            <option value=">=">&ge;</option>
            <option value="==">=</option>
            <option value="!=">&ne;</option>
        </select>
        
        <indicator/>
    </div>
</template>

<script>
import Indicator from '@/components/indicators'

export default {
    components: { Indicator },
    data: () => ({
        operator: '<',
    }),
}
</script>
