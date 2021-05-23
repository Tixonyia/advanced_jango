const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json())

app.get('/catalogData', (req, res) => {
    fs.readFile('catalog.json', 'utf8', (err, rawData) => {
        res.send(rawData);
    });
});

app.post('/addToCart', (req, res) => {
    const cartFile = 'cart.json';
    fs.readFile(cartFile, 'utf-8', (err, rawData) => {
        const data = JSON.parse(rawData);
        data.push(req.body);

        fs.writeFile(cartFile, JSON.stringify(data), (err) => {
            console.log('err');
            res.send(JSON.stringify({
                resultL: err ? 0 : 1
            }));
        });

    });
});

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});