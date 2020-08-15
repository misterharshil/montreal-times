const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3002

const db = require('./database/database')

// body parser (will allow to post the data in body for api's)
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors())

//------------------------ADMIN---------------------------

app.get('/', function (req, res) {
    res.send('hello welcome')
  })
// api to get all the questions
app.get('/api/admin/questions',db.getAllUsers);

// api to delete questions
// app.delete('/api/admin/questions/:id',db.deleteQuestion);








app.listen(PORT, () => console.log(`Hosted on server : ${PORT}`))