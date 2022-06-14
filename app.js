const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv/config')

app.use(bodyParser.json())

//Import Routes

const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)

//routes

app.get('/', (req, res) => {
  res.send('We are on home')
})

//DB connection

mongoose.connect(process.env.DB_CONNECTION, () => {
  try {
    console.log('DB connected')
  } catch (err) {
    console.log(err)
  }
})

app.listen(3000)
