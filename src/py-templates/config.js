export default 
`from pathlib import Path
d = str(Path().resolve().parent).replace("\\","/")

#config.py
max_trades = 5
##########################
qty_multiplier = 20
qty_parts = 10
##########################
trade_start_hour = 9
trade_start_minute = 15 
trade_end_hour = 10
trade_end_minute = 0
##########################
close_start_hour = 10
close_start_minute = 0
close_end_hour = 2
close_end_minute = 30 
##########################
status_path = './Data/status.hdex'
terminal_path = './Data/terminal.hdex'
log_path = './Data/log.hdex'
selected_db_path = d+'/DATA/DB/SELECTED/BUY.csv'
open_db_path = './Data/OpenTrade.hdex'
upstox_code = './Data/upstox_code.hdex'
upstox_session = d+'/file.pkl'
#########################
api_code = '3wwO3kM7d66zTaNAvlzEi4lh0YDI1SFw6TBaNCgt'
api_secret = 'i0vy7zn7ya'
`