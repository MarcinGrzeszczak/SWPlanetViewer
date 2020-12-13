const express = require('express')
const path = require('path')

const app = express()

const appname = 'SWPlanetViewer'
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'/dist/',appname)))
app.use((req, res) => {
    res.sendFile(path.join(__dirname,'dist',appanme,'index.html'))
})

app.listen(PORT)