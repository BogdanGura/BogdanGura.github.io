/*    JavaScript 7th Edition
      Chapter 2
      Project 02-02

      Application to test for completed form
      Author: Bogdan Gura
      Date:   4/9/2024   

      Filename: project02-02.js
 */
window.addEventListener("load", function () {
      this.document.getElementById("submit").addEventListener("click", verifyForm)
})
 
function verifyForm() {
      //Verify form fields
      let nameFieldValid = document.getElementById("name").value;
      let emailFieldValid = document.getElementById("email").value;
      let phoneFieldValid = document.getElementById("phone").value;

      if(nameFieldValid && emailFieldValid && phoneFieldValid) {
            alert("Thank You!");
      } else {
            alert("Please fill in all fields");
      }
}