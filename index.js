const express = require('express')
const { route } = require('./routes/checkout')

const app = express()


const port=3000

//Middleware



//routes

const checkout = require('./routes/checkout')

app.use('/checkout',checkout)


app.get('/',(req,res) => {
res.send('hi')
})


app.listen(port,() => {
    console.log('Example app listening at http://localhost:${port}')
})
