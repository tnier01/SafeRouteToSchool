/**
 * style function for accident markers
 * @param feature
 * @returns {{fillColor: string, color: string, fillOpacity: number, weight: number, radius: number, opacity: number}}
 */
function style(feature) {
    return {
        fillColor: '#ff5d5a', //getColor(feature.properties),
        radius: 5,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 1.0
    };
}

// assign months to numbers for popup
let months = {
    "01" : "January",
    "02" : "February",
    "03" : "March",
    "04" : "April",
    "05" : "May",
    "06" : "June",
    "07" : "July",
    "08" : "August",
    "09" : "September",
    "10" : "October",
    "11" : "November",
    "12" : "December"
};

// assign yes no to participant information for popup
let participant = {
    1 : "yes",
    0 : "no"
}

//
/**
 * create accident popup
 * @param feature
 * @param layer
 */
function popup(feature, layer) {
    layer.bindPopup(
        "<b>Bicycle involved: </b>" + participant[feature.properties.IstRad] + "<br>" +
        "<b>Pedestrian involved: </b>" + participant[feature.properties.IstFuss] + "<br>" +
        "<b>Time: </b>" + feature.properties.USTUNDE + " h <br>" +
        "<b>Month: </b>" + months[feature.properties.UMONAT]
    )
}

/**
 * add accidents to map
 */
accidentMarkers = L.geoJSON(accidents, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style(feature));
    },
    onEachFeature: popup
}).addTo(mymap);

// add accidents to layer control
layersControl.addOverlay(accidentMarkers, "Accident markers");
accidentMarkers.bringToFront();

/**
 * Arrays the chart data is added to
 * @type {Array}
 */
chartW= []
chartC= []
chartT= []
chartL= []
chartP= []
chartH= []

/**
 * Extract information for charts from geoJSON
 * @param arr (geoJSON with data from Unfallatlas)
 * @returns {{averageTime: *, light: *, weekdays: *, time: *, category: *, type: *, participants: *}}
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

    averageTime = averageTime / arr['features'].length;
    let stats = {"weekdays": weekdays, "averageTime": averageTime, "category": category,
        "light": light, "type": type, 'participants': participants, 'time': time};
    return stats;
}

/**
 * Create actual charts with chart.js
 * Assign data, labels, colors
 * @param geojson
 * @param number
 */
function createChart(geojson, number) {

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


    if(chartW[number] !== undefined){
        console.log("redraw")
        chartW[number].destroy()
        chartC[number].destroy()
        chartT[number].destroy()
        chartL[number].destroy()
        chartP[number].destroy()
        chartH[number].destroy()
    }

    let ctw = document.getElementById('weekdays' +number).getContext('2d');

    chartW[number] = new Chart(ctw, {
        type: 'bar',
        data: dataWeekdays,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 4,
                        userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
       
                        },
                    }}]
            },
            title: {
                display: true,
                text: 'Accidents per weekday',
                fontSize: 20
            }
        }
    });

    let ctc = document.getElementById('category'+number).getContext('2d');

    chartC[number] = new Chart(ctc, {
        type: 'bar',
        data: dataCategory,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 4,
                        userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
       
                        },
                    }}]
            },
            title: {
                display: true,
                text: 'Heaviest result of accident',
                fontSize: 20
            }
        }
    });

    let ctl = document.getElementById('light'+number).getContext('2d');

    chartL[number] = new Chart(ctl, {
        type: 'bar',
        data: dataLight,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 4,
                        userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
       
                        },
                    }}]
            },
            title: {
                display: true,
                text: 'Light conditions',
                fontSize: 20
            }
        }
    });

    let ctt = document.getElementById('type'+number).getContext('2d');

    chartT[number] = new Chart(ctt, {
        type: 'bar',
        data: dataType,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 4,
                        userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
       
                        },
                    }}]
            },
            title: {
                display: true,
                text: 'Accident type',
                fontSize: 20
            }
        }
    });

    let ctp = document.getElementById('participants' + number).getContext('2d');

    chartP[number] = new Chart(ctp, {
        type: 'bar',
        data: dataParticipants,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 4,
                        userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
       
                        },
                    }}]
            },
            title: {
                display: true,
                text: 'Participants',
                fontSize: 20
            }
        }
    });

    let cth = document.getElementById('time' + number).getContext('2d');

    chartH[number] = new Chart(cth, {
        type: 'bar',
        data: dataTime,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 4,
                        userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
       
                        },
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
