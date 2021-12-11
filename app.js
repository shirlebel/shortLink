require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router/router');
const shortLink = require('./shortLink/shortLink');

const port = process.env.PORT;
const host = process.env.HOSTNAME;
const basePath = `http://${host}:${port}`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`listening at ${basePath}`);
});


shortLink(app, basePath);
router(app);