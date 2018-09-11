const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const events = require('./routes/api/events');

const app = express();

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/events', events);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`Server running on port ${port}`));