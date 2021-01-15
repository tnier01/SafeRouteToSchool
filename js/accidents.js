function getColor(p) {
    return p.IstRad == 1 ? '#ff1200':
        '#ff7800';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties),
        radius: 8,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
}

function popup(feature, layer) {

    let bike;
    if (feature.properties.IstRad == 1) {
        bike = true
    } else {
        bike = false
    }

    layer.bindPopup(
        "<b>Time: </b>" + feature.properties.USTUNDE + " h <br>" +
        "<b>Month: </b>" + feature.properties.UMONAT + "<br>" +
        "<b>Bicycle involved: </b>" + bike
    )
}

accidentMarkers = L.geoJSON(accidents, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style(feature));
    },
    onEachFeature: popup
}).addTo(mymap);


var legend = L.control({position: 'bottomright'});

/*
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Involved</strong>'],
        categories = ['Bicycle', 'Other'];
        colors = ['#ff1200', '#ff7800'];

    for (var i = 0; i < categories.length; i++) {

        div.innerHTML +=
            labels.push(
                '<i class="circle" style="fillcolor:' + colors[i] + '"></i> ' +
                (categories[i] ? categories[i] : '+'));

    }
    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(mymap);
*/

/*

var bikeAccidents = L.geoJSON(accidents, {
    filter: function(feature, layer) {
        return feature.properties.IstRad == "1";
    }
})//.addTo(mymap);

bikeAccidents = accidents;
bikeAccidents.features = [];


bikeAccidents.features = accidents.features.filter(item => {
    if(item.properties.IstRad == "1") {
        return item;
    }
});
*/

function updateObj(arr) {
    let averageTime = 0;
    let weekdays = [0, 0, 0, 0, 0, 0, 0];  //new Array(7);
    let category = [0, 0, 0];
    let light = [0, 0, 0];
    let type = [0, 0, 0, 0, 0, 0, 0];
    let participants = [0, 0, 0, 0, 0, 0];
    let time = new Array(24);
    L.geoJSON(arr, {
        onEachFeature: function(feature) {
            averageTime += parseInt(feature.properties.USTUNDE);
            //console.log(averageTime);
            weekdays[parseInt(feature.properties.UWOCHENTAG)-1] += 1;
            category[parseInt(feature.properties.UKATEGORIE)-1] +=1;
            light[parseInt(feature.properties.ULICHTVERH)] +=1;
            type[parseInt(feature.properties.UTYP1)-1] +=1;

            if(feature.properties.IstRad == 1) {participants[0] += 1};
            if(feature.properties.IstPKW == 1) {participants[1] += 1};
            if(feature.properties.IstFuss == 1) {participants[2] += 1};
            if(feature.properties.IstKrad == 1) {participants[3] += 1};
            if(feature.properties.IstGkfz == 1) {participants[4] += 1};
            if(feature.properties.IstSonstig == 1) {participants[5] += 1};

            let hour = parseInt(feature.properties.USTUNDE);
            if(typeof time[hour] == "undefined") {
                time[hour] = 1;
            } else {
                time[hour] += 1;
            }
        }
    });
    console.log(time);
    averageTime = averageTime / arr['features'].length;
    let stats = {"weekdays": weekdays, "averageTime": averageTime, "category": category,
        "light": light, "type": type, 'participants': participants, 'time': time};
    return stats;
}

function createChart(geojson) {

    let obj = updateObj(geojson);

    let dataWeekdays = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Accidents',
            backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)' ],
            borderColor: [ 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)' ],
            borderWidth: 1,
            data: obj.weekdays,
        }]
    };

    let dataCategory = {
        labels: ['killed', 'badly injured', 'slightly injured'],
        datasets: [{
            label: 'Accidents',
            backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)'],
            borderColor: [ 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)'],
            borderWidth: 1,
            data: obj.category,
        }]
    };

    let dataLight = {
        labels: ['daylight', 'twilight', 'darkness'],
        datasets: [{
            label: 'Accidents',
            backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)'],
            borderColor: [ 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)'],
            borderWidth: 1,
            data: obj.light,
        }]
    };

    let dataType = {
        labels: ['driving', 'turning', 'crossing', 'trespassing', 'parking', 'in parallel traffic', 'other'],
        datasets: [{
            label: 'Accidents',
            backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)' ],
            borderColor: [ 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)' ],
            borderWidth: 1,
            data: obj.type,
        }]
    };

    let dataParticipants = {
        labels: ['bike', 'car', 'pedestrian', 'motorcycle', 'truck', 'other'],
        datasets: [{
            label: 'Accidents',
            backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)' ],
            borderColor: [ 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)' ],
            borderWidth: 1,
            data: obj.participants,
        }]
    };

    let dataTime = {
        labels: Array.from(Array(24).keys()),
        datasets: [{
            label: 'Accidents',
            //backgroundColor: [ 'rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)' ],
            //borderColor: [ 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)' ],
            borderWidth: 1,
            data: obj.time,
        }]
    };

    console.log(dataTime);


    let ctw = document.getElementById('weekdays').getContext('2d');

    let chartW = new Chart(ctw, {
        type: 'bar',
        data: dataWeekdays,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }}]
            },
            title: {
                display: true,
                text: 'Accidents per weekday',
                fontSize: 20
            }
        }
    });

    let ctc = document.getElementById('category').getContext('2d');

    let chartC = new Chart(ctc, {
        type: 'bar',
        data: dataCategory,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }}]
            },
            title: {
                display: true,
                text: 'Heaviest result of accident',
                fontSize: 20
            }
        }
    });

    let ctl = document.getElementById('light').getContext('2d');

    let chartL = new Chart(ctl, {
        type: 'bar',
        data: dataLight,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }}]
            },
            title: {
                display: true,
                text: 'Light conditions',
                fontSize: 20
            }
        }
    });

    let ctt = document.getElementById('type').getContext('2d');

    let chartT = new Chart(ctt, {
        type: 'bar',
        data: dataType,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }}]
            },
            title: {
                display: true,
                text: 'Accident type',
                fontSize: 20
            }
        }
    });

    let ctp = document.getElementById('participants').getContext('2d');

    let chartP = new Chart(ctp, {
        type: 'bar',
        data: dataParticipants,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }}]
            },
            title: {
                display: true,
                text: 'Participants',
                fontSize: 20
            }
        }
    });

    let cth = document.getElementById('time').getContext('2d');

    let chartH = new Chart(cth, {
        type: 'bar',
        data: dataTime,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }}]
            },
            title: {
                display: true,
                text: 'Hour of accident',
                fontSize: 20
            }
        }
    });
}

//createChart(accidents);







