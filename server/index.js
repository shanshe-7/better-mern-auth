// imports
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router/router');
const mongoose = require('mongoose');
const { dbURL } = require('./config');
const cors = require('cors');

// Instance of express
const app = express();

// Connection to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
router(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Server setup
const port = process.env.PORT || 3090;
app.listen(port);
