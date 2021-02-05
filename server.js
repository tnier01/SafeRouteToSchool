const express = require('express');

const app = express();


app.use("/js", express.static(__dirname + '/js'))
app.use("/css", express.static(__dirname + '/css'))
app.use("/leaflet", express.static(__dirname + "/node_modules/leaflet/dist"));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/turf', express.static(__dirname + '/node_modules/@turf/turf'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/typeahead', express.static(__dirname + '/node_modules/corejs-typeahead/dist'));

app.use('/chart.js', express.static(__dirname + '/node_modules/chart.js/dist'));

app.use("/data", express.static(__dirname + '/data'))
app.use("/private", express.static(__dirname + '/private'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Map.html')
})
app.get('/howto', (req, res) => {
    res.sendFile(__dirname + '/HowTo.html')
})
app.get('/imprint', (req, res) => {
    res.sendFile(__dirname + '/imprint.html')
})

const port = 3000;

app.listen(port,
    () => console.log(`Example app listening at http://localhost:${port}`)
)