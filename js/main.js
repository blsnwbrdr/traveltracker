// CREATE BUTTONS FOR ALL COUNTRIES SORTED BY COMMON NAME
var countryName = [];
var userMap = [];
$.ajax({
  url: 'data/countries.json',
  dataType: 'json',
  success: function(data) {
    for(var i = 0; i < data.length; i++) {
      countryName.push(data[i].name.common);
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
    // GET SELECTED COUNTRIES
    function selected() {
      userMap = [];
      var checkboxes = document.getElementsByTagName('input');
      for(var x = 0; x < checkboxes.length; x++) {
        if(checkboxes[x].checked) {
          for(var i = 0; i < data.length; i++) {
            if(checkboxes[x].value === data[i].name.common) {
              var allData = {"name":data[i].name.common,"latlng":[data[i].latlng[0],data[i].latlng[1]]};
              userMap.push(allData);
            }
          }
        }
      }
      generate();
    }
    document.getElementById('submit').addEventListener('click', selected);
  }
})

// GENERATE USER MAP
function generate() {
  $.ajax({
    url: "generate.php",
    dataType: "text",
    data: { data: JSON.stringify(userMap) },
    success: function(dirName) {
      var newDir = $.parseJSON(dirName);
      window.location = 'usermaps/' + newDir;
    }
  });
}
