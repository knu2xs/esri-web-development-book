require([
  // dojo modules
  'dojo/dom',
  'dojo/on',

  // esri modules
  'esri/map',
  'esri/layers/FeatureLayer'
], function(
  dom,
  on,
  Map,
  FeatureLayer
){

  // create a new map instance
  var map = new Map('map', {
    basemap: 'streets',
    center: [-118.2095, 34.0866],
    zoom: 10
  });

  // save the url of the feature service in a variable
  var url = 'http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/la_county_labor_centroid/FeatureServer/0'

  // create a new feature layer object instance
  var featureLayer = new FeatureLayer(url);

  // add the feature layer to the map
  map.addLayer(featureLayer);

  // add selection event listener
  on(dom.byId('population'), 'change', function(e){

    // save the selection in a variable
    var population = e.target.value;

    // create a definition expression using the selected value
    var definitionExpression = 'TOTAL_POP > ' + population;

    // apply the definition expression
    featureLayer.setDefinitionExpression(definitionExpression);
  });

});
