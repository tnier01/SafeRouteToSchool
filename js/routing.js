
var noneBuffered;
var class5Buffered;
var class4Buffered;
var class3Buffered;
var nonePointsInsidePolygon;
var class5PointsInsidePolygon;
var class4PointsInsidePolygon;
var class3PointsInsidePolygon;
var routeLayerSelectionActive = false;

mymap.on('click', function (e) {
	var container = L.DomUtil.create('div'),
		startBtn = createButton('Start', container),
		destBtn = createButton('Destination', container);

	L.popup()
		.setContent(container)
		.setLatLng(e.latlng)
		.openOn(mymap);

	L.DomEvent.on(startBtn, 'click', function () {
		setAddress(e, "#start");
		mymap.closePopup();
	});

	L.DomEvent.on(destBtn, 'click', function () {
		setAddress(e, "#finish");
		mymap.closePopup();
	});
});

mymap.setMinZoom(12);

/*
There is a layer for the risk area, and for each of the avoiding risk area routes. 
In each of these routes, the polyline and the corresponding buffers (are commented out, as they are only used for calculation and should not be displayed) and markers are stored. 
Only the areaLayer, noneLayer are activated automatically, the other ones can be activated by the layercontrol. 
*/
var areaLayer = new L.LayerGroup();
areaLayer.addTo(mymap);
var noneLayer = new L.LayerGroup();
noneLayer.addTo(mymap);
var class5Layer = new L.LayerGroup();
//class5Layer.addTo(mymap); commented out as it is later added to map
var class4Layer = new L.LayerGroup();
//class4Layer.addTo(mymap); commented out as it is later added to map
var class3Layer = new L.LayerGroup();
//class3Layer.addTo(mymap); commented out as it is later added to map

var baseLayers = {
	"OpenStreetMap": osmlayer,
	"Esri world imagery": Esri_WorldImagery
};

var layersControl = L.control.layers(baseLayers, null, { collapsed: false }).addTo(mymap);
layersControl.addOverlay(areaLayer, "Risk areas");

var legend_risk = L.control({position: 'bottomright'});

legend_risk.onAdd = function (map) {

	var div = L.DomUtil.create("div", "legend");
	div.innerHTML += "<h4>Risk levels</h4>";
	div.innerHTML += '<i style="background: #690000"></i><span>High risk</span><br>';
	div.innerHTML += '<i style="background: #e22b00""></i><span>Medium risk</span><br>';
	div.innerHTML += '<i style="background: #ffbc48"></i><span>Low risk</span><br>';
	//div.innerHTML += '<i style="background: #ff8080"></i><span>Level 2</span><br>';
	//div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';

	return div;
};

legend_risk.addTo(mymap);

var legend_routes = L.control({position: 'bottomright'});

legend_routes.onAdd = function (map) {

	var div = L.DomUtil.create("div", "legend l_routes");
	div.innerHTML += "<h4>Routes </h4>";
	div.innerHTML += "<span>(avoided risk level)</span><br>";

	var color;

	if(mymap.hasLayer(noneLayer)) {
		div.innerHTML += '<i style="background: #71007c"></i><span>None</span><br>';
	}
	if(mymap.hasLayer(class5Layer)) {
		div.innerHTML += '<i style="background: #1d37c1""></i><span>High risk</span><br>';
	}
	if(mymap.hasLayer(class4Layer)) {
		div.innerHTML += '<i style="background: #2896d7"></i><span>Medium risk</span><br>';
	}
	if(mymap.hasLayer(class3Layer)) {
		div.innerHTML += '<i style="background: #52efba"></i><span>Low risk</span><br>';
	}
	//div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';

	return div;
};

function get2D( num ) {
    return ( num.toString().length < 2 ? "0"+num : num ).toString();
}

function convertTime(time){
	hours = Math.floor(time / 3600)
	minutes = Math.floor((time - hours*3600) / 60)
	seconds = Math.round(time - hours*3600 - minutes*60)
	return get2D(hours)+":"+get2D(minutes)+":"+get2D(seconds)
}


function convertlenght(length){
	length= length/10;
	length= Math.round(length);
	length= length/100
	return length;
}

function addInformation (information) {

	console.log(information)

	var div = document.getElementById("info");
	div.innerHTML = "<span>Risk Level, Duration, Length</span> <br/>";

	var color;

		if(information[0]!= "null"){
		var time = information[0].features[0].properties.summary.duration
		var length = information[0].features[0].properties.summary.duration
		time= convertTime(time)
		length =convertlenght(length)
		var url = createLink(information[0])

		div.innerHTML += '<i class="color" style="background: #71007c"></i><span>Shortest route</span> <i class="fas fa-clock"></i>' +time +'<i class="fas fa-road">'+length + ' km </i><a target="_blank" href='+url +'>Google Maps</a><br>';
		}
		if(information[1]!= "null"){
			var time = information[1].features[0].properties.summary.duration
			var length = information[1].features[0].properties.summary.duration
			time= convertTime(time)
			length =convertlenght(length)
			var url = createLink(information[1])
		div.innerHTML += '<i class="color" style="background: #1d37c1""></i><span>High risk &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <i class="fas fa-clock"></i>' +time +'<i class="fas fa-road">'+length + ' km </i><a target="_blank" href='+url +'>Google Maps</a><br>';
		}
		if(information[2]!= "null"){
			var time = information[2].features[0].properties.summary.duration
			var length = information[2].features[0].properties.summary.duration
			time= convertTime(time)
			length =convertlenght(length)
			var url = createLink(information[2])
		div.innerHTML += '<i class="color"style="background: #2896d7"></i><span>Medium risk&nbsp;&nbsp;&nbsp;</span> <i class="fas fa-clock"></i>' +time +'<i class="fas fa-road">'+length + ' km </i><a target="_blank" href='+url +'>Google Maps</a><br>';
		}
		if(information[3]!= "null"){
			var time = information[3].features[0].properties.summary.duration
			var length = information[3].features[0].properties.summary.duration
			time= convertTime(time)
			length =convertlenght(length)
			var url = createLink(information[3])
		div.innerHTML += '<i class="color" style="background: #52efba"></i><span>Low risk&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <i class="fas fa-clock"></i>' +time +'<i class="fas fa-road">'+length + ' km </i><a target="_blank" href='+url +'>Google Maps</a><br>';
		}
	//div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';

};


mymap.on('overlayremove', function (eventLayer) {
	if (eventLayer.name === 'Risk Areas') {
		this.removeControl(legend_risk);
	}
	if (eventLayer.name === 'Shortest route' || eventLayer.name === 'High risk avoiding route' || eventLayer.name === 'Medium risk avoiding route' || eventLayer.name === 'Low risk avoiding route') {
		this.removeControl(legend_routes);
		this.addControl(legend_routes);
		if (!mymap.hasLayer(class3Layer) && !mymap.hasLayer(class4Layer) && !mymap.hasLayer(class5Layer) && !mymap.hasLayer(noneLayer)) {
			this.removeControl(legend_routes);
		}
	}
});

mymap.on('overlayadd', function (eventLayer) {
	if (eventLayer.name === 'Risk Areas') {
		this.addControl(legend_risk);
		accidentMarkers.bringToFront();
	}
	if (eventLayer.name === 'Shortest route' || eventLayer.name === 'High risk avoiding route' || eventLayer.name === 'Medium risk avoiding route' || eventLayer.name === 'Low risk avoiding route') {
		this.removeControl(legend_routes);
		this.addControl(legend_routes);
	}
});

function createButton(label, container, id) {
	var btn = L.DomUtil.create('button', '', container);
	btn.setAttribute('type', 'button');
	btn.setAttribute('class', 'btn btn-primary');
	btn.setAttribute('id', id);
	btn.innerHTML = label;
	return btn;
}

function addToMap(geojson, LayerGroup, color) {
	//LayerGroup.clearLayers();
    let stroke = true;
    if(LayerGroup == areaLayer) {
        stroke = false;
    }
	let geometry = L.geoJson(geojson, {
		"color": color,
		fillOpacity: 0.6,
		stroke: stroke,
        weight: 5
		//dashArray: '8 12',
	});
	LayerGroup.addLayer(geometry);
}

// convert coordinate to geocode address
function setAddress(pos, selector) {
	let input = pos.latlng;
	$.ajax({
		type: "GET",
		url: "https://api.openrouteservice.org/geocode/reverse?api_key=" + token.routing + "&point.lon=" + input.lng + "&point.lat=" + input.lat,
		success: function (response) {
			response.features.forEach(element => {
				console.log(element.properties.label);
			});

			let address = response.features[0].properties.street;
			if (address == null) {
				$(selector).val(`${input.lat}, ${input.lng}`);

			} else {
				$(selector).val(response.features[0].properties.label);
			}
		},
		error: function (err) {
			console.log(err);
			return `${input.lat}, ${input.lng}`;
		}
	});
}


/*addToMap(class5, areaLayer, "#690000")
addToMap(class4, areaLayer, "#b30000")
addToMap(class3, areaLayer, "#ff5f64")*/

addToMap(class5, areaLayer, "#690000")
addToMap(class4, areaLayer, "#e22b00")
addToMap(class3, areaLayer, "#ffbc48")



// addToMap(class2, areaLayer, "#ff8080")
//addToMap(class1, areaLayer, "#ff8080")

/**
 * function to request the risk avoiding routes from OpenRouteService.
 * @param {*} profile
 * @param {*} data
 * @param {*} risk
 */
function requestDatafromOpenRouteService(profile, data, risk) {
	var route;

	// if there is a certain risk which should be avoided, the avoid poylgons option is added to the request data
	if (risk !== "none") {
		data.options = {
			"avoid_polygons": eval(risk) // convert string to variable
		};
	}

	$.ajax({
		type: "POST",
		url: "https://api.openrouteservice.org/v2/directions/" + profile + "/geojson",
		async: false,
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		headers: {
			"Authorization": token.routing
		},
		success: function (response) {
			route = response;
		},
		error: function (err) {
			route = err;
		}
	});
	return route;
}

/**
 * function which is excecuted when the submit button is hit.
 * - start and destination are geocoded by the openrouteservie
 * - for each of the risk classes the corresponding route is recieved from openrouteservice
 * - each of the routes is added to the layer control
 * - by calling the function addRouteToMap, all routes and corresponding buffers and markers are added to the map
 */
$("#submit").click(function (e) {

	let start = $("#start").val();
	let finish = $("#finish").val();
	let profile = $("input[name='transport']:checked").val();
	show("overlay")
	document.getElementById("overlay").offsetHeight;

	// delete all highlighting, so that there is no intital highlighting if the transportation type is changed
	removeHighlight(accidents);

	// needed to initialize each of the layer
	noneBuffered = undefined;
	class5Buffered = undefined;
	class4Buffered = undefined;
	class3Buffered = undefined;
	routeLayerSelectionActive = false;

	if (start != "" && finish != "") {
		var toCoordinates = function (coordString) {
			let sep = coordString.split(",");
			let lat = parseFloat(sep[0]);
			let lng = parseFloat(sep[1]);

			return [lng, lat];
		}

		if (isNaN(start.split(",")[0])) {
			$.ajax({
				type: "GET",
				url: "https://api.openrouteservice.org/geocode/search?api_key=" + token.routing + "&text=" + start,
				async: false,
				success: function (response) {
					start = response.features[0].geometry.coordinates;
				}
			});
		} else {
			start = toCoordinates(start);
		}
		if (isNaN(finish.split(",")[0])) {
			$.ajax({
				type: "GET",
				url: "https://api.openrouteservice.org/geocode/search?api_key=" + token.routing + "&text=" + finish,
				async: false,
				success: function (response) {
					finish = response.features[0].geometry.coordinates;
				}
			});
		} else {
			finish = toCoordinates(finish);
		}

		data = {
			"coordinates": [
				start, finish
			]
		}

		var routes = [];
		
		routes.push(requestDatafromOpenRouteService(profile, data, "none"));
		routes.push(requestDatafromOpenRouteService(profile, data, "class5"));
		routes.push(requestDatafromOpenRouteService(profile, data, "class4"));
		routes.push(requestDatafromOpenRouteService(profile, data, "class3"));
		var routes2 = routes.slice();

		

		// if there is not already a layer selection for the routes, it is added
		var availableLayersInLayerControl = layersControl.getOverlaysNames();

		if (availableLayersInLayerControl.find(element => element === "Shortest route") === undefined) {
			layersControl.addOverlay(noneLayer, "Shortest route");
		}
		if (availableLayersInLayerControl.find(element => element === "High risk avoiding route") === undefined) {
			layersControl.addOverlay(class5Layer, "High risk avoiding route");
		}
		if (availableLayersInLayerControl.find(element => element === "Medium risk avoiding route") === undefined) {
			layersControl.addOverlay(class4Layer, "Medium risk avoiding route");
		}
		if (availableLayersInLayerControl.find(element => element === "Low risk avoiding route") === undefined) {
			layersControl.addOverlay(class3Layer, "Low risk avoiding route");
		}

		sameRoutes=false

		// if all routes are the same, only the none route is shown
		if (routes[0].statusText === undefined && routes[1].statusText === undefined && routes[2].statusText === undefined && routes[3].statusText === undefined) {
			if ((JSON.stringify(routes[0].features[0].geometry.coordinates) == JSON.stringify(routes[3].features[0].geometry.coordinates)) && (JSON.stringify(routes[0].features[0].geometry.coordinates) === JSON.stringify(routes[1].features[0].geometry.coordinates)) && (JSON.stringify(routes[0].features[0].geometry.coordinates) === JSON.stringify(routes[2].features[0].geometry.coordinates)) && (JSON.stringify(routes[0].features[0].geometry.coordinates) === JSON.stringify(routes[3].features[0].geometry.coordinates))) {
				sameRoutes = true;
				layersControl.removeLayer(class5Layer);
				mymap.removeLayer(class5Layer);
				hide("level5")
				layersControl.removeLayer(class4Layer);
				mymap.removeLayer(class4Layer);
				hide("level4")
				layersControl.removeLayer(class3Layer);
				mymap.removeLayer(class3Layer);
				hide("level3")
			}
		}

		
		// if there is no route available, it is not added to the map and is not available in the layer control 
		if (routes[0].statusText === undefined) {
			noneBuffered = turf.buffer(routes[0], 50, { units: 'meters' });
			nonePointsInsidePolygon = proofPointsInPolygon(noneBuffered.features[0]);
			highlight(nonePointsInsidePolygon)
			addRouteToMap(routes[0], "noneLayer");
			createChart(nonePointsInsidePolygon, 0)
			show("none")
		}
		else {
			layersControl.removeLayer(noneLayer);
			hide("none")
			routes2[0]= "null"
		}
		if (routes[1].statusText === undefined && sameRoutes===false) {
			class5Buffered = turf.buffer(routes[1], 50, { units: 'meters' });
			class5PointsInsidePolygon = proofPointsInPolygon(class5Buffered.features[0]);
			addRouteToMap(routes[1], "class5Layer");
			createChart(class5PointsInsidePolygon,5)
			show("level5")
		}
		else {
			layersControl.removeLayer(class5Layer);
			hide("level5")
			routes2[1]= "null"
		}
		if (routes[2].statusText === undefined && sameRoutes===false) {

			class4Buffered = turf.buffer(routes[2], 50, { units: 'meters' });
			class4PointsInsidePolygon = proofPointsInPolygon(class4Buffered.features[0]);
			createChart(class4PointsInsidePolygon,4)
			addRouteToMap(routes[2], "class4Layer");
			show("level4")
		}
		else {
			layersControl.removeLayer(class4Layer);
			hide("level4")
			routes2[2]= "null"
		}
		if (routes[3].statusText === undefined&& sameRoutes===false ) {
			class3Buffered = turf.buffer(routes[3], 50, { units: 'meters' });
			class3PointsInsidePolygon = proofPointsInPolygon(class3Buffered.features[0]);
			createChart(class3PointsInsidePolygon,3)
			addRouteToMap(routes[3], "class3Layer");
			show("level3")
		}
		else {
			layersControl.removeLayer(class3Layer);
			hide("level3")
			routes2[3]= "null"
		}

		if(sameRoutes){
			routes2[1]= "null"
			routes2[2]= "null"
			routes2[3]= "null"
		}
		addInformation(routes2)

		// set the map focus to the route which is not avoiding any risk areas
		let bbox = [
			[routes[0].bbox[1], routes[0].bbox[0]],
			[routes[0].bbox[3], routes[0].bbox[2]]
		];
		mymap.flyToBounds(bbox);

		$('#none').tab("show");
		hide("overlay")

        legend_routes.addTo(mymap);

	} else {
		alert("please enter valid start and destination");
		hide("overlay")
	}

});

//addToMap(class5, areaLayer, "#800000")
//addToMap(class4, areaLayer, "#b30000")
//addToMap(class3, areaLayer, "#ff1a1a")
//addToMap(class2, areaLayer, "#ff8080")

/**
 * function to add the routes and the corresponding buffers and markers to the map.
 * The markers are added to the map by calling the function navigationInfo.
 * In the final version buffers and navigation are commented out, because they do not fit to the user story of the application.
 * @param {*} route
 * @param {*} layer
 */
function addRouteToMap(route, layer) {

	console.log(route.features[0]);

	if (layer === "noneLayer") {
		noneLayer.clearLayers();

		addToMap(route.features[0], noneLayer, "#71007c");

		//addToMap(noneBuffered, noneLayer, "#00c804");
		//navigationInfo(route, layer);

		var checkedLayers = layersControl.getOverlays();
		// the noneLayer is shown initially, thats why the highlighting is not activated as usually by the user (function mymap.on('overlayadd', function (eo))
		if (routeLayerSelectionActive === false && checkedLayers["none"] === true) {
			routeLayerSelectionActive = true;
			highlight(nonePointsInsidePolygon);

		}
	}

	if (layer === "class5Layer") {
		class5Layer.clearLayers();
		addToMap(route.features[0], class5Layer, "#1d37c1");

		//addToMap(class5Buffered, class5Layer, "#00c804");
		//navigationInfo(route, layer);
	}
	if (layer === "class4Layer") {
		class4Layer.clearLayers();
		addToMap(route.features[0], class4Layer, "#2896d7");

		//addToMap(class4Buffered, class4Layer, "#00c804");
		//navigationInfo(route, layer);
	}
	if (layer === "class3Layer") {
		class3Layer.clearLayers();
		addToMap(route.features[0], class3Layer, "#52efba");

		//addToMap(class3Buffered, class3Layer, "#00c804");
		//navigationInfo(route, layer);
	}
}

/**
 * function to add navigation information to the routes by corresponding markers and popups.
 * @param {*} route
 * @param {*} layer
 */
function navigationInfo(route, layer) {

	let marker;
	let segments = route.features[0].properties.segments
	var list = "";
	var swapCoord = function (coord) {
		return [coord[1], coord[0]];
	};
	segments[0].steps.forEach(element => {
		let listObj = "<li class='listObj'>" + element.instruction + ": → " + element.distance + "m</li>";
		list += listObj;

		marker = L.marker(swapCoord(route.features[0].geometry.coordinates[element.way_points[0]]), {
			"riseOnHover": true
		});
		let popupText = "<table><tr><td>Instruction:</td><td>" + element.instruction + "</td></tr><tr><td>Distance to next point:<td>" + element.distance + "m</td></tr></table>";
		marker.bindPopup(popupText);

		if (layer === "noneLayer") {
			noneLayer.addLayer(marker);
		}
		if (layer === "class5Layer") {
			class5Layer.addLayer(marker);
		}
		if (layer === "class4Layer") {
			class4Layer.addLayer(marker);
		}
		if (layer === "class3Layer") {
			class3Layer.addLayer(marker);
		}

	});
	$("#navList").html(list);
	$("#navigationInfo").show();

}

// event if one layer is activated in the layers control
mymap.on('overlayadd', function (eo) {
	HiglightingForCheckedLayersInLayerControl(eo.name, true);
});

/**
 * function to highlight the points inside the buffer of a certain route, if the layer is activated in the layers control.
 */
function HiglightingForCheckedLayersInLayerControl(layerName, show) {

	if (layerName === 'Shortest route') {
		highlight(nonePointsInsidePolygon);
		if(show){
			$('#none').tab("show");
		}
	}
	if (layerName === 'High risk avoiding route') {
		highlight(class5PointsInsidePolygon);
		if(show){
			$('#level5').tab("show");
		}

	}
	if (layerName === 'Medium risk avoiding route') {
		highlight(class4PointsInsidePolygon);
		if(show){
			$('#level4').tab("show");
		}

	}
	if (layerName === 'Low risk avoiding route') {
		highlight(class3PointsInsidePolygon);
		if(show){
			$('#level3').tab("show");
		}

	}
}

// event if one layer is deactivated in the layers control
mymap.on('overlayremove ', function (eo) {

	RemoveHighlightingForUncheckedLayersInLayerControl(eo.name);
	var checkedLayers = layersControl.getOverlays(); // check if there are points which need to be highlighted again (needed because points often on same route)
	let shown=false;
	if (checkedLayers["Shortest route"] === true) {
		HiglightingForCheckedLayersInLayerControl('Shortest route', !shown);
		shown=true

	}
	if (checkedLayers["High risk avoiding route"] === true) {

		HiglightingForCheckedLayersInLayerControl('High risk avoiding route', !shown);
		shown=true
	}
	if (checkedLayers["Medium risk avoiding route"] === true) {
		HiglightingForCheckedLayersInLayerControl('Medium risk avoiding route', !shown);
		shown=true
	}
	if (checkedLayers["Low risk avoiding route"] === true) {
		HiglightingForCheckedLayersInLayerControl('Low risk avoiding route', !shown);

	}
});

/**
 * function to remove the highlighting of the points inside the buffer of a certain route, if the layer is disabled in the layers control.
 */
function RemoveHighlightingForUncheckedLayersInLayerControl(layerName) {
	if (layerName === 'Shortest route') {
		removeHighlight(nonePointsInsidePolygon);
	}
	if (layerName === 'High risk avoiding route') {
		removeHighlight(class5PointsInsidePolygon);
	}
	if (layerName === 'Medium risk avoiding route') {
		removeHighlight(class4PointsInsidePolygon);
	}
	if (layerName === 'Low risk avoiding route') {
		removeHighlight(class3PointsInsidePolygon);
	}
}

/**
 * function to calculate if a point is inside a polygon.
 * @param {*} buffer 
 */
function proofPointsInPolygon(buffer) {
	let pointsInsidePolygon = []
	for (let point of accidents.features) {
		if (turf.booleanContains(buffer, point)) {
			pointsInsidePolygon.push(point)
		}
	}
	var geojsonObject = {
		'type': 'FeatureCollection',
		'features': pointsInsidePolygon
	};
	return geojsonObject;
}

/**
 * function highlight a point of the accidentMarkers. 
 * @param {*} pointsInsidePolygon 
 */
function highlight(pointsInsidePolygon) {
	accidentMarkers.eachLayer(function (layer) {
		for (var point of pointsInsidePolygon.features) {
			if (layer.feature.properties.OBJECTID == point.properties.OBJECTID) {
				layer.setStyle({ fillColor: 'blue' });
			}
		}
	})
}

/**
 * function to remove the highlight of a point of the accidentMarkers
 * @param {*} pointsInsidePolygon 
 */
function removeHighlight(pointsInsidePolygon) {
	accidentMarkers.eachLayer(function (layer) {
		for (var point of pointsInsidePolygon.features) {
			if (layer.feature.properties.OBJECTID == point.properties.OBJECTID) {
				layer.setStyle(style(layer.feature));
			}
		}
	})
}

/**
 * function to recieve checked layers in layer control. 
 * E.g. by control.getOverlays(); if the layer control is named "control"
 */
L.Control.Layers.include({
	getOverlays: function () {
		// create hash to hold all layers
		var control, layers;
		layers = {};
		control = this;

		// loop thru all layers in control
		control._layers.forEach(function (obj) {
			var layerName;

			// check if layer is an overlay
			if (obj.overlay) {
				// get name of overlay
				layerName = obj.name;
				// store whether it's present on the map or not
				return layers[layerName] = control._map.hasLayer(obj.layer);
			}
		});
		return layers;
	}
});

/**
 * function to recieve checkable layers in layer control. 
 * E.g. by control.getOverlaysNames(); if the layer control is named "control"
 */
L.Control.Layers.include({
	getOverlaysNames: function () {
		// create hash to hold all layers
		var control, layers;
		layers = [];
		control = this;

		// loop thru all layers in control
		control._layers.forEach(function (obj) {
			var layerName;

			// check if layer is an overlay
			if (obj.overlay) {
				// get name of overlay
				layerName = obj.name;
				// store whether it's present on the map or not
				return layers.push(layerName);
			}
		});
		return layers;
	}
});

function show(id) {
	var element = document.getElementById(id);
	element.classList.remove("hideme");
  }

function hide(id) {
	var element = document.getElementById(id);
	element.classList.add("hideme");
  }

/**
 * function to hide an html div and chane position of corresponding button
 * @param {} id
 */
function toggle_visibility(divId, buttonId) {
	visibility = document.getElementById(divId).style.visibility;
	if (visibility === "hidden") {
		document.getElementById(divId).style.visibility = 'visible';
		document.getElementById(buttonId).style.bottom = '0px';
	}
	else {
		document.getElementById(divId).style.visibility = 'hidden';
		document.getElementById(buttonId).style.bottom = '-156px';
	}
}


function createLink(route){
	let profile = $("input[name='transport']:checked").val();
	let segments = route.features[0].properties.segments
	let transport;
	if (profile == "driving-car"){
		transport = "driving"
	}
	else if (profile == "cycling-regular"){
		transport = "bicycling"
	}
	else if (profile == "foot-walking"){
		transport = "walking"
	}


	origin = route.features[0].geometry.coordinates[segments[0].steps[0].way_points[0]][1] +"," +route.features[0].geometry.coordinates[segments[0].steps[0].way_points[0]][0]
	
	max= segments[0].steps.length-1
	console.log(max)
	destination = route.features[0].geometry.coordinates[segments[0].steps[max].way_points[0]][1] +"," +route.features[0].geometry.coordinates[segments[0].steps[max].way_points[0]][0]

	var waypoints= "";
	for (var i =0; i< max; i++){
		waypoints += route.features[0].geometry.coordinates[segments[0].steps[i].way_points[0]][1] +"," +route.features[0].geometry.coordinates[segments[0].steps[i].way_points[0]][0] +"%7C"
	}

	console.log(waypoints)
	waypoints = waypoints.substring(0, waypoints.length - 3);
	console.log(waypoints)
	var test = "https://www.google.com/maps/dir/?api=1&origin=" + origin +"&destination="+ destination + "&travelmode=" + transport +"&waypoints=" + waypoints

	return(test)
}

