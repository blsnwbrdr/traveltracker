var countryData, google;

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

// CREATE BUTTONS FOR ALL COUNTRIES SORTED BY COMMON NAME
var countryName = [];
for(var i = 0; i < countryData.length; i++) {
  countryName.push(countryData[i].name.common);
}
countryName.sort();
for(var v = 0; v < countryName.length; v++) {
  if(v % 2 === 0) {
    var even = '<div><label class="btn btn-default color1"><input type="checkbox" value="' + countryName[v] + '">' + countryName[v] + '</label></div>';
    document.getElementById('countryList').innerHTML += even;
  } else {
    var odd = '<div><label class="btn btn-default color2"><input type="checkbox" value="' + countryName[v] + '">' + countryName[v] + '</label></div>';
    document.getElementById('countryList').innerHTML += odd;    
  }
}

// ARRAY OF SELECTED LOCATIONS
var locationCoords = [];
var locationName = [];
var userMap = [];

// GET SELECTED COUNTRIES
function selected() {
  // CLEAR LIST AND ARRAYS IN CASE OF RE-SUBMISSIONS
  document.getElementById('visitedList').innerHTML = '';
  document.getElementById('generateButton').innerHTML = '';
  locationCoords = [];
  locationName = [];
  userMap = [];
  // LOOP THROUGH THE CHECKBOXES, MATCH WITH THE ARRAY OF COUNTRIES, AND PUSH DATA TO LOCATION ARRAYS
  var checkboxes = document.getElementsByTagName('input');
  for(var x = 0; x < checkboxes.length; x++) {
    if(checkboxes[x].checked) {
      for(var i = 0; i < countryData.length; i++) {
        if(checkboxes[x].value === countryData[i].name.common) {
          var newCountryCoords = {lat: countryData[i].latlng[0], lng: countryData[i].latlng[1]};
          var newCountryName = countryData[i].name.common;
          var allData = {"name":countryData[i].name.common,"latlng":[countryData[i].latlng[0],countryData[i].latlng[1]]};
          locationCoords.push(newCountryCoords);
          locationName.push(newCountryName);
          userMap.push(allData);
        }
      }
    }
  }
  // PRINT LIST OF VISITED COUNTRIES BELOW THE MAP
  locationName.sort();
  for(var z = 0; z < locationName.length; z++) {
    var visitedName = '<li>' + locationName[z] + '</li>';
    document.getElementById('visitedList').innerHTML += visitedName;
  }
  // RE-INITIALIZE THE MAP WITH THE NEW DATA
  initMap();
  var buttonGenerateMap = '<button id="generateMap" class="btn animated bounce" type="button">Generate a Map to Share</button>';
  document.getElementById('generateButton').innerHTML += buttonGenerateMap;
  document.getElementById('generateMap').addEventListener('click', generate);
}
document.getElementById('submit').addEventListener('click', selected);


// GENERATE USER MAP
function generate() {
  $.ajax({
    url: "generate.php",
    dataType: "text",
    data: { data: JSON.stringify(userMap) },
    success: function(dirName) {
      var newDir = $.parseJSON(dirName);
      var buttonNewMap = '<a href="usermaps/' + newDir + '" target="_blank"><button id="newMap" class="btn animated bounce" type="button">Go to My Map</button>';
      document.getElementById('generateButton').innerHTML = buttonNewMap;
    }
  });
}

