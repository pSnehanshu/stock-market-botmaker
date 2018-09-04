export default [
    {
        name: 'Double exp moving avg (DEMA)',
        code: 'DMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
        ohlcKeys: ['Close'],
    },
    {
        name: 'Exp moving avg (EMA)',
        code: 'EMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Moving avg (MA)',
        code: 'MA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Kaufman Adaptive moving avg (KAMA)',
        code: 'KAMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Simple moving avg (SMA)',
        code: 'SMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Triple exp moving avg (TEMA)',
        code: 'TEMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Triangular moving avg (TRIMA)',
        code: 'TRIMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Waited moving avg (WMA)',
        code: 'WMA',
        inputs: inputs(['Time period', 'timeperiod', 30]),
    },
    {
        name: 'Average directional movement index (ADX)',
        code: 'ADX',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Average directional index rating (ADXR)',
        code: 'ADXR',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Commodity channel index (CCI)',
        code: 'CCI',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Chande momentum oscillator (CMO)',
        code: 'CMO',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Directional movement index (DX)',
        code: 'DX',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Balance of Power',
        code: 'BOP',
        inputs: inputs(),
    },
    {
        name: 'Aroon Oscillator',
        code: 'AROONOSC',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Money flow index',
        code: 'MFI',
        inputs: inputs(['Time period', 'timeperiod', 14]),
    },
    {
        name: 'Relative strength index',
        code: 'RSI',
        inputs: inputs(['Time period', 'timeperiod', 14]),
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
