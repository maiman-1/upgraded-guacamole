/*
BUILT FOR JAVASCRIPT PLAYGROUND
MUHAMMAD AIMAN BIN SHMAMSIEMON
ENG1003
T1Q1
*/
//Show information as table lol
//Token to access web service
const TOKEN = "e44bd015357535b0b2d12666f79cddacf52f638f";
//Web service url
const AQI_WEB_URL = "https://api.waqi.info/feed/";

//Get button reference and add eventlistener
let buttonRef = document.getElementById("button");
buttonRef.addEventListener("click",getAQIData);

//Function: getAQIData ->Make request to server
function getAQIData()
{
	//Retrieve information from cityName ref
	let cityNameRef = document.getElementById("cityName");
	//Use value as input for URL
	let webURL = AQI_WEB_URL + encodeURIComponent(cityNameRef.value) +"/?token=" + encodeURIComponent(TOKEN) + "&callback=processData";

	//Call web service by adding script element
	let script = document.createElement("script");
	script.src = webURL;
	document.body.appendChild(script);
}

//Function:  processData -> Take data processed and output it in output
function  processData(result)
{
	let localStr = "";
	//data is retrieved in form of object (result is object)
	//First check for errors
	if (result.status === "ok")
	{
		let pollutants="";
		let iaqi = result.data.iaqi;
		//console.log(iaqi.h);
		///Loop through iaqi (NOT IAQI)
		//console.log(pollutants);
		//console.log(result);
		//console.log(result.data.iaqi.h)
		//Then, retrieve data
		// if iaqi.pm25 !== null, retrieve
		if (iaqi.pm25 !== null || iaqi.pm25 !== undefined || iaqi.pm25 !== "")
		{
			pollutants = iaqi.pm25.v;
		}
		else{
			pollutant += "NOT RECORDED";
		}
		//console.log(iaqi.pm25)
		//Loop through data via recusive function (NO NEED)
		localStr += `<table class="mdl-data-table mdl-js-data-table mdl-data-table mdl-shadow--2dp">
  <thead>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">AQI</td>
      <td>${result.data.aqi}</td>
    </tr>
		</thead>
		<tbody>
		<tr>
      <td class="mdl-data-table__cell--non-numeric" rowspan="5">PM 2.5</td>
      <td class="mdl-data-table__cell--non-numeric">${pollutants}</td>
    </tr>
  </tbody>
</table>
		`;
		//Call outputRef
		let outputRef = document.getElementById("output");
		outputRef.innerHTML = localStr;;
	}
	//If not output the message
	else if (result.status === "error")
	{
		localStr += "Error<br>Cause: " + result.message;
	}
}

//let a = 123;
//console.log(a.toString()[0]);
