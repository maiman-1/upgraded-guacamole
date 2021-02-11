let flightLocal;

function webServiceRequest(url,data)
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);
}



function airplane(data)
{
  // extract user input info from dep1strng
  // dep1strng is a object created from user inputs
  //console.log(data.airplanes);
  let planeString = "";
  let p1data = localStorage.getItem("dep1strg");
  let p1new = JSON.parse(p1data);
  let coun1 = Object.values(p1new)[0];
  let airportDepBCK = Object.values(p1new)[1];
  let lat1 = Object.values(p1new)[4];
  let long1 = Object.values(p1new)[5];
  // extract user input info from arr1strng
  // arr1strng is a object created from user inputs
  let q1data = localStorage.getItem("arr1strg");
  let q1new = JSON.parse(q1data);
  let coun2 = Object.values(q1new)[0];
  let airportArrBCK = Object.values(q1new)[1];
  let lat2 = Object.values(q1new)[2];
  let long2 = Object.values(q1new)[3];
  // displaying departure and arriva country and airport to user
  document.getElementById("depairport").innerHTML += `<b>${coun1}<b>`;
  document.getElementById("depairport").innerHTML += airportDepBCK
  document.getElementById("arrairport").innerHTML += `<b>${coun2}<b>`;
  document.getElementById("arrairport").innerHTML += airportArrBCK

  let typeArray = [];
  let rangeArray = [];
  let statusArray = [];
  let airlineArray = [];
  let idArray = [];
  //console.log(flightLocal);
  for ( let i = 0 ; i < data.airplanes.length ; i++ )
  // same as flight details 1
  {
    if ( data.airplanes[i].location == airportDepBCK)
  	{
  		planerange = Number(data.airplanes[i].range);
  		let dis = distance(lat1,long1,lat2,long2);
      flightLocal.distance=dis;
      //console.log(flightLocal.distance);
  		{
  			if (planerange > dis)
  			{
          typeArray.push(data.airplanes[i].type);
          rangeArray.push(data.airplanes[i].range);
          statusArray.push(data.airplanes[i].status);
          airlineArray.push(data.airplanes[i].airline);
          idArray.push(data.airplanes[i].id);
  			}
  			else
  			{
  			}
  		}
  	}
  	else
  	{
  	}
  }

  for ( let j = 0 ; j < typeArray.length ; j++ )
  {
    planeString += `<tr>
      <td class="mdl-data-table__cell--non-numeric">${typeArray[j]}</td>
      <td class="mdl-data-table__cell--non-numeric">${rangeArray[j]}</td>
      <td class="mdl-data-table__cell--non-numeric">${statusArray[j]}</td>
      <td class="mdl-data-table__cell--non-numeric">${airlineArray[j]}</td>
      <td class="mdl-data-table__cell--non-numeric">${idArray[j]}</td>
      <td>
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored"
          onclick="selectPlane(${idArray[j]})"
        > Select
        </button>
      </td>
    </tr>`
    /*
    document.getElementById(`plane${j}`).innerHTML = typeArray[j];
    document.getElementById(`dis${j}`).innerHTML = rangeArray[j];
    document.getElementById(`stat${j}`).innerHTML = statusArray[j];
    document.getElementById(`air${j}`).innerHTML = airlineArray[j];
    document.getElementById(`id${j}`).innerHTML = idArray[j];
    */
  }
  // if planeString == "", meaning that the for loop above is not fulfilled, no info will be stored in the table. Hence, this means that there is no plane found
  if (planeString === "")
  {
    alert("No planes are able within range. Please add a waypoint")
  }
  document.getElementById("planeTable").innerHTML = planeString;
  //Store
  //console.log(flightLocal.distance);
  console.log(flightLocal.planeUsed === "")
  localStorage.setItem(FLIGHT_LOCAL,JSON.stringify(flightLocal))
  //console.log(flightLocal.distance);
}

function load()
{
  // retrieves info from local storage
  //Call flightLocal
  flightLocal = new Flight();
  flightLocal.fromData(JSON.parse(localStorage.getItem(FLIGHT_LOCAL)));
  //console.log(flightLocal);
  let p1data = localStorage.getItem("dep1strg");
  let p1new = JSON.parse(p1data);
  let airportDepBCK = Object.values(p1new)[1];

  let q1data = localStorage.getItem("arr1strg");
  //console.log(q1data);
  let q1new = JSON.parse(q1data);
  //console.log(q1new);
  let airportArrBCK = Object.values(q1new)[1];

  let url = "https://eng1003.monash/api/v1/planes/"
  let data = {
  	callback: `airplane`
  }
  webServiceRequest(url,data)
}
// function that runs when user selects on select plane button
function selectPlane(index)
{
  let fleetData = extractFleet();
  fleetData = fleetData.airplanes[index-1];

  //console.log(fleetData.location);
  // storing the plane selected by user into local storage
  let planeData = fleetData;
  flightLocal.planeUsed = planeData;
  //console.log(flightLocal);
  //Store
  localStorage.setItem(FLIGHT_LOCAL,JSON.stringify(flightLocal))
  alert(
    `Plane Chosen:
    Flight ID: ${index}
    Location: ${fleetData.location}`
  )
}


function toWaypointMap()
{
  window.location.href = "(5)WaypointMap.html";
}

function toConfirmationPage()
{
  //If no plane is chosen = planeUsed array is empty
  if (flightLocal.planeUsed === "")
  {
    alert("No plane is chosen! Please choose a plane first")
  }
  else {
    window.location.href = "(7)FlightConfirmation.html";
  }
}
