export default `talib.<%- fn %>( <% var i=0; for (k in ohlcKeys){%><%=( i>0? ',':'' )%><%-timeframe%>['<%- ohlcKeys[k] %>']<% i++; }%><% for (inp in inputs) {%>, <%-inp%>=<%-inputs[inp]%><%}%>)`
