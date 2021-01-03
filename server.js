/*** ENVIRONMENT VARIABLES ***/
require("dotenv").config()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT

/*** SETUP EXPRESS APP & MIDDLEWARE ***/
const express = require("express")
const bodyParser = require('body-parser')
const path = require("path")
const app = express()
app.use(bodyParser.json())

/*** SETUP & CONNECT DATABASE ***/
const mongoose = require("mongoose")
const Post = require("./database/models/post")
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

/*** SERVE REACT CLIENT ***/
app.use(express.static(path.join(__dirname, 'client/build')))

app.post('/api/submit-new-post', async (req, res) => {
  //query: saveNewPost
  const newPost = new Post({
    markdown: req.body.markdown,
    dateCreated: req.body.dateCreated,
    dateUpdated: req.body.dateUpdated,
  })

  newPost.save()

  const successMessage = "done!"
  res.send(successMessage)
  console.log(successMessage)
})

app.get('/api/fetch-all-posts', async (req, res) => {
  //query: fetchAllPosts
  const posts = await Post.find({})
  res.send(posts)
})

/*** START SERVER ***/
app.listen(PORT, () => console.log(`cooking things up @ http://localhost:${PORT}`))