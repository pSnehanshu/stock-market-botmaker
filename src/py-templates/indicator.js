export default `<%- fn %>(<% 
    var i=0;
    for (k in ohlcKeys) {
        %><%- ( i>0? ',':'' ) %><%- timeframe %>['<%- ohlcKeys[k] %>']<% 
        i++;
    }
    
    j = 0;
    for (inp in inputs) {
        %><%- j==0? ( i>0? ',':'' ): ',' %> <%- inp %>=<%- inputs[inp] %><%
        j++;
    } %>)`
