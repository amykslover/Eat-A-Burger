// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-eaten").on("click", function(event) {
    
    var id = $(this).data("id");
    var eatenState = $(this).data("eatstate");

    var newEatenStatus = {
      eaten: eatenState
    };

    // Send the PUT request with the correct identifier
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newEatenStatus
    }).then(
      function() {
        console.log("Eaten status is set to", eatenState);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      name: $("#burgeradd").val().trim()
    };

    console.log('newBurger');
    console.log(newBurger);
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("Added New Burger");
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(
      function() {
        console.log("Deleted Burger", id);
        location.reload();
      }
    );
  });
});
