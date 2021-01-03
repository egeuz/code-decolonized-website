const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  markdown: String,
  dateCreated: String,
  dateUpdated: String
})

module.exports = mongoose.model('Post', postSchema)