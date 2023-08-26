const express = require('express');
const bodyParser = require('body-parser');
const {StatusCodes} = require('http-status-codes');
const blogRoute = require('./routes/blog.route');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('dotenv').config();
const port = process.env.PORT || 5000;

app.use('/', blogRoute);

app.use((req, res)=>{
    res.status(StatusCodes.NOT_FOUND).send('Page non trouve');
});

app.listen(port, ()=>{
    console.log('Serveur est lance sur le port', port)
})