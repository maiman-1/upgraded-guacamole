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
// function for calculating distance between airports
function distance(lat1,lon1,lat2,lon2)
{
  const R = 6371e3;
    const p1 = lat1 * Math.PI/180; // φ, λ in radians
    const p2 = lat2 * Math.PI/180;
    const dp = (lat2-lat1) * Math.PI/180;
    const dl = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(dp/2) * Math.sin(dp/2) +
          Math.cos(p1) * Math.cos(p2) *
          Math.sin(dl/2) * Math.sin(dl/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = (R * c)/1000; // in metres
	  return d;
}
// same as flight details 1 and 2
function airplane(data)
{
  //console.log(data.airplanes);
  let planeString = "";
  let p1data = localStorage.getItem("dep1strg");
  let p1new = JSON.parse(p1data);
  let airportDepBCK = Object.values(p1new)[1];
  let coun1 = Object.values(p1new)[0];
  let lat1 = Object.values(p1new)[4];
  let long1 = Object.values(p1new)[5];

  let q1data = localStorage.getItem("arr1strg");
  let q1new = JSON.parse(q1data);
  let airportArrBCK = Object.values(q1new)[1];
  let coun2 = Object.values(q1new)[0];
  let lat2 = Object.values(q1new)[2];
  let long2 = Object.values(q1new)[3];

  let r1data = localStorage.getItem("waystr");
  let r1new = JSON.parse(r1data);
  //console.log(r1new);
  let airportWayBCK = Object.values(r1new)[1];
  let coun3 = Object.values(r1new)[0];
  let lat3 = Object.values(r1new)[2];
  let long3 = Object.values(r1new)[3];

  document.getElementById("departureAirport").innerHTML += `<b>${coun1}<b>`;
  document.getElementById("departureAirport").innerHTML += `(${airportDepBCK})`;
  document.getElementById("waypointAirport").innerHTML += `<b>${coun3}<b>`;
  document.getElementById("waypointAirport").innerHTML += `(${airportWayBCK})`;
  document.getElementById("arrivalAirport").innerHTML += `<b>${coun2}<b>`;
  document.getElementById("arrivalAirport").innerHTML += `(${airportArrBCK})`

  let typeArray = [];
  let rangeArray = [];
  let statusArray = [];
  let airlineArray = [];
  let idArray = [];

  for ( let i = 0 ; i < data.airplanes.length ; i++ )
  {
    if ( data.airplanes[i].location == airportDepBCK)
  	{
  		planerange = Number(data.airplanes[i].range);
  		let dis = distance(lat1,long1,lat3,long3)
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
  //console.log(idArray);
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
  if (planeString === "")
  {
    alert("No planes are able within range. Please add a waypoint")
  }
  document.getElementById("planeTable").innerHTML = planeString;
}
// same as flight details 1 and 2
function load()
{
  //Call flightLocal
  flightLocal = new Flight();
  console.log(JSON.parse(localStorage.getItem(FLIGHT_LOCAL)));
  flightLocal.fromData(JSON.parse(localStorage.getItem(FLIGHT_LOCAL)));
  //console.log(flightLocal);

  let url = "https://eng1003.monash/api/v1/planes/"
  let data = {
  	callback: `airplane`
  }
  webServiceRequest(url,data)
}
// same as flight details 1 and 2
function selectPlane(index)
{
  let fleetData = extractFleet();
  fleetData = fleetData.airplanes[index-1];
  //console.log(fleetData.location);
  let planeData = fleetData;
  //console.log(planeData);
  flightLocal.planeUsed = planeData;
  //Store

  localStorage.setItem(FLIGHT_LOCAL,JSON.stringify(flightLocal))
  alert(
    `Plane Chosen:
    Flight ID: ${index}
    Location: ${fleetData.location}`
  )

}

// functio nto proceed to waypoint map
function toWaypointMap()
{
  window.location.href = "(5)WaypointMap.html";
}


// if no plane is selected in the selectPlane function, return alert informing user that plane is not selected
// if plane is seleected proceed to flightconfirmation 
function confirmFlightButton()
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
