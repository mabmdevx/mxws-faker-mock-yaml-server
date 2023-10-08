const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3020;

app.use('/', express.static(path.join(__dirname, 'public')))


app.listen(port);
console.log('Faker MYS UI Server started at http://localhost:' + port);