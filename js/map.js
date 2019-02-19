// ============
// Esri-Leaflet 
// ============
var map = L.map('map', {zoomControl: false}).setView([45.52, -122.68], 12),
  layer = L.esri.tiledMapLayer({url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',maxZoom: 15}).addTo(map),
  // layerLabels = L.esri.basemapLayer('xxxLabels').addTo(map);
  layerLabels = null;

function setBasemap(basemap) {
  if (layer) {
	map.removeLayer(layer);
  }
  if (basemap === 'WHS') {
	layer = L.esri.tiledMapLayer({url: 'https://services.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer',maxZoom: 15});
  }
  else {
	layer = L.esri.basemapLayer(basemap);
  }
  map.addLayer(layer);
  if (layerLabels) {
	map.removeLayer(layerLabels);
  }
  if (basemap === 'ShadedRelief' || basemap === 'Oceans' || basemap === 'Gray' || basemap === 'DarkGray' || basemap === 'Imagery' || basemap === 'Terrain') {
	layerLabels = L.esri.basemapLayer(basemap + 'Labels');
	map.addLayer(layerLabels);
  }
}

L.control.zoom({
  position:'topright'
}).addTo(map);


var units = L.esri.featureLayer({
		url: 'https://services9.arcgis.com/YEQ7YfprtcM3j3JL/ArcGIS/rest/services/wahwah_tule_gdb_1/FeatureServer/0'
	});

units.addTo(map);












/* jquery */
$(document).ready(function(){
  // Basemap changed
  $("#selectStandardBasemap").on("change", function(e) {
	setBasemap($(this).val());
  });
  // Search
  var input = $(".geocoder-control-input");
  input.focus(function(){
	$("#panelSearch .panel-body").css("height", "150px");
  });
  input.blur(function(){
	 $("#panelSearch .panel-body").css("height", "auto");
  });
});