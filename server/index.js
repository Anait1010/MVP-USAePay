/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { review } = require('../db/models.js');
const { authKey } = require('./authConfig');
const request = require('request');
const axios = require('axios');

const port = process.env.PORT || 3003;
console.log(port);
const app = express();
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(`${__dirname}/../public`));
app.use('/:id', express.static(`${__dirname}/../public`));
app.use(morgan('dev'));
app.use(cors());

app.get('/reviews/:id', (req, res) => {
  review.find({ id: req.params.id }).exec()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});


const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + authKey
};

axios.post(
  'https://sandbox.usaepay.com/api/v2/transactions',
  {
    'command': 'sale',
    'amount': 1,
    'creditcard': {
      'number': 4444555566667779,
      'expiration': 1022
    }
  },
  {
    'headers': headers
  }
).then(({ data }) => {
  console.log('Data: ', data);
  return data.result
}).catch((error) => {
  console.log('Error: ', error);
});

