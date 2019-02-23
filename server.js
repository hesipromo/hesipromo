const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const company = require('./routes/api/company');
const profile = require('./routes/api/profile');
const clients = require('./routes/api/clients');
const post = require('./routes/api/post');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  //Passport Middleware
  app.use(passport.initialize());

  //Passport Config
  require('./config/passport')(passport);

// Use Routes
app.use('/api/company/', company);
app.use('/api/clients/', clients);
app.use('/api/profile/', profile);
app.use('/api/post/', post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
