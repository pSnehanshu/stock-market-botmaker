const Express = require('express')
const helmet = require('helmet')
const path = require('path')

const app = Express()
const port = process.env.PORT || 9000

// Routes
app.use(helmet())

app.use(Express.static(path.join(__dirname, 'dist')))

app.all('*', function (req, res){
    res.sendStatus(404)
})

// Server listening
app.listen(port, () => console.log(`App listening on port ${port}.`))
