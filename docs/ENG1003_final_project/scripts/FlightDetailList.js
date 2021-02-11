//No longer necessary: All from localStorage (FLIGHTS_KEY)
flightsStored.fromData(getDataLocalStorage());
//console.log(flightsStored.flights[0].departureAirport);

//Reference for the inputs
let flightSortRef = document.getElementById("flightDetailOption");
let flightFilterRef = document.getElementById("flightTimeOption");

//console.log(flightSortRef);
//addEventListener for this
flightSortRef.addEventListener("change",getFlightsData);
flightFilterRef.addEventListener("change",getFlightsData);

//Referernce of table
let flightsOutputHeadRef = document.getElementById("flightsOutputHead");
let flightsOutputRef = document.getElementById("flightsOutput");
//console.log(document.getElementById("filterAirport"));
//console.log(flightsOutputRef);
window.addEventListener("load", getFlightsData);
//console.log("loaded");
//Function: getAQIData ->Make request to server
function getFlightsData()
{
	let result = flightsStored.flights;
	//console.log(result.airplanes[0].id);
	let localStr = "";
  let localStrHead = "";
  //thead content;
  localStrHead += '<tr>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric"';
  localStrHead += ' style = "text-align:center" >ID </th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric"';
  localStrHead += ' style = "text-align:center" >Departure Airport </th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Arrival Aiport</th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Time of Departure</th>';
	localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Time of Arrival</th>';
  localStrHead += '<th class="mdl-data-table__cell--non-numeric" style = "text-align:center" >Expected Weather at arrival</th>';
  localStrHead += '</tr>';
  flightsOutputHeadRef.innerHTML = localStrHead;
	//console.log(result[0].dateTimeArrival);
	//Sort result
	result = sortData(result);
	//First, loop through the object and add to the localStr with proper
  for (let i = 0; i < result.length; i++)
  {
		console.log(new Date(result[i].departureAirport.date).getDate());
		//Past: less than new Date
		//Current: equals to new Date
		//Future: more than new Date
		if (
			(flightFilterRef.value === "past" && new Date(result[i].departureAirport.date).getDate() - new Date().getDate() < 0)
		|| (flightFilterRef.value === "ongoing" && new Date(result[i].departureAirport.date).getDate() - new Date().getDate() === 0)
		|| (flightFilterRef.value === "future" && new Date(result[i].departureAirport.date).getDate() - new Date().getDate() > 0)
		|| (flightFilterRef.value === "all") || (flightFilterRef.value === "")
	)
	{
		localStr += "<tr>";
		//Extract five information and a button:
		localStr += `<tr>
			<td class="mdl-data-table__cell--non-numeric">${result[i].flightID}</td>
      <td class="mdl-data-table__cell--non-numeric">${result[i].departureAirport.airport}</td>
      <td class="mdl-data-table__cell--non-numeric">${result[i].arrivalAirport.airport}</td>
      <td class="mdl-data-table__cell--non-numeric">${result[i].departureAirport.date} ${result[i].departureAirport.time}</td>
      <td class="mdl-data-table__cell--non-numeric">${result[i].dateTimeArrival.toLocaleDateString()} ${result[i].dateTimeArrival.toLocaleTimeString()}</td>
      <td class="mdl-data-table__cell--non-numeric">${result[i].arrivalWeather}</td>
      <td>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
          onclick="selectFlight(${result[i].flightID})"
        > Select
        </button>
      </td>
    </tr>`
    localStr += "</tr>";
  }
	}



  //console.log(localStr);
  //Output to fleetOutput
  flightsOutputRef.innerHTML = localStr;

}

//Function to sort webAPI data
function sortData(data)
{
	//First loop throught the data.airplanes
	for (let i =0; i< data.length-1;i++)
	{

		let key = flightSortRef.value;
		let dataCompare1 = data[i][key];
		let dataCompare2 = data[i+1][key];
		if (flightSortRef.value === "departureAirport" || flightSortRef.value === "arrivalAirport")
		{
			dataCompare1 = data[i][key].airport;
			dataCompare2 = data[i+1][key].airport;
		}
		else if (flightSortRef.value === "departureTime")
		{
			key = "departureAirport";
			dataCompare1 = new Date(data[i][key].date).getDate();
			dataCompare2 = data[i+1].dateTimeArrival.getDate();
		}
		//console.log(dataCompare1);
		//console.log("departureAirport.airport")
		//console.log(data.airplanes[i][fleetDetailSortRef.value]);
		if (flightSortRef.value === "")
		{
			continue;
		}
		//Change arrangements if this data is more than next data
		else if (dataCompare1 > dataCompare2)
		{
			let temp  = data[i];
			data[i] = data[i+1];
			data[i+1] = temp;
			i = -1;
		}
		else
		{
			continue;
		}
	}
	return data;
}

function selectFlight(index)
{
	//stores index
	localStorage.setItem("Flights_ID", index);
	window.location.href = "FlightInDetail.html";
}
