"use strict";

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch("/fortune")
  .then((response) => response.text())
  .then((fortuneText) => {
    document
    .querySelector("#fortune-text")
    .innerText = fortuneText;
  });
}
 
document
.querySelector("#get-fortune-button")
.addEventListener("click", showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = "/weather.json";
  const zipcode = document.querySelector("#zipcode-field").value;


  // TODO: request weather with that URL and show the forecast in #weather-info


  fetch(`${url}?zipcode=${zipcode}`)
    .then((response) => response.json())
    .then((weatherData) => {
      document.querySelector("#weather-info").innerText = weatherData.forecast
    })

}

document
  .querySelector("#weather-form")
  .addEventListener("submit", showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

  const formInputs = {
    qty: document.querySelector("#qty-field").value,
    melon_type: document.querySelector("#melon-type-field").value,
  };

  fetch("/order-melons.json", {
    method: "POST",
    body: JSON.stringify(formInputs),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    
    if (responseJson.code === 'ERROR'){
      document.querySelector("div#order-status").classList.add("order-error")
      document.querySelector(".order-error").innerHTML = (responseJson.msg);
      
    } else if (responseJson.code === 'OK'){
      document.querySelector("div#order-status").classList.remove("order-error")
      document.querySelector("#order-status").innerHTML = responseJson.msg;
    }
  })
}
document.querySelector("#order-form").addEventListener("submit", orderMelons);
