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

accidentMarkers = L.geoJSON(accidents, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, style(feature));
    },
    onEachFeature: popup
}).addTo(mymap);

layersControl.addOverlay(accidentMarkers, "Accident Markers");

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
