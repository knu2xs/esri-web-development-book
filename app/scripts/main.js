require([
  // dojo modules
  'dojo/dom',
  'dojo/on',

  // esri modules
  'esri/map',
  'esri/layers/FeatureLayer',
  'esri/toolbars/draw',
  'esri/tasks/query'
], function(
  dom,
  on,
  Map,
  FeatureLayer,
  Draw,
  Query
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
  var featureLayer = new FeatureLayer(url,{
    mode: FeatureLayer.MODE_SELECTION
  });

  // create an new draw toolbar object instance and attach it to the map object
  var drawToolbar = new Draw(map);

  // add event listener for map drawing event
  drawToolbar.on('draw-end', function(e){

    // turn off the draw toolba
    drawToolbar.deactivate();

    // create a new query object instance
    var query = new Query();

    // create a geometry query from the draw geometry
    query.geometry = e.geometry;

    // select features from the feature service using the geometry
    featureLayer.selectFeatures(query);
  });

  // add the feature layer to the map
  map.addLayer(featureLayer);

  // add click event listener for button
  on(dom.byId('drawPolygon'), 'click', function(){

    // activate the draw toolbar to draw a polygon
    drawToolbar.activate(Draw.POLYGON)
  });

});
