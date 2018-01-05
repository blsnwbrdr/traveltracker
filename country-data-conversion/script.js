function countryDataConversion() {
  $.ajax({
    url: 'data/countries.json',
    dataType: 'json',
    success: function(data) {
      var array = [];
      for (var x = 0; x < data.length; x++) {
        var allData = {"name":data[x].name.common,"latlng":[data[x].latlng[0],data[x].latlng[1]]};
        array.push(allData);
      }
      var string = JSON.stringify(array);
      string = '{"data":' + string + '}';
      parsedJson = JSON.parse(string);
      $.ajax({
        type: "POST",
        url: "/add",
        data: parsedJson,
        success: function(response) {
          document.getElementById('response').innerHTML = response;
        }
      })
    }
  })
}
document.getElementById('countryDataConversion').addEventListener('click', countryDataConversion);
