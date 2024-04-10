/*    JavaScript 7th Edition
      Chapter 2
      Project 02-03

      Application to return the shape of a clicked object
      Author: Bogdan Gura
      Date:   4/9/2024

      Filename: project02-03.js
 */

//Shapes and feedback elements
let square = document.getElementById("square");
let triangle = document.getElementById("triangle");
let circle = document.getElementById("circle");
let feedback = document.getElementById("feedback");

//Square listeners
square.addEventListener("mouseover", function() {
      feedback.innerHTML = "You're hovering over the square";
});

square.addEventListener("mouseout", function() {
      feedback.innerHTML = "";
});

//Triangle listeners
triangle.addEventListener("mouseover", function() {
      feedback.innerHTML = "You're hovering over the triangle";
});

triangle.addEventListener("mouseout", function() {
      feedback.innerHTML = "";
});

//Circle listeners
circle.addEventListener("mouseover", function() {
      feedback.innerHTML = "You're hovering over the circle";
});

circle.addEventListener("mouseout", function() {
      feedback.innerHTML = "";
});