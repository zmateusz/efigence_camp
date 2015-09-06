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
  var icons = clone.find(".media-icons");
  if (place.wifi) icons.append('<span class="icon-connection">');
  if (place.tv) icons.append('<span class=" icon-tv">');
  if (place.food) icons.append('<span class="icon-spoon-knife">');
  if (place.paypas) icons.append('<span class="icon-credit-card">');
  if (place.swimming) icons.append('<span class=" icon-lifebuoy">');
  if (place.airport) icons.append('<span class=" icon-airplane">');
  if (place.parking) icons.append('<span><strong>P</strong></span');
  tableRow.append(clone);
  tableBody.append(tableRow);
};
