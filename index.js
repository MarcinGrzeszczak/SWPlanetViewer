const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers”, “Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
})

app.use(express.static(path.join(__dirname,'/dist/','SWPlanetViewer')))
app.use((req, res) => {
    res.sendFile(path.join(__dirname,'dist','SWPlanetViewer','index.html'))
})

app.listen(PORT)