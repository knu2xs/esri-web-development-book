require([
  'esri/map',
  'esri/Color',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/graphic'
], function(
  Map,
  Color,
  SimpleLineSymbol,
  SimpleMarkerSymbol,
  Graphic
){

  // create a new map instance
  var map = new Map('map', {
    basemap: 'streets',
    center: [-118.2095, 34.0866],
    zoom: 10
  });

  // when the map is clicked
  map.on('click', function(e) {

    // save the map point from the click event to a variable
    var mapPoint = e.mapPoint,


      // create a graphic object using the properties set up previously
      graphic = new Graphic(

        // create the graphic at the click event map point
        mapPoint,

        // create a simple marker symbol
        new SimpleMarkerSymbol(
          SimpleMarkerSymbol.STYLE_CIRCLE, // use the circle style
          24, // set the symbol size

          // create a line object
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, // use the solid line style
            new Color([255, 0, 0]),  // set the line color
            3  // set the line weight
          ),

          new Color([255, 255, 0, 0.75]) // use a color object to set the fill for the circle
        )
      );

    // add the new graphic to the map
    map.graphics.add(graphic);
  });
});
