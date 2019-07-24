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
const app = express();


app.use(express.static(`${__dirname}/../public`));
app.use('/:id', express.static(`${__dirname}/../public`));
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/reviews/:id', (req, res) => {
  review.find({ id: req.params.id }).exec()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    });
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

app.post('/', (req, res) => {
  const header = {
    url: 'https://sandbox.usaepay.com/api/v2/transactions',
    method: 'POST',
    json: true,
    headers: {
      "Authorization": 'Basic ' + authKey
    },
    body: req.body
  }

  request(header, (err, response, body) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
    }
    else {
      res.status(200).json({
        result: body.result,
        error: body.error
      });
    }
  });
});

// axios.post(
//   'https://sandbox.usaepay.com/api/v2/transactions',
//   {
//     'command': 'sale',
//     'amount': 1,
//     'creditcard': {
//       'number': 4444555566667779,
//       'expiration': 1022
//     }
//   },
//   {
//     'headers': {
//       "Authorization": 'Basic ' + authKey
//     },
//   }
// ).then(({ data }) => {
//   console.log('Data: ', data);
//   return data.result
// }).catch((error) => {
//   console.log('Error: ', error);
// });

app.listen(port, () => console.log(`listening on port ${port}`));