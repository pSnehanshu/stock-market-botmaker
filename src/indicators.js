export default [
    {
        name: '',
        code: '',
        inputs: inputs()
    },

]

function input (name, codename){
    return { name, codename }
}

function inputs(...inp){
    var inps = []
    inp.forEach(function (i){
        inps.push(input(i[0], i[1]))
    })
    return inps
}
