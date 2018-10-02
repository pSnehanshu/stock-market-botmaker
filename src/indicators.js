export default [
    {
        name: 'Double exp moving avg (DEMA)',
        code: 't.DMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Exp moving avg (EMA)',
        code: 't.EMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Moving avg (MA)',
        code: 't.MA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Kaufman Adaptive moving avg (KAMA)',
        code: 't.KAMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Simple moving avg (SMA)',
        code: 't.SMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Triple exp moving avg (TEMA)',
        code: 't.TEMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Triangular moving avg (TRIMA)',
        code: 't.TRIMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Waited moving avg (WMA)',
        code: 't.WMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Average directional movement index (ADX)',
        code: 't.ADX',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Average directional index rating (ADXR)',
        code: 't.ADXR',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Commodity channel index (CCI)',
        code: 't.CCI',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Chande momentum oscillator (CMO)',
        code: 't.CMO',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Directional movement index (DX)',
        code: 't.DX',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Balance of Power',
        code: 't.BOP',
        inputs: inputs(),
    },
    {
        name: 'Aroon Oscillator',
        code: 't.AROONOSC',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Money flow index',
        code: 't.MFI',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Relative strength index',
        code: 't.RSI',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    
    {
        name: 'Closing price',
        code: '',
        inputs: inputs(),
        ohlcKeys: ['Close'],
    },
    {
        name: 'Opening price',
        code: '',
        inputs: inputs(),
        ohlcKeys: ['Open'],
    },
    {
        name: 'High price',
        code: '',
        inputs: inputs(),
        ohlcKeys: ['High'],
    },
    {
        name: 'Low price',
        code: '',
        inputs: inputs(),
        ohlcKeys: ['Low'],
    },
]


// Functions
function input (name, code, dflt=null){
    return { name, code, dflt }
}

function inputs(...inp){
    var inps = []
    inp.forEach(function (i){
        inps.push(input( i[0], i[1], i[2] ))
    })
    return inps
}
