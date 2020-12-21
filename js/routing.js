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

var routeLayer = new L.LayerGroup();
routeLayer.addTo(mymap);
var markerLayer = new L.LayerGroup();
markerLayer.addTo(mymap);
var areaLayer = new L.LayerGroup();
areaLayer.addTo(mymap);




function createButton(label, container, id) {
	var btn = L.DomUtil.create('button', '', container);
	btn.setAttribute('type', 'button');
	btn.setAttribute('class', 'button')
	btn.setAttribute('id', id)
	btn.innerHTML = label;
	return btn;
}

function addToMap(geojson, LayerGroup, color) {
	//LayerGroup.clearLayers();
	let geometry = L.geoJson(geojson, {
		"color": color
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

// submit the data to the openrouteservice api and precess results
$("#submit").click(function (e) {
		let start = $("#start").val();
        let finish = $("#finish").val();
        let profile = $("input[name='transport']:checked").val();
        console.log(class3)
        addToMap(class5, areaLayer, "#800000")
        addToMap(class4, areaLayer, "#b30000")
        addToMap(class3, areaLayer, "#ff1a1a")
        addToMap(class2, areaLayer, "#ff8080")

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
			try {
				data = {
					"coordinates": [
						start, finish
					],
					"options": {
                        "avoid_polygons":  avoid
                    }
				}
				console.log(data);
			} catch {
				data = {
					"coordinates": [
						start, finish
					]
				}
				console.log(data);
			}

			$.ajax({
				type: "POST",
				url: "https://api.openrouteservice.org/v2/directions/" + profile + "/geojson",
				data: JSON.stringify(data),
				contentType: "application/json; charset=utf-8",
				headers: {
					"Authorization": token.routing 
				},
				success: function (response) {
					console.log(response);
					addRouteFeatures(response);
				},
				error: function (err) {
					console.log(err);
					// addRouteFeatures(response.responseText);
					$("#info").show();
					$("#info").text(err.responseText);
					$("#info").delay("10000").fadeOut();
				}
			});
		} else {
			alert("please enter valid start and destination");
		}
	});

// add route to map with instructions
function addRouteFeatures(geojson) {
	addToMap(geojson.features[0], routeLayer, "#00c800");

	markerLayer.clearLayers();
	var addNavInfo = function (geojson) {
		let segments = geojson.properties.segments
		var list = "";
		var swapCoord = function (coord) {
			return [coord[1], coord[0]];
		};
		segments[0].steps.forEach(element => {
			let listObj = "<li class='listObj'>" + element.instruction + ": → " + element.distance + "m</li>";
			list += listObj;

			let marker = L.marker(swapCoord(geojson.geometry.coordinates[element.way_points[0]]), {
				"riseOnHover": true
			});
			let popupText = "<table><tr><td>Instruction:</td><td>" + element.instruction + "</td></tr><tr><td>Distance to next point:<td>" + element.distance + "m</td></tr></table>";
			marker.bindPopup(popupText);
			markerLayer.addLayer(marker);
		});
		$("#navList").html(list);
		$("#navigationInfo").show();
	};
	addNavInfo(geojson.features[0]);

	let bbox = [
		[geojson.bbox[1], geojson.bbox[0]],
		[geojson.bbox[3], geojson.bbox[2]]
	];
	mymap.flyToBounds(bbox);

}