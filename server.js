// server using express and mongodb
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// define a schema for the data
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  name: String,
  age: Number
});

// create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

// define a route to handle GET requests
app.get('/data', async (req, res) => {
  try {
    // fetch data from the database
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});

// start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});