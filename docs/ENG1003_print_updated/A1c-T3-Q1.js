let submitRef = document.getElementById("submitButton");
submitRef.addEventListener("click", saveEnrolmentDetails);


/*
function to input information inot student details
submitRef.addEventListener("click", printDetails)
--NO INPUT--
--NO OUTPUT--

1. Get reference
2. Add into local string
3. innerHTML
4. Find out the format as go along
*/

function saveEnrolmentDetails()
{
	//Stores information in this string before printing
	let output = "";
	let printAreaRef = document.getElementById("enrolmentResult");
	let fNameRef = document.getElementById("fName");
	let lNameRef = document.getElementById("lName");
	let addressRef = document.getElementById("address");
	let emaiRef = document.getElementById("email");
	let contactRef = document.getElementById("contact");
	let dOBRef = document.getElementById("doB");
	//console.log(document.getElementById("doB"));
	//For gender, uses name not ID
	let genderRef = document.getElementsByName("gender");
	let gender = "";
	for (let i = 0; i < genderRef.length; i++)
	{
		if (genderRef[i].checked)
		{
			gender = genderRef[i].value;
		}
	}
	output += "<p><b>First Name:</b> " + fNameRef.value + "</p>";
	output += "<p><b>Last Name:</b>" + lNameRef.value + "</p>";
	output += "<p><b>Date of Birth:</b> " + dOBRef.value + "</p>";
	output += "<p><b>Gender:</b> " + gender + "</p>";
	output += "<p><b>Address:</b> " + addressRef.value + "</p>";
	output += "<p><b>eMail:</b> " + emaiRef.value + "</p>";
	output += "<p><b>Contact Number:</b> " + contactRef.value.toString() + "</p>";

	printAreaRef.innerHTML = output;
	}
