const express = require('express')
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000
const app = express()
const connectDb = require('./config/dbConnection')
connectDb()

//BodyParser
app.use(express.json());
//Error Handler
const errorHandler = require('./middleware/errorHandler');

//Routes
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes')
app.use('/api/contacts',contactRouter)
app.use('/api/users',userRouter)
app.use(errorHandler)

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})