const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.static(path.join(__dirname,'/dist/','SWPlanetViewer')))
app.use((req, res) => {
    res.sendFile(path.join(__dirname,'dist','SWPlanetViewer','index.html'))
})

app.listen(PORT)