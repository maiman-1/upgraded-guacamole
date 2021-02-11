mapboxgl.accessToken = "pk.eyJ1IjoidGVhbTE1MGVuZzEwMDMyMDIwIiwiYSI6ImNrYWZoaDE1bDBjdW8yenBudXlydzIzYnMifQ.WAVRhd7rN1W0XAjuMK-5fw";
const DARKSKY_KEY = "pk.eyJ1IjoidGVhbTE1MGVuZzEwMDMyMDIwIiwiYSI6ImNrYWZoaDE1bDBjdW8yenBudXlydzIzYnMifQ.WAVRhd7rN1W0XAjuMK-5fw";
flightsStored.addFlight();
//Update localStorage at confirmation page
let flightLocal = flightsStored.getFlight(flightsStored.count-1);
//console.log( flightLocal);
//Store in flight_local
localStorage.removeItem(FLIGHT_LOCAL);

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [145.045258, -37.877219],
    zoom: 2
});


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

// function to create popups on the map.
// reference : https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
function airportCallBack(data)
{
  for ( let i = 0 ; i < data.length ; i++)
  {
    let coordinates = [Number(data[i].longitude),Number(data[i].latitude)];
    let description = data[i].airportCode;
    let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
    marker.setLngLat(coordinates);

    let popup = new mapboxgl.Popup({ offset: 45});
    popup.setText(description);

    marker.setPopup(popup)

    // Display the marker.
    marker.addTo(map);

    // Display the popup.
    popup.addTo(map);
  }
  map.panTo([Number(data[0].longitude), Number(data[0].latitude)]);
}

function countryzoom()
{
  // retrieves user input value for country
  let countryRef = document.getElementById("country");
  let countryValue = countryRef.value;
  let url = "https://eng1003.monash/api/v1/airports/";
  // access api to find airports matching the user input country value
  let data ={
    country: `${countryValue}`,
    callback: `airportCallBack`
  }
  webServiceRequest(url,data);
  airportCallBack(data);
}

let departurelat = "";
let departurelong = "";
// function runs when view airport details is selected

function countryAirportMatch()
{
  // checking if timedelay is == 0, if it is, return alert that airport code is invalid. timedelay will be mentioned below
  if (document.getElementById("timedelay").innerHTML == 0)
  {
    return alert('Airport code must from the country selected!');
  }
  else
  {
    // if timedelay is more than 0
    // the user input values will be extracted
      //Search fleetDetail for planes at airport
      let allFleet = extractFleet();
      let countryValue = document.getElementById("country").value;
      let airportValue = document.getElementById("airport").value;
      let dateValue = document.getElementById("date").value;
      let timeValue = document.getElementById("time").value;
      //console.log(allFleet.airplanes[0].location);
      //Find fleet with location. store index
      let indices = [];
      // checkign through entire database of allfleet
      for (let a = 0; a < allFleet.airplanes.length;a++)
      {
        // if plane in allfleet matches the airpot value that user has input,
        if(allFleet.airplanes[a].location === airportValue)
        {
          // push a number into indices array
          indices.push(a);
        }
      }
      //console.log(indices.length === 0);
      // if indices above is an array and its lengthi s more than 0, this means that an airplane at the location matching the user input airprot value is found
      if (Array.isArray(indices) && indices.length > 0)
      {
        // if matching plane is found, that means the flight can be successful
        // create a object of user input values for departure airport
        let p1 = new DepartureAirport(countryValue,airportValue,dateValue,timeValue,departurelat,departurelong);
        localStorage.setItem("dep1strg",JSON.stringify(p1))
        flightLocal.departureAirport = p1;
        //console.log(flightLocal);
        // store this object as a string into the local storage
        localStorage.setItem(FLIGHT_LOCAL,JSON.stringify(flightLocal))
        //console.log("Working!");
        // move on to the next page
        window.location.href = "(2)DepartureDetails.html";
      }
      // if indices length is == 0 , airplane at location matching user input airport value is not found
      // inform user to choose nearest airplane option
      else if (Array.isArray(indices) && indices.length === 0)
      {
        alert("No airplanes available! Choose nearest Airplanes option.")
      }

  }
}

function airports(data)
{
	let airportfound = [];
  // run through entire database of planes
	for (let i = 0 ; i < data.length ; i++)
	{
    // if airport code in database matches user input airport,
		if (data[i].airportCode == document.getElementById("airport").value)
		{
      // push the airport into airportFound and extract the repective latitude and longitude values
			airportfound.push(data[i].airportCode);
      departurelat = data[i].latitude;
      departurelong = data[i].longitude;
		}
    // if not, nothing will occur
		else if (data[i].airportCode !== document.getElementById("airport").value)
		{
		}
	}
  // equating timedelay == airportfound length.
  // airport found length usually is 1
  // if time delay is not more than 0, this means that there is no airport found.
  document.getElementById("timedelay").innerHTML = airportfound.length;
	setTimeout(countryAirportMatch,2000)
}

function checkCountryAndAirport()
{
  // extract the user input vvalues
	let countryRef = document.getElementById("country");
	let airportRef = document.getElementById("airport");
  let dateRef = document.getElementById("date");
  let timeRef = document.getElementById("time");

  let countryValue = countryRef.value;
  let airportValue = airportRef.value;
  let dateValue = dateRef.value;
  let timeValue = timeRef.value;
  // access api to return the airports according to the country value user has input
  let url =  "https://eng1003.monash/api/v1/airports/";
	let data={
		country: `${countryValue}`,
		callback: "airports"
	}
	webServiceRequest(url,data);
	airports(data);
}
// same as checkcountryandAiport but this is for nearest airplanes page
function nearestAirplanes()
{
	let countryRef = document.getElementById("country");
	let airportRef = document.getElementById("airport");
  let dateRef = document.getElementById("date");
  let timeRef = document.getElementById("time");

  let countryValue = countryRef.value;
  let airportValue = airportRef.value;
  let dateValue = dateRef.value;
  let timeValue = timeRef.value;
  let url =  "https://eng1003.monash/api/v1/airports/";
	let data={
		country: `${countryValue}`,
		callback: "airports2"
	}
	webServiceRequest(url,data);
	airports2(data);
}
// same as above
function airports2(data)
{
	let airportfound = [];
	for (let i = 0 ; i < data.length ; i++)
	{
		if (data[i].airportCode == document.getElementById("airport").value)
		{
			airportfound.push(data[i].airportCode);
      departurelat = data[i].latitude;
      departurelong = data[i].longitude;
		}
		else if (data[i].airportCode !== document.getElementById("airport").value)
		{
		}
	}
  document.getElementById("timedelay").innerHTML = airportfound.length;
	setTimeout(countryAirportMatch2,2000)
}
// same as above
function countryAirportMatch2()
{
  if (document.getElementById("timedelay").innerHTML == 0)
  {
    return alert('Airport code must from the country selected!');
  }
  else
  {
      let countryValue = document.getElementById("country").value;
      let airportValue = document.getElementById("airport").value;
      let dateValue = document.getElementById("date").value;
      let timeValue = document.getElementById("time").value;
      let p1 = new DepartureAirport(countryValue,airportValue,dateValue,timeValue,departurelat,departurelong)
      localStorage.setItem("dep1strg",JSON.stringify(p1))
      flightLocal.departureAirport = p1;
      //console.log(flightLocal);
      localStorage.setItem(FLIGHT_LOCAL,JSON.stringify(flightLocal))
      window.location.href = "(2b)NearestAirplane.html";

  }
}

function toWaypointMap()
{
  window.location.href = "(5)WaypointMap.html";
}
