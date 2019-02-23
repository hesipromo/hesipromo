const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const company = require('./routes/api/company');
const profile = require('./routes/api/profile');
const client = require('./routes/api/client');
const post = require('./routes/api/post');

const app = express();

app.get('/',(req,res) =>res.send('hello'));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/company/', company);
app.use('/api/client/', client);
app.use('/api/profile/', profile);
app.use('/api/post/', post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
