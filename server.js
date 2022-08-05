const { calculateTax } = require('./services/Tax');
const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const app = express();
const port = process.argv[2] ? process.argv[2] : 8080;

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
    const taxObject = calculateTax(req.body.income, req.body.taxYear, req.body.age, req.body.monthOrYear);
    res.json({ message: taxObject }); 
});


app.get('/tax-years', (req, res) => {
    const { taxYears } = require('./config/taxConfig.js');
    res.json({taxYears: taxYears, message: 'taxYears'});
});

app.listen(port, () => console.log(`Tax Calculator is running on http://localhost:${port}`));