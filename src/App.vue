<template>
  <div id="app">
      <button @click="getFile">Download</button>
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
  </div>
</template>

<script>
import ConditionList from '@/components/conditionList'
import SlTpTk from '@/components/sl_tp_tk'
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
    configs: {
        max_trades: {
            name: 'Max trades',
            val: 5,
        },
        qty_multiplier: {
            name: 'Leverage',
            val: 20,
        },
        qty_parts: {
            name: 'Capital division',
            val: 10,
        },
        trade_start_hour: {
            name: 'Trade start hour',
            val: 9,
        },
        trade_start_minute: {
            name: 'Trade start minute',
            val: 15,
        },
        trade_end_hour: {
            name: 'Trade end hour',
            val: 10,
        },
        trade_end_minute: {
            name: 'Trade end minute',
            val: 0,
        },
    },
  }),
  
  methods: {
    getFile(){
        var code = this.botCode()
        console.log(code)
        saveAs(code, "bot.py");
    },

    analysisCode(indent=0) {
        var output = analysisTemplate({
            open: indentText(this.open, indent),
            close: indentText(this.close, indent),
            stopLoss: this.stopLoss,
            takeProfit: this.takeProfit,
            tick: this.tick,
        })

        return output
    },
    configsCode(indent=0) {
        var config = {}
        for (var c in this.configs) {
            config[c] = this.configs[c].val
        }

        return configTemplate(config)
    },
    botCode(indent=0){
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
    for (i in level){
        spaces += ' '
    }
    var output = ''

    lines.forEach( function(line){
        output += spaces + line + '\n'
    })

    console.log(output)

    return output
}

</script>
