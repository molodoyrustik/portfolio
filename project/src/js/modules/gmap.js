const $ = require('jquery');
var map;

function init(map_id) {
	var mapOptions = {
		center: new google.maps.LatLng(54.734773, 55.957829),
		zoom: 14,
		zoomControl: false,
		disableDoubleClickZoom: false,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false,
		panControl: false,
		streetViewControl: false,
		draggable : true,
		overviewMapControl: false,
		overviewMapControlOptions: {
			opened: false,
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: [
		{
			"featureType": "administrative",
			"elementType": "labels.text.fill",
			"stylers": [
			{
				"color": "#444444"
			}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
			{
				"color": "#f2f2f2"
			}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "road",
			"elementType": "all",
			"stylers": [
			{
				"saturation": -100
			},
			{
				"lightness": 45
			}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "all",
			"stylers": [
			{
				"visibility": "simplified"
			}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.icon",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
			{
				"visibility": "off"
			}
			]
		},
		{
			"featureType": "water",
			"elementType": "all",
			"stylers": [
			{
				"color": "#61dac9"
			},
			{
				"visibility": "on"
			}
			]
		}
		],
	}
	var mapElement = document.getElementById(map_id);
	var map = new window.google.maps.Map(mapElement, mapOptions);
}


export default {
	init() {
		$(document).ready(() => {
			if($("#map").length){
				init("map");
			}
		})	
	}
}