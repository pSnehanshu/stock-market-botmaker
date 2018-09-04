export default `lhs = <%-lhs%>
rhs = <%-rhs%>
if <%-(open? 'not': '')%> (np.array(lhs)[len(lhs)-<%-candle.lhs%>] <%-operator%> np.array(rhs)[len(rhs)-<%-candle.rhs%>]):
    return <%-(open? 'False': 'True')%>
`
