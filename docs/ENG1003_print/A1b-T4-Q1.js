/*
NAME: MUHAMMAD AIMAN BIN SHAMSIEMON
ID: 30148936
ASSIGNMENT 1B TASK 4 QUESTION 1
*/
/*
FUNCTION CODE document
let student = studentEnrol()
--INPUT--
* None
--OUTPUT--
*outputObj - object
An object containing information of students extracted from
html file
*/
let resultAreaRef = document.getElementById("resultArea");
function studentEnrol()
{
  //Define and Initialize output
  let student = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    address: "",
    email: ""
  }

  //Reference for each of the inputs
  let firstNameRef = document.getElementById("firstName");
  let lastNameRef = document.getElementById("lastName");
  let dateOfBirthRef = document.getElementById("dateOfBirth");
  let genderRef = document.getElementById("gender");
  let countryRef = document.getElementById("country");
  let addressRef = document.getElementById("address");
  let emailRef = document.getElementById("emailAddress");


  //Assign object key property to respective value
  student['firstName'] = firstNameRef.value;
  student['lastName'] = lastNameRef.value;

  //For date, extract the relevate date,month,year
  student["dateOfBirth"] = dateOfBirthRef.value;
  /* ERROR: REALISE DATA EXTRACTED IN FORM OF STRING NOT OBJECT
  student.dateOfBirth.setDate() = dateOfBirthVal.getDate();
  student.dateOfBirth.setMonth() = dateOfBirthVal.getMonth();
  student.dateOfBirth.setFullYear()
  = dateOfBirthVal.getFullYear();
*/
  //console.log(typeof dateOfBirthVal);
  //For gender,extract?
  student['gender'] = genderRef.value;

  student['country'] = countryRef.value;
  student['address'] = addressRef.value;
  student['email'] = emailRef.value;

  //Have to generate output as well
  let outputstr = "";

  //for firstName, lastName
  outputstr += "Student Name: " + student["firstName"] + " ,"
  outputstr += student["lastName"].toUpperCase()+ " \n";
  outputstr += "Date of Birth: "  + student["dateOfBirth"] + "\n";
  outputstr += "Gender: " + student["gender"] + "\n"
  outputstr += "Country: " + student.country + "\n";
  outputstr += "Email: " + student.email + "\n";

  console.log(typeof outputstr);
  resultAreaRef.innerText = outputstr;
}

//Extract submit button idea
let submitRef = document.getElementById("submit");
//addEventListener
submitRef.addEventListener("click", studentEnrol);
