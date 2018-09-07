export default 
`import numpy as np
import talib as t
import pandas as pd

def open_trade_analysis(temp,live,candle = 1):
    T1,T5,T10,T30,T60 = temp
    ltp_live = live['ltp']
    close_live = live['close']
    openprice_live = live['open']
    high_live = live['high']
    low_live = live['low']
    
    # Open conditions
    <%- open %>

    return True


def sl_tp_tk(temp,live):
    T1,T5,T15,T30,T60 = temp
    ltp_live = live['ltp']
    close_live = live['close']
    openprice_live = live['open']
    high_live = live['high']
    low_live = live['low']
    
    # SL_TP_TK codes
    sl = <%- stopLoss %>
    tp = <%- takeProfit %>
    tk = <%- tick %>

    return sl,tp,tk



def close_trade_analysis(temp,live,candle = 1):
    T1,T5,T10,T30,T60 = temp
    ltp_live = live['ltp']
    close_live = live['close']
    openprice_live = live['open']
    high_live = live['high']
    low_live = live['low']

    # Close code
    <%- close %>

    return False`
