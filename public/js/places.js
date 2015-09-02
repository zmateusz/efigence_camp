$(document).ready(getPlaces);

function getPlaces() {

  $.ajax({
    method: "GET",
    url: "http://camp.efigence.com/camp/api/places",
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
      }
    }
  });

};