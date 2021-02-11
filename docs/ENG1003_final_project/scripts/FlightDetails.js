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

function airplanes(data)
{
  // extract user created object dep1strng
  let planeString = "";
  let p1data = localStorage.getItem("dep1strg");
  let p1new = JSON.parse(p1data);
  let airportBCK = Object.values(p1new)[1]; // extract airport value from object
  //console.log(airportBCK);
  // display the airport selected to user
  document.getElementById("airportchosen").innerHTML = airportBCK

  let typeArray = [];
  let rangeArray = [];
  let statusArray = [];
  let airlineArray = [];
  let idArray = [];
  // check through entire database of airplanes
  for ( let i = 0 ; i < data.airplanes.length ; i++)
  {
    // if the location of the airplane matches the user input
    if ( data.airplanes[i].location == airportBCK )
    {
      // push info of that plane into the array
      typeArray.push(data.airplanes[i].type);
      rangeArray.push(data.airplanes[i].range);
      statusArray.push(data.airplanes[i].status);
      airlineArray.push(data.airplanes[i].airline);
      idArray.push(data.airplanes[i].id);
    }
  }
  for ( let j = 0 ; j < typeArray.length ; j++)
  {
    // display array to user
    // plane info displayed on a table
    //console.log(idArray[j]);
    planeString += `<tr>
      <td class="mdl-data-table__cell--non-numeric">${typeArray[j]}</td>
      <td class="mdl-data-table__cell--non-numeric">${rangeArray[j]}</td>
      <td class="mdl-data-table__cell--non-numeric">${statusArray[j]}</td>
      <td class="mdl-data-table__cell--non-numeric">${airlineArray[j]}</td>
      <td class="mdl-data-table__cell--non-numeric">${idArray[j]}</td>
      <td>
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
          onclick="selectPlane(${idArray[j]})"
        > Select Plane
        <a>
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
  document.getElementById("planesRow").innerHTML = planeString;
}

function loading()
{
  //retrieves the user created object
  let p1data = localStorage.getItem("dep1strg");
  let p1new = JSON.parse(p1data);
  let airportBCK = Object.values(p1new)[1];
  // accesses api
  let url = "https://eng1003.monash/api/v1/planes/"
  let data = {
    callback: `airplanes`
  }
  webServiceRequest(url,data);
  //airplanes(data);
}

function toArrivalMap()
{
  //Check if storage at plane1str is empty
  // if it is not empty, proceed to arrival map
  let planeData = JSON.parse(localStorage.getItem("plane1str"))
  if ( planeData !== "" || planeData !== null || planeData !== undefined)
  {
    window.location.href = "(3)ArrivalMap.html";
  }
  else
  {
  }
}


//When selecting plane, the information stored in the airplanes id
let selectedIndex;
function selectPlane(index)
{
  selectedIndex = index;
  //Need to call back the API
  let p1data = localStorage.getItem("dep1strg");
  let p1new = JSON.parse(p1data);
  let airportBCK = Object.values(p1new)[1];

  let url = "https://eng1003.monash/api/v1/planes/"
  let data = {
    // new callback, stores flight info
    callback: `storeInfo`
  }
  webServiceRequest(url,data);
}
function storeInfo(data)
{
  // function for alert message once user selects plane
  //Call data.airplanes(index)
  //index is not brought forward from select plane
  //console.log(selectedIndex);
  //console.log(data.airplanes[selectedIndex-1]);
  //Store under departureFlight
    localStorage.setItem("plane1str",JSON.stringify(data.airplanes[selectedIndex-1]));
    alert(
      `Plane Selected:
      Flight ID: ${data.airplanes[selectedIndex-1].id}
      Flight Location: ${data.airplanes[selectedIndex-1].location}`
    )
}
