export default
`
d = str(Path().resolve().parent).replace("\\","/")

#config.py
max_trades = 10
##########################
qty_multiplier = 20
qty_parts = 10
##########################
trade_start_hour = 9
trade_start_minute = 14
trade_end_hour = 12
trade_end_minute = 30
##########################
close_start_hour = 9
close_start_minute = 19
close_end_hour = 14
close_end_minute = 30 
##########################
status_path = './status.hdex'
#terminal_path = './Data/terminal.hdex'
log_path = './log.hdex'
selected_db_path = d+'/DATA/DB/SELECTED/SELL.csv'
open_db_path = './OpenTrade.hdex'
#########################
username = ''
password= ''
dob = ''
api_code = '3wwO3kM7d66zTaNAvlzEi4lh0YDI1SFw6TBaNCgt'
api_secret = 'i0vy7zn7ya'
########################
side = 'SELL'
########################
`