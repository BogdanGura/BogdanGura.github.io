/*    JavaScript 7th Edition
      Chapter 2
      Project 02-04

      Application to calculate the cost of a restaurant order plus tax
      Author: Bogdan Gura
      Date:  4/10/2024   

      Filename: project02-04.js
 */
 
//Constants
const CHICKEN_PRICE = 10.95;
const HALIBUT_PRICE = 13.95;
const BURGER_PRICE = 9.95;
const SALMON_PRICE = 18.95;
const SALAD_PRICE = 7.95;
const SALES_TAX = 0.07;

//Listener for page loading
window.addEventListener("load", createEventListeners);

//function for creating listeners for input elements
function createEventListeners() {
   document.getElementById("chicken").onchange = calcTotal;
   document.getElementById("halibut").onchange = calcTotal;
   document.getElementById("burger").onchange = calcTotal;
   document.getElementById("salmon").onchange = calcTotal;
   document.getElementById("salad").onchange = calcTotal;
}

//Function that will track what food user picked
function calcTotal() {
   let cost = 0;
   let tax;
   let buyChicken = document.getElementById("chicken").checked;
   let buyHalibut = document.getElementById("halibut").checked;
   let buyBurger = document.getElementById("burger").checked;
   let buySalmon = document.getElementById("salmon").checked;
   let buySalad = document.getElementById("salad").checked;
   let foodTotal = document.getElementById("foodTotal");
   let taxField = document.getElementById("foodTax");
   let totalCost = document.getElementById("totalBill");

   //Checking which food has user chosen
   cost += buyChicken ? CHICKEN_PRICE : 0;
   cost += buyHalibut ? HALIBUT_PRICE : 0;
   cost += buyBurger ? BURGER_PRICE : 0;
   cost += buySalmon ? SALMON_PRICE : 0;
   cost += buySalad ? SALAD_PRICE : 0;

   //Setting foodTotal span
   foodTotal.innerHTML = formatCurrency(cost);

   //Calculating taxes
   tax = cost * SALES_TAX;

   //Assign tax to the taxField
   taxField.innerHTML = formatCurrency(tax);

   //Assign total cost 
   totalCost.innerHTML = formatCurrency(cost + tax);
}

// Function to display a numeric value as a text string in the format $##.## 
 function formatCurrency(value) {
    return "$" + value.toFixed(2);
 }
