/*    JavaScript 7th Edition
      Chapter 3
      Project 03-01

      Application to calculate total order cost
      Author: Bogdan Gura
      Date:   4/12/2024 

      Filename: project03-01.js
*/
let menuItems = document.getElementsByClassName("menuItem");
let billTotal = document.getElementById("billTotal");

//Adding event listeners to menuItems
for(let i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener("change", calcTotal);
}

//Function to calculate the total of menuItems
function calcTotal() {
      let orderTotal = 0;

      for (let i = 0; i < menuItems.length; i++) {
            if(menuItems[i].checked) {
                  orderTotal += parseFloat(menuItems[i].value); 
            }
      }

      //Assigning order total to the billTotal span
      billTotal.innerHTML = formatCurrency(orderTotal);
}

 // Function to display a numeric value as a text string in the format $##.## 
function formatCurrency(value) {
    return "$" + value.toFixed(2);
 }