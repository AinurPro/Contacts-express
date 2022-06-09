const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')

const mongoConfig = require('./config/mongoConfig')
const contactsRouter = require('./routes/contactsRouter')
const usernameRouter = require('./routes/usernameRouter')

const app = express()
const PORT = 9000

app.use(express.json()) // alows us to read the data in json
app.use(morgan('dev'))
app.use(helmet())
// * Routers
app.use('/contacts', contactsRouter)
app.use('/usernames', usernameRouter)

// root route for the APP
app.get('/', (req, res)=>{
    res.status(200).json('Welcome to contacts')
})

app.listen(PORT, ()=> {
    console.log(`Server is on ${PORT}`);
    mongoConfig() // call the function to make our connection to MongoDB 
})
