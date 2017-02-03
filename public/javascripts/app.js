
//document references the dom top level
$(document).ready(function () {




  let validator = $("#contactForm").validate();

  $("#contactForm").on('submit', function (e) {
    e.preventDefault();
    let form = $(this);

    $.ajax({
      type: "POST",
      url: "/contact",
      // contentType: 'application/json; charset=utf-8',
      // dataType: 'json',
      json: true,
      data: form.serialize(),
    })
      .done(function () {
        form.closest("div").html(`
          <div id="contact-confirm">
            <h3>Thank you for contacting us!</h3>
          </div>
        `);
      });

  });

});
