export default
`
d = str(Path().resolve().parent).replace("\\\\","/")

#config.py
max_trades = <%- max_trades %>
##########################
qty_multiplier = <%- qty_multiplier %>
qty_parts =  <%- qty_parts %>
##########################
trade_start_hour =  <%- trade_start_hour %>
trade_start_minute = <%- trade_start_minute %>
trade_end_hour =  <%- trade_end_hour  %>
trade_end_minute = <%- trade_end__minute  %>
##########################
close_start_hour = <%- close_start_hour %>
close_start_minute = <%- close_start_minute %>
close_end_hour = <%- close_end_hour %>
close_end_minute = <%- close_end_minute %> 
##########################
status_path = './status.hdex'
log_path = './log.hdex'
selected_db_paths = <%- selected_db_paths %>
open_db_path = './OpenTrade.hdex'
#########################
username = <%- username %>
password= <%- password %>
dob = <%- dob %>
api_code = <%- api_code %>
api_secret = <%- api_secret %>
########################
side = <%- side %>
########################
`