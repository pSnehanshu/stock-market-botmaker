<template>
  <div id="app">
      <div>
          <h1>Configs</h1>
          <table>
              <tr v-for="(config, i) in configs" :key="'config-'+i">
                  <th v-text="config.name"></th>
                  <td>
                      <input type="text" v-model="config.val">
                  </td>
              </tr>
          </table>
      </div>
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
      <div>
          <h1>Stop loss</h1>
          <sl-tp-tk @change="stopLoss='sl = '+$event" />
      </div>
      <div>
          <h1>Take profit</h1>
          <sl-tp-tk @change="takeProfit='tp = '+$event" />
      </div>
      <div>
          <h1>Trailing Tick</h1>
          <sl-tp-tk @change="tick='tk = '+$event" />
      </div>

      <button @click="getFile">Download</button>

  </div>
</template>

<script>
import ConditionList from '@/components/conditionList'
import SlTpTk from '@/components/sl_tp_tk'
import config from '@/config.js'
import ejs from 'ejs'
import { saveAs } from 'file-saver/FileSaver'
import AnalysisTmplt from '@/py-templates/analysis'
import ConfigTmplt from '@/py-templates/config'
import BotTmplt from '@/py-templates/bot'

const analysisTemplate = ejs.compile(AnalysisTmplt)
const configTemplate = ejs.compile(ConfigTmplt)
const botTemplate = ejs.compile(BotTmplt)

export default {
  name: 'app',
  components: { ConditionList, SlTpTk },
  data: () => ({
    open: '',
    close: '',
    stopLoss: '',
    takeProfit: '',
    tick: '',
  }),

  computed: {
      configs() {
          return config
      }
  },
  
  methods: {
    getFile(){
        var code = this.botCode()
        var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "bot.py");
    },

    analysisCode() {
        var output = analysisTemplate({
            open: indentText(this.open),
            close: indentText(this.close),
            stopLoss: this.stopLoss,
            takeProfit: this.takeProfit,
            tick: this.tick,
        })

        return output
    },
    configsCode() {
        var config = {}
        for (var c in this.configs) {
            config[c] = this.configs[c].val
        }

        return configTemplate(config)
    },
    botCode(){
        var output = botTemplate({
            config: this.configsCode(),
            analysis: this.analysisCode(),
        })

        return output
    },
  },

}

function indentText(string='', level=4){
    var lines = string.split('\n')
    var spaces = ''
    for (var i=0; i<level; i++){
        spaces += ' '
    }
    var output = ''

    lines.forEach( function(line){
        output += spaces + line + '\n'
    })

    return output
}

</script>
