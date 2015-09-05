$(document).ready(getPlaces);

var apiURL = "http://camp.efigence.com/camp/api/places";

function getPlaces() {
  $.ajax({
    method: "GET",
    url: apiURL,
    // data: { page: 1 },
    statusCode: {
      200: function(data) {
        dd = data;
        var tableBody = $("table tbody");
        for (var i=0; i < data.places.length; i++) {
          newTableRow(data.places[i], tableBody);
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

function newTableRow(place, tableBody) {
  var tableRow = $("<tr></tr>");
  var clone = $("#rowTemplate").children().clone();
  clone.find(".media-heading").text(place.name);
  clone.find(".media-object").attr("src", place.image+"?v="+place.id);
  clone.find(".media-place").text(place.place+", "+place.district);
  clone.find(".media-stars").html('<span class="icon-star-full">'.repeat(place.starts));
  clone.find(".media-description").text(place.description);
  if (place.wifi) clone.find(".media-icons").append('<span class="icon-connection">');
  tableRow.append(clone);
  tableBody.append(tableRow);
};
