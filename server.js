const { calculateTax } = require('./services/Tax');
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const ejs = require('ejs');
const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup the view engine
app.engine('html', ejs.renderFile);
app.set('view-engine', 'html');

app.use(express.static('css'));
app.use(express.static('js'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.post('/calculate-tax', (req, res) => {
    fs.readFile(`assets/taxRates${req.body.taxYear}.json`, (error, data) => {
        if (error) console.error(`Error while fetching file taxRates${req.body.taxYear}.json: ${error}`);
        let taxMessage = calculateTax(data, req.body.income, req.body.taxYear, req.body.age, req.body.monthOrYear);
        res.json({ message: taxMessage }); 
    });
});

app.listen(port, () => console.log(`App is on http://localhost:${port}`));