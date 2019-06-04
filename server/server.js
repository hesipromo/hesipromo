const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const company = require("./routes/api/company");
const profile = require("./routes/api/companyProfile");
const clients = require("./routes/api/clients");
const admin = require("./routes/api/admin");
const product = require("./routes/api/products");

const app = express();
require('dotenv').config();

//Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


//=================================
//         SERVE UP STATIC ASSEST
//=================================
if(process.env.MODE_ENV === 'production'){
  app.use(express.static("client/build"));
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./middleware/passport")(passport);

// Use Routes
app.use("/api/company/", company);
app.use("/api/clients/", clients);
app.use("/api/admin/", admin);
app.use("/api/company/profile/", profile);
app.use("/api/product/", product);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));