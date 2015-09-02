$(document).ready(getPlaces);

var apiURL = "http://camp.efigence.com/camp/api/places";

function getPlaces() {
  $.ajax({
    method: "GET",
    url: apiURL,
    // data: { page: 1 },
    statusCode: {
      200: function(data) {
        var tableBody = $("table tbody");
        for (var i=0; i < data.places.length; i++) {
          var place = data.places[i];
          var tableRow = $("<tr></tr>");
          tableRow.append($("<td></td>").append(place.name));
          tableRow.append($("<td></td>").append(place.place));
          tableRow.append($("<td></td>").append(place.price));
          tableBody.append(tableRow);
        };
      },
      422: function() {
        alert("Unprocessable entity");
      },
      500: function() {
        alert("Błąd serwera, spróbuj ponownie.");
      },
      0: function() {
        apiURL = "http://camp.efigence.com/camp/api/places/";
        getPlaces();
      }
    }
  });

};
