$(function() {
  var player = $('iframe');
  var playerOrigin = '*';

  // Helper function for sending a message to the player
  // works only from web server - not locally
  // https://developer.vimeo.com/player/js-api
  function post(action, value) {
    var data = {
      method: action
    };
    
    if (value) {
      data.value = value;
    };

    var message = JSON.stringify(data);
    player[0].contentWindow.postMessage(data, playerOrigin);
  };

  $('#myModal').on('shown.bs.modal', function (e) {
    post("play");
  });
  $('#myModal').on('hidden.bs.modal', function (e) {
    post("pause");
  });

});

$("#btnSend").click(function(event) {
  event.preventDefault();

  var name = $("#inputName").val();
  var email = $("#inputEmail").val();
  var message = $("#inputMessage").val();

  $.ajax({
    method: "POST",
    url: "http://camp.efigence.com/camp/api/contact",
    data: { name: name, 
            email: email,
            message: message },
    statusCode: {
      200: function(msg) {
        alert("Sukces, odebrane dane:\n" + msg.name + "\n" + msg.email +"\n" + msg.message);
      },
      422: function() {
        alert("Sprawdź formularz, dane nie przeszły walidacji.");
      },
      500: function() {
        alert("Błąd serwera, spróbuj ponownie.");
      }
    }
  });
  // .done(function( msg ) {
  //   alert( "Data Saved: " + msg.name + "\n" + msg.email +"\n" + msg.message );
  // });
});