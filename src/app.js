const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Web3 = require('web3');
const web3 = new Web3(Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/1fd2fa9bd0e648158a0af7bd341595dd'));
const path = require('path');

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html', {
        page: 'index'
    })
});


app.use('/scripts', express.static(path.join(__dirname, 'node_modules/')));
app.use('/js', express.static(path.join(__dirname, 'js/')));
app.use('/css', express.static(path.join(__dirname, 'css/')));

app.listen(3913, () => console.log('App listen on port 3913')); 