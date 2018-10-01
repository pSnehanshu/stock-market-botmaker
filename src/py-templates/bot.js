export default
`#!/usr/bin/env python
import pandas as pd
import numpy as np
import datetime as dt
from datetime import datetime, timedelta
from upstox_api.api import *
import pickle
from pathlib import Path
import threading
import time
import schedule
import talib as t
import subprocess
import requests

d = str(Path().resolve().parent).replace("\\","/")

#######################################################################
# CONFIG
<%- config %>
#######################################################################

############################################################################################
#Some basic functions
############################################################################################

def check_status(name):
    temp = pd.read_csv(status_path)
    if np.array(temp[temp['Name'] == name])[0][1] == 'off':
        exit()
    return 'on'

def printf(text = ""):
    print(str(text))
    with open(log_path, "a") as myfile:
        myfile.write(str(dt.datetime.now())+' : '+str(text)+'\n')

def refresh_session():
    while True:
        key = requests.get('http://hyndex.com:6000/?a='+username+'&b='+password+'&c='+dob).content
        if (key != 'failed'):
            break

    u = update_upstox_session(key)      
    return u
    
def reset_open_trades():
    printf('404 script started for today')
    pd.DataFrame([404],columns=['Code']).to_csv(open_db_path, index = False)

def clear_logs():
    text = ""
    with open(log_path, "w") as myfile:
        myfile.write(str(text))

def reset_status():
    pd.DataFrame([['open','on'],['close','on']],columns=['Name','Status']).to_csv(status_path,index=False)

def reset_all():
    reset_status()
    clear_logs()
    reset_open_trades()




############################################################################################
# upstox session manual
############################################################################################
def update_upstox_session(code = 0):
    try:    
        s = Session (api_code)
        s.set_redirect_uri ('https://en.wikipedia.org/wiki/Sensex')
        s.set_api_secret (api_secret)
        s.set_code (code)
        access_token = s.retrieve_access_token()
        printf('Received access_token: %s' % access_token)
        return Upstox (api_code, access_token)
        
    except:
        printf('Please update the session code or enter the new session code as a parameter')




############################################################################################
#Data fetching functions Live and Historical
############################################################################################
def get_data(name = 'TCS'):
    u = refresh_session()
    u.get_master_contract('NSE_EQ')
    T1 = u.get_ohlc(u.get_instrument_by_symbol('NSE_EQ', name), OHLCInterval.Minute_1, (datetime.today() - timedelta(days=4)).date(), dt.datetime.now().date())
    T5 = u.get_ohlc(u.get_instrument_by_symbol('NSE_EQ', name), OHLCInterval.Minute_5, (datetime.today() - timedelta(days=10)).date() ,dt.datetime.now().date())
    T10 = u.get_ohlc(u.get_instrument_by_symbol('NSE_EQ', name), OHLCInterval.Minute_10, (datetime.today() - timedelta(days=15)).date() ,dt.datetime.now().date())
    T30 = u.get_ohlc(u.get_instrument_by_symbol('NSE_EQ', name), OHLCInterval.Minute_30, (datetime.today() - timedelta(days=30)).date() ,dt.datetime.now().date())
    T60 = u.get_ohlc(u.get_instrument_by_symbol('NSE_EQ', name), OHLCInterval.Minute_60, (datetime.today() - timedelta(days=40)).date() ,dt.datetime.now().date())
    T1 = pd.DataFrame(T1).rename(columns={'timestamp':'Timestamp','open': 'Open', 'close': 'Close', 'cp': 'LTP','low': 'Low','high': 'High','volume': 'Volume'})
    T5 = pd.DataFrame(T5).rename(columns={'timestamp':'Timestamp','open': 'Open', 'close': 'Close', 'cp': 'LTP','low': 'Low','high': 'High','volume': 'Volume'})
    T10 = pd.DataFrame(T10).rename(columns={'timestamp':'Timestamp','open': 'Open', 'close': 'Close', 'cp': 'LTP','low': 'Low','high': 'High','volume': 'Volume'})
    T30 = pd.DataFrame(T30).rename(columns={'timestamp':'Timestamp','open': 'Open', 'close': 'Close', 'cp': 'LTP','low': 'Low','high': 'High','volume': 'Volume'})
    T60 = pd.DataFrame(T60).rename(columns={'timestamp':'Timestamp','open': 'Open', 'close': 'Close', 'cp': 'LTP','low': 'Low','high': 'High','volume': 'Volume'})
    T1['Timestamp'] = pd.to_datetime(T1['Timestamp'], unit='ms')
    T5['Timestamp'] = pd.to_datetime(T5['Timestamp'], unit='ms')
    T10['Timestamp'] = pd.to_datetime(T10['Timestamp'], unit='ms')
    T30['Timestamp'] = pd.to_datetime(T30['Timestamp'], unit='ms')
    T60['Timestamp'] = pd.to_datetime(T60['Timestamp'], unit='ms')
    return [T1,T5,T10,T30,T60]

def get_live_price(name):
    u = refresh_session()
    u.get_master_contract('NSE_EQ')
    return u.get_live_feed(u.get_instrument_by_symbol('NSE_EQ', name), LiveFeedType.Full)


#################################################################################################
# ANALYSIS
<%- analysis %>
#################################################################################################


############################################################################################
#Trade placing and closing functions 
############################################################################################

def trade_open(name , price, qty = 1 ,sl = None , tp = None , tk = None):
    #s,live['ltp'],data,live,qty,sl,tp,tk
    u = refresh_session()
    return (u.place_order(TransactionType.Buy if side == 'BUY' else TransactionType.Sell,  # transaction_type
    u.get_instrument_by_symbol('NSE_EQ', name),  # instrument
    qty,  # quantity
    OrderType.Limit,  # order_type
    ProductType.OneCancelsOther,  # product_type
    float(price),  # price
    None,  # trigger_price
    0,  # disclosed_quantity
    DurationType.DAY,  # duration
    float(sl),  # stop_loss
    float(tp),  # square_off
    int((1+tk)*20)))['order_id']  # trailing_ticks 20 * 0.05



def trade_close(order_id):
    u = refresh_session()  
    u.cancel_order(str(order_id))

def trade_all_close():
    u = refresh_session()  
    u.cancel_all_orders()
    reset_open_trades()



############################################################################################
#Calculate suitable quantity of stocks
############################################################################################

def calculate_qty(balance,ltp,multiplier = qty_multiplier,parts = qty_parts):
    margin = balance['equity']['available_margin']*multiplier
    qty = int(margin/(parts*ltp))
    return qty



############################################################################################
#Checks the stocks to take position
############################################################################################

def trade_init():
    path_to_selected_csv = (selected_db_path)
    check_status('open')
    u = refresh_session()
    while True:
        try:
            balance = u.get_balance()
            break
        except:
            printf("Unable to get balance so restarting")
            continue
    
        
    t1 = dt.datetime.now()
    stocks = pd.read_csv(selected_db_path)
    stocks = stocks.drop_duplicates(['Name'])
    open_positions = []
    j = 0

    if (t1.hour*100+t1.minute > trade_end_hour*100+trade_end_minute) or (dt.datetime.now().isoweekday() == 6 or dt.datetime.now().isoweekday() == 7):
        printf('INVALID time to start trade')
        return

    while (t1.hour*100+t1.minute < trade_start_hour*100+trade_start_minute):
        check_status('open')
        time.sleep(10)
        t1 = dt.datetime.now()
        printf('Waiting for right time to start placing trade')

    time.sleep(10)
        
    printf('Trade place starting')
    t1 = dt.datetime.now()
    while (stocks.empty == False):
        t1 = dt.datetime.now()
        
        if (t1.hour*100+t1.minute < trade_start_hour*100+trade_start_minute) or (t1.hour*100+t1.minute > trade_end_hour*100+trade_end_minute):
            printf('Time is not correct for trading')
            return
            
        check_status('open')
        for s in stocks['Name']:
            printf("Checking : "+str(s))
            check_status('open') 
            u = refresh_session()
            u.get_master_contract('NSE_EQ')
            live = get_live_price(s)
            data = get_data(s)
            print(s,open_trade_analysis(data,live))
            if open_trade_analysis(data,live):
                #####################
                if j > max_trades:
                    return stocks
                qty = calculate_qty(balance,live['ltp'])
                if qty == 0:
                    stocks = stocks[stocks['Name'] != s]
                    continue
                #####################
            
                sl,tp,tk = sl_tp_tk(data,live)

                ids = trade_open(s,live['ltp'],qty,sl,tp,tk)
                printf(s+str(live['ltp'])+str(qty)+str(sl)+str(tp)+str(tk))
                j = j+1
                    
  
                if ('Code' in pd.read_csv(open_db_path).columns):
                    open_positions = [[s, ids, live['ltp'], qty,sl,tp,tk]]
                    open_df = pd.DataFrame(open_positions, columns=['Name', 'ID', 'Price', 'Qty','SL','TP','TK'])
                    open_df.to_csv(open_db_path, index=False)
                else:
                    open_positions = pd.DataFrame([[s, ids, live['ltp'], qty,sl,tp,tk]],columns=['Name', 'ID', 'Price', 'Qty','SL','TP','TK'])
                    open_df = pd.read_csv(open_db_path)
                    open_df.append(open_positions,sort=False).to_csv(open_db_path, index=False)
                        
                    
                
                stocks = stocks[stocks['Name'] != s]
                    
        
    return stocks



############################################################################################
#Check trade to close the position
############################################################################################
def check_trade():
    t = dt.datetime.now()

    if (t.hour*100+t.minute > close_end_hour*100+close_end_minute) or (dt.datetime.now().isoweekday() == 6 or dt.datetime.now().isoweekday() == 7):
        printf('INVALID time to close trade')
        return

    while True:   
        check_status('close')
        if 'Code' in pd.read_csv(open_db_path).columns:
            printf("No trades exist Till now waiting...")
            t = dt.datetime.now()
            time.sleep(10)
            continue
        else :
            break

    stocks = pd.read_csv(open_db_path)
    stocks = stocks.drop_duplicates(['Name'])
    t = dt.datetime.now()
    while stocks.empty == False and ((t.hour*100+t.minute > close_start_hour*100+close_start_minute) and (t.hour*100+t.minute < close_end_hour*100+close_end_minute)):
        t = dt.datetime.now()
        check_status('close')
        stocks = pd.read_csv(open_db_path)
        stocks = stocks.drop_duplicates(['Name'])

        for s in stocks['Name']:
            
            check_status('close')
            u = refresh_session()
                
            live = get_live_price(s)
            data = get_data(s)                
            if close_trade_analysis(data,live):
                xid = np.array(stocks[stocks['Name'] == s]['ID'])[0]
                print(s)
                trade_close(xid)
                    
                stocks = pd.read_csv(open_db_path)
                stocks = stocks.drop_duplicates(['Name'])
                stocks = stocks[stocks['Name'] != s]
                stocks.to_csv(open_db_path,index = False)      

        t = dt.datetime.now()
    u.cancel_all_orders() 
    reset_open_trades()
    return stocks
########################################################################################
#
########################################################################################


def run_trade_init():
    print('thread1 started')
    trade_init()
def run_check_trade():
    print('thread2 started')
    check_trade()
def run_reset():
    print('thread3 started')
    reset_all()



def run_threaded(job_func):
    job_thread = threading.Thread(target=job_func)
    job_thread.start()

def run():
    print('Controller started running \n')
    schedule.every().day.at(str(trade_start_hour)+":"+str(trade_start_minute)).do(run_threaded, run_trade_init)
    schedule.every().day.at(str(close_start_hour)+":"+str(close_start_minute)).do(run_threaded, run_check_trade)
    schedule.every().day.at("23:30").do(run_threaded, run_reset)



    while True:
        schedule.run_pending()
        time.sleep(10)

try:
    run()
except:
    print('Unable to run trying again')
    run()
    print('Unable to run exitting')
`