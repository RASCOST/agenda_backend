require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { mongoose, Events } = require('./db/Schema');

const app = express()

mongoose.connect(process.env.DB, {      
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true })
  .catch(err => console.log(err))

app.disable('x-powered-by')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// save new event
app.post('/newEvent', function(req, res){
  try {
    const event = new Events(req.body)
    event.save()
    res.status(201).send('Event saved!')
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
})

// get the events of the month/year
app.get('/events/:year/:month', (req, res) => {
 Events.find({ year: req.params.year, month: req.params.month }).exec((error, results) => {
      if (error) {
        console.log(error)
        res.status(400).send(err)
      }

      res.status(200).send(results)
    })
})

// update an existing event
app.put('/updateEvent', (req, res) => {
  const {id, ...data} = req.body
  
  Events.findByIdAndUpdate(id, data, (err, docs) => {
    if(err) {
      console.log(err)
      res.status(400).send(err)
    }
    res.status(200).send(docs)
  })
})

// delete an existing event
app.delete('/deleteEvent/:id', (req, res) => {
  const id = req.params.id

  Events.findByIdAndDelete(id, (err,docs) => {
    if(err) {
      console.log(err)
      res.status(400).send(err)
    }

    res.status(200).send(docs)
  })
})

app.listen(process.env.APP_PORT, () => console.log(`Server is running on PORT: ${process.env.APP_PORT}`))

