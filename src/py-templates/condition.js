export default `if <%=(open? 'not': '')%> (<%=lhs%> <%-operator%> <%=rhs%>):
    return <%=(open? 'False': 'True')%>
`
