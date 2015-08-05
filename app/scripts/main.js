require([
  // dojo modules
  'dojo/dom',
  'dojo/on',
  'dojo/_base/array',
  'dojo/_base/Color',

  // esri modules
  'esri/map',
  'esri/tasks/query',
  'esri/tasks/QueryTask',
  'esri/symbols/SimpleMarkerSymbol'
], function(
  dom,
  on,
  array,
  Color,
  Map,
  Query,
  QueryTask,
  SimpleMarkerSymbol
){

  // create a new map instance
  var map = new Map('map', {
    basemap: 'streets',
    center: [-118.2095, 34.0866],
    zoom: 10
  });

  // save the url of the feature service in a variable
  var url = 'http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/la_county_labor_centroid/FeatureServer/0'

  // create a new simple marker symbol to display the features retrieved
  var markerSymbol = new SimpleMarkerSymbol(
    SimpleMarkerSymbol.STYLE_SQUARE,
    10,
    null,
    new Color([50, 50, 255])
  );

  // function loading graphics into default map graphics layer
  var onQuerySuccess = function(featureSet){

    // clear the graphics layer
    map.graphics.clear();

    // iterate the features in the feature set
    array.forEach(featureSet.features, function(feature){

      // set the symbology to the marker symbol
      feature.setSymbol(markerSymbol);

      // add the feature to the map graphics layer
      map.graphics.add(feature);
    });
  };

  // error function
  var onError = function(error){
    console.error('An error occurred in the query: ', error);
  };

  // click event listener on dropdown selector
  on(dom.byId('population'), 'change', function(e){

    // save the selected value in a variable
    var population = e.target.value;

    // if the population selected is a valid value
    if (population.length > 0){

      // create a new query task object instance using the feature service rest endpoint
      var queryTask = new QueryTask(url);

      // create a new query object instance
      var query = new Query();

      // set the where sql clause for the query object
      query.where = 'TOTAL_POP > ' + population;

      // enable the query task to return geometry
      query.returnGeometry = true;

      // execute the query on the query task and use promise to handle results
      queryTask.execute(query).then(onQuerySuccess, onError);
    }
  });
});
