
$(".card-info ").removeClass("hide");

let form = document.getElementById("form");

$("#form").on("submit", event => {
  event.preventDefault();
  let cardInfo = {
    name: form.name.value.toString(),
    number: form.number.value.toString(),
    expiration: form.expiration.value.toString(),
    cvc: form.cvc.value.toString(),
    price: form.price.toString(),
    street: form.street.value.toString(),
    zip: form.zip.value.toString()
  };
  let price = "899";

  let post = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    dataType: "json",
    data: JSON.stringify({
      command: "cc:sale",
      amount: price,
      creditcard: cardInfo
    }),
    error: (err, message) => {
      alert("Error");
      console.log(err);
    },
    success: res => {
      if (res.result != "Approved") {
        alert(
          `Card declined because "${
          res.error
          }". Please check your card information and try again`
        );
      } else {
        let charged = `Your Credit Card ending ${cardInfo.number.slice(
          -4
        )} was charged $899. Enjoy your trip!`;
        $(".card-info ").addClass("hide");
        $(".final").removeClass("hide");
        $(".enjoy").text(charged);
      }
    }
  };

  $.ajax("/", post);
});