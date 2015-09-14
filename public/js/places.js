$(document).ready(getPlaces(1));

var apiURL = "http://camp.efigence.com/camp/api/places";

function getPlaces(page) {
  // if (typeof(page)==='undefined') page = 1;
  $.ajax({
    method: "GET",
    url: apiURL,
    data: { page: page },
    statusCode: {
      200: function(data) {
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
  if (place.tv) icons.append('<span class="icon-tv">');
  if (place.food) icons.append('<span class="icon-spoon-knife">');
  if (place.paypas) icons.append('<span class="icon-credit-card">');
  if (place.swimming) icons.append('<span class="icon-lifebuoy">');
  if (place.airport) icons.append('<span class="icon-airplane">');
  if (place.parking) icons.append('<span><strong>P</strong></span');
  clone.find(".score").html("Ocena "+place.score+"/<small>10</small>");
  clone.find(".opinions").text("Ocena na podstawie "+place.opinion_count+" opinii");
  clone.find(".oldprice").html("<s>"+place.oldprice+",00PLN</s>");
  clone.find(".price").prepend(place.price);
  tableRow.append(clone);
  tableBody.append(tableRow);
};

$("#page-numbers h4").click(function() {

  $("#page-numbers h4").removeClass("active");
  $(this).addClass("active");
  var page = $(this).text();
  $('tbody tr').slice(1).remove();
  getPlaces(page);
  
});
