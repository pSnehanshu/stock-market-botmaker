var fn = `<%- fn %>(<% 
    if (ohlcKeys) {
        var i=0;
        for (k in ohlcKeys) {
            %><%- ( i>0? ',':'' ) %><%- timeframe %>['<%- ohlcKeys[k] %>']<% 
            i++;
        }
    }
    else {
        %><%- timeframe %>,<%
    }

    j = 0;
    for (inp in inputs) {
        %><%- j==0? ( i>0? ',':'' ): ',' %> <%- inp %>=<%- inputs[inp] %><%
        j++;
    } %>)`

export default
`<% if (!nonp) { %> np.array(${fn})[-<%- candle %>] <% } 
    else { %>${fn}<% } %>`
