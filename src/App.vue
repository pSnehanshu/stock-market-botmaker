<template>
  <div id="app">
      <div>
          <h1>Open</h1>
          <condition-list type="open" @change="open=$event" />
          <pre>{{open}}</pre>
      </div>
      <div>
          <h1>Close</h1>
          <condition-list type="close" @change="close=$event" />
          <pre>{{close}}</pre>
      </div>
  </div>
</template>

<script>
import ConditionList from '@/components/conditionList'

export default {
  name: 'app',
  components: { ConditionList },
  data: () => ({
    open: '',
    close: '',
  }),
  
}
</script>
