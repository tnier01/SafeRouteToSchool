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
    layer.bindPopup("time: " + feature.properties.USTUNDE + " h")
}

L.geoJSON(accidents, {
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
    let light = [0, 0, 0]
    L.geoJSON(arr, {
        onEachFeature: function(feature) {
            averageTime += parseInt(feature.properties.USTUNDE);
            //console.log(averageTime);
            weekdays[parseInt(feature.properties.UWOCHENTAG)-1] += 1;
            category[parseInt(feature.properties.UKATEGORIE)-1] +=1;
            light[parseInt(feature.properties.ULICHTVERH)] +=1;
        }
    });
    averageTime = averageTime / arr['features'].length;
    let stats = {"weekdays": weekdays, "averageTime": averageTime, "category": category, "light": light};
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
}

createChart(accidents);







