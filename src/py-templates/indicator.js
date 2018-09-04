export default `talib.<%= fn %>(<%var i=0;for (inp in inputs) {%><%=(i>0?',':'')%> <%=inp%>=<%=inputs[inp]%><%i++;}%>)`
