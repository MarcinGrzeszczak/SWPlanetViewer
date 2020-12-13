const express = require('express')
const path = require('path')

const app = express()

const appname = 'SWPlanetViewer'

app.use(express.static(path.join(__dirname,'/dist/',appname)))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname,'dist',appanme,'index.html'))
})

app.listen(80)