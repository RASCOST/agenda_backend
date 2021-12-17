const mongoose = require('mongoose')
const { Schema } = mongoose

const eventSchema = new Schema({    
  year: { type: String, required: true },
  month: { type: String, required: true },
  day: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: String, required: true }
})

const Events = mongoose.model('Events', eventSchema)

module.exports = { Events, mongoose}
