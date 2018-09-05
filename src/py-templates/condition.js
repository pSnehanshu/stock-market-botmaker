export default `lhs = <%-lhs%>
rhs = <%-rhs%>
if <%-(open? 'not': '')%> (<% 
    if (nonp) { 
        %>lsh<% 
    } else {
        %>np.array(lhs)[len(lhs) - <%- candle.lhs %>]<%
    } 
    %> <%- operator %> <% 
    if (nonp) { 
        %>rsh<% 
    } else {
        %>np.array(rhs)[len(rhs) - <%- candle.rhs %>]<%
    } 
    %>):
    return <%-(open? 'False': 'True')%>
`
