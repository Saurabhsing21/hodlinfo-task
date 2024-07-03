const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const apiUrl = 'https://api.wazirx.com/api/v2/tickers';


const databaseUrl = 'mongodb://localhost:27017/TopTenResult'; 
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});


const TopTenResult = require('./models/topTenResult');

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('fetch'));

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    const tradingPairs = Object.keys(data);

    tradingPairs.sort((a, b) => parseFloat(data[b].last) - parseFloat(data[a].last));
    const top10Pairs = tradingPairs.slice(0, 10).map(pair => data[pair]);

    // await TopTenResult.insertMany(top10Pairs);

    res.render('index', { top10Pairs });
  } catch (error) {
    res.status(500).send('Error fetching API data');
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
