/**
 * main.js
 * This file contains code that runs on load for index.html
 */

// TODO: Write the function displayLockers
/*
FUNCTION displayLockers
displayLockers(data)
--INPUT--
- data:LockerList
--OUTPUT--
- NONE

-Display information in html page
*/
function displayLockers(data)
{
	let htmlString = "";
	//console.log(data.getLocker(0).label);

	for (let i = 0; i<data.count; i++)
	{
    	//let index = i;
		htmlString += '<div class="mdl-cell mdl-cell--4-col">';
		htmlString += '<div class="mdl-card mdl-shadow--2dp locker" style="background-color:#';
    		htmlString += data.getLocker(i).color + '">';
		htmlString += '<div class="mdl-card__title mdl-card--expand">';
		htmlString += "<h2>";
		htmlString += data.getLocker(i).id;
		htmlString += "</h2>";
		htmlString += "<h4>" + data.getLocker(i).label + "</h4>";
		htmlString +=  '</div>'; // 1 closed, 2 remains
		htmlString += '<div class="mdl-card__actions mdl-card--border">'; //Open one more: 3
		htmlString +=  '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onclick="view(';
    	htmlString +=  i.toString() + ')">Open Locker</a> <div class="mdl-layout-spacer">';
		htmlString += '</div>'; // 1 closed, 2 remains
		//Lock sign
    	if (data.getLocker(i).locked)
		{htmlString += '  <i class="material-icons">lock</i>';}
    	else {htmlString += '<i class="material-icons">lock_open</i>';}
		htmlString += "</div></div></div><br>";
	}
	//Declare ref
	let lockerDisplayRef = document.getElementById("lockerDisplay");
	lockerDisplayRef.innerHTML = htmlString;
}

// TODO: Write the function addNewLocker
function addNewLocker()
{
	//prompt user for id
	//No need (Additional Task)
	lockers.addLocker();
  	updateLocalStorage(lockers);
	displayLockers(lockers);
}

// TODO: Write the function view
function view(index)
{
	localStorage.setItem(LOCKER_INDEX_KEY, index);
	window.location = "view.html";
}


// TODO: Write the code that will run on load here
displayLockers(lockers);
