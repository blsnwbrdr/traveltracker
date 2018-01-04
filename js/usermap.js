var google;
var locationCoords = [];
var locationName = [];
// GET USER LOCATION DATA
$.ajax({
  url: "locations.json",
  dataType: "text",
  success: function(data) {
    // PARSE AND PUSH DATA TO ARRAYS
    var locations = $.parseJSON(data);
    for(var x = 0; x < locations.length; x++) {
      var countryCoords = {lat: locations[x].latlng[0], lng: locations[x].latlng[1]};
      var countryName = locations[x].name;
      locationCoords.push(countryCoords);
      locationName.push(countryName);
    }
    // PRINT LIST OF VISITED COUNTRIES BELOW THE MAP
    for(var z = 0; z < locationName.length; z++) {
      var visited = '<li>' + locationName[z] + '</li>';
      document.getElementById('visitedList').innerHTML += visited;
    }
    // PRINT NUMBER AND PERCENT OF COUNTRIES VISITED
    document.getElementById('congrats').innerHTML = '<p>Congrats! You have visited ' + locationName.length + ' countries/territories.</p><p>' + Math.round(locationName.length/247*100) + '% of 247 countries/territories around the globe.</p>'
    // INITIALZE MAP WITH USER LOCATION DATA
    initMap();
  }
});

// INITIALIZE MAP
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: {lat: 26.2639368, lng: 12.7765974},
    scrollwheel: false
  });
  // SET MARKERS
  var markers = locationCoords.map(function(location) {
    return new google.maps.Marker({
      position: location,
    });
  });
  // SET MARKER CLUSTERS
  var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
