/**
 * view.js
 * This file contains code that runs on load for view.html
 */
// Retrieve the stored index from local storage
let index = localStorage.getItem(LOCKER_INDEX_KEY);
// using the getLocker method, retrieve the current Locker instance
let locker = lockers.getLocker(index);
//console.log(locker.pin);

// TODO: Write the function displayLockerInfo
function displayLockerInfo(locker)
{
	//Display locker information using DOM manipulation
	let localString = "";
	//Retrieve ref
	let lockerContentsRef = document.getElementById("lockerContents");
	//Input Data into localString
	localString += "<h4>ID:</h4><h7> " + locker.id + "</h7><br>";
	localString += "<h4>Label:</h4><h7> " +locker.label + "</h7><br>";
	localString += "<h4>Color:</h4><h7> " +locker.color + "</h7><br>";
	localString += "<h4>Contents:</h4><h7> " +  locker.contents + "</h7><br>";
	lockerContentsRef.innerHTML = localString;

	//Added for deletion
	//Retrieve delete button ref
	let deleteButtonRef = document.getElementById("deleteLocker");
	deleteButtonRef.addEventListener("click",deleteThisLocker);
}

// TODO: Write the function unlock
function unlock(locker)
{
	//prompt user for pin
	let userPin = prompt("Input Pin:");
	if (userPin == locker.pin)
	{
		//If true
		locker.locked = false;
		locker.pin = "";
		displayLockerInfo(locker);
	}
	else if (userPin !== locker.pin){
		window.location = "index.html";
		console.log(locker.pin);
	}
}

// TODO: Write the function deleteThisLocker
function deleteThisLocker()
{
	//Ask user for confirmation
	// Confirm with the user
	if (confirm("Are you very sure?"))
	{
		// runs if user clicks 'OK'
		lockers.removeLocker(index);
		updateLocalStorage(lockers);
		prompt("Locker has been deleted");
		window.location = "index.html";
	}
	else
	{
		// runs if user clicks 'Cancel'
	}
	}


// TODO: Write the function lockLocker
function lockLocker()
{
	console.log(locker);
	// prompt user for new pin
	let newPin = prompt("Set new Pin");
	//Reconfirm pin
	let confirmPin = prompt("Confirm your pin");
	if (confirmPin === newPin)
	{
		//Runs if true
		locker.locked = true;
		locker.pin = newPin;
    //Retrieve data from text field and update
    let lockerLabelRef = document.getElementById("lockerLabel");
    let lockerColorRef = document.getElementById("lockerColor");

    if (lockerLabelRef.value === "")
    {} else { locker.label = lockerLabelRef.value;}
    //Not allowed to change to white
    if (lockerColorRef.value === "FFFFFF")
    {} else { locker.color = lockerColorRef.value;}
		//console.log(locker);
		//console.log(lockers);
		updateLocalStorage(lockers);
		alert("Locker has been locked");
		window.location = "index.html";
	}
	else
	{
		alert("Pin does not match. Locking cancelled");
	}
}

// TODO: Write the function closeLocker
function closeLocker()
{
	// Confirm with the user
	if (confirm("Are you sure you want to close without locking?"))
	{
		// runs if user clicks 'OK'
    let lockerLabelRef = document.getElementById("lockerLabel");
    let lockerColorRef = document.getElementById("lockerColor");
    if (lockerLabelRef.value === "")
    {} else { locker.label = lockerLabelRef.value;}
    if (lockerColorRef.value === "FFFFFF")
    {} else { locker.color = lockerColorRef.value;}
		updateLocalStorage(lockers);
		alert("Locker has been closed but not locked");
		window.location = "index.html";
	}
	else
	{
		// runs if user clicks 'Cancel'
	}
}



// TODO: Write the code that will run on load here
//console.log(locker.locked);
//Check if locker locked
if (locker.locked)
{
	console.log(locker.pin);
	//If true
	unlock(locker);
}
else if (!locker.locked)
{
	//if fase
	displayLockerInfo(locker);
}
