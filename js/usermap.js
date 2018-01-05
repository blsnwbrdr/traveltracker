var google;
var locationCoords = [];
// GET USER LOCATION DATA
$.ajax({
  url: "locations.json",
  dataType: "text",
  success: function(userData) {
    // PARSE USER LOCATION JSON
    var userLocations = $.parseJSON(userData);
    // GET COUNTRY DATA
    $.ajax({
      url: "/portfolio/traveltracker/data/countries.json",
      dataType: "text",
      success: function(countryData) {
        // PARSE COUNTRY DATA JSON
        var countryLocations = $.parseJSON(countryData);
        for(var x = 0; x < userLocations.length; x++) {
          // PRINT LIST OF VISITED COUNTRIES BELOW THE MAP
          var visited = '<li>' + userLocations[x] + '</li>';
          document.getElementById('visitedList').innerHTML += visited;
          // PRINT NUMBER AND PERCENT OF COUNTRIES VISITED
          document.getElementById('congrats').innerHTML = '<p>Congrats! You have visited ' + userLocations.length + ' countries/territories.</p><p>' + Math.round(userLocations.length/247*100) + '% of 247 countries/territories around the globe.</p>'
          // CREATE ARRAY OF LOCATION COORDS FOR GOOGLE MAPS
          for(var i = 0; i < countryLocations.length; i++) {
            if(userLocations[x] === countryLocations[i].name) {
              var countryCoords = {lat: parseFloat(countryLocations[i].latlng[0]), lng: parseFloat(countryLocations[i].latlng[1])};
              locationCoords.push(countryCoords);
            }
          }
          // INITIALZE MAP WITH USER LOCATION DATA
          initMap();
        }
      }
    })
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
