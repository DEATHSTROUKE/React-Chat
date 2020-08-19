const express = require('express')
const mongoose = require('mongoose')
const db = require('./config.js')

const app = express()

app.use(express.json())
app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/api/chat', (req, res) => {
    res.send('hello')
})

async function start() {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(3003, () => {
            console.log('server has been started')
        })
    } catch (e) {
        console.log(e)
    }
}

start()
