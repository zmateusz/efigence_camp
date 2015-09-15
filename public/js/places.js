$(document).ready(function() {
  getPlaces(1);
});

var apiURL = "http://camp.efigence.com/camp/api/places";

function getPlaces(page) {

  $.ajax({
    method: "GET",
    url: apiURL,
    data: { page: page },
    dataType: 'json',
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

  var page = parseInt($(this).text());
  var prevPage = $("#prev-page");
  var nextPage = $("#next-page");
  $("#page-numbers h4").removeClass("active");
  $(this).addClass("active");
  $('tbody tr').slice(1).remove();
  nextPage.removeClass("not-active");
  prevPage.removeClass("not-active");
  if (page == 1) {
    prevPage.addClass("not-active");
  };
  if (page == 4) {
    nextPage.addClass("not-active");
  };
  getPlaces(page);
  
});
$("#prev-page").click(function() {

  var page = parseInt($("#page-numbers .active").text())-1;
  $("#page-numbers h4").removeClass("active");
  $("#page-numbers h4:nth-of-type("+page+")").addClass("active");
  $('tbody tr').slice(1).remove();
  if (page == 1) {
    $("#prev-page").addClass("not-active");
  };
  if (page == 3) {
    $("#next-page").removeClass("not-active");
  };
  getPlaces(page);

});
$("#next-page").click(function() {

  var page = parseInt($("#page-numbers .active").text())+1;
  $("#page-numbers h4").removeClass("active");
  $("#page-numbers h4:nth-of-type("+page+")").addClass("active");
  $('tbody tr').slice(1).remove();
  if (page == 4) {
    $("#next-page").addClass("not-active");
  };
  if (page == 2) {
    $("#prev-page").removeClass("not-active");
  };
  getPlaces(page);

});