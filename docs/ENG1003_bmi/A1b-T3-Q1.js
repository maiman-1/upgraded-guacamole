/*
NAME: MUHAMMAD AIMAN BIN SHAMSIEMON
ID: 30148936
ASSIGNMENT 1B TASK 3 QUESTION 1
*/
//Below is code given:
function calculateBMI()
{
	let weightRef = document.getElementById("weight");
	let heightRef = document.getElementById("height");
	let resultRef = document.getElementById("result");

	let weight = weightRef.value;
	let height = heightRef.value;

	let result = weight / Math.pow(height,2);

	resultRef.innerText = result.toFixed(1);
}

// TODO: Task 1: Add eventlistener for when mouse clicks on button
//Get reference to button
let buttonRef = document.getElementById("submit");
//Add DOM eventlistener for clicks. Executes calculateBMI
buttonRef.addEventListener("click", calculateBMI);

// TODO: Task 2: Add eventlistener for result to change when weight,height
//changes
let weightRef = document.getElementById("weight");
let heightRef = document.getElementById("height");
//Add event listener for when change occur
weightRef.addEventListener("change", calculateBMI);
heightRef.addEventListener("change", calculateBMI);
