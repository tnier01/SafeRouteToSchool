const express = require('express');

const app = express();


app.use("/js", express.static(__dirname + '/js'))
app.use("/leaflet", express.static(__dirname + "/node_modules/leaflet/dist"));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/chart.js', express.static(__dirname + '/node_modules/chart.js/dist'));

app.use("/data", express.static(__dirname + '/data'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Map.html')
})

const port = 3000;

app.listen(port,
    () => console.log(`Example app listening at http://localhost:${port}`)
)