/*    JavaScript 7th Edition
      Chapter 2
      Project 02-01

      Celsius <-> Farenheit Coverter
      Author: Bogdan Gura
      Date:   4/9/2024

      Filename: project02-01.js
 */

//Add ;isteners to inputs on load
// Add listeners to inputs on load
window.addEventListener("load", addEventListeners);

function addEventListeners() {
    // Listener for Celsius input
    document.getElementById("cValue").addEventListener("blur", function() {
        let cDegree = parseInt(document.getElementById("cValue").value);
        document.getElementById("fValue").value = CelsiusToFahrenheit(cDegree);
    });

    // Listener for Fahrenheit input
    document.getElementById("fValue").addEventListener("blur", function() {
        let fDegree = parseInt(document.getElementById("fValue").value);
        document.getElementById("cValue").value = FahrenheitToCelsius(fDegree);
    });
}

// Temperature conversion functions
function FahrenheitToCelsius(degree) {
    return (degree - 32) / 1.8;
}

function CelsiusToFahrenheit(degree) {
    return (degree * 1.8) + 32;
}