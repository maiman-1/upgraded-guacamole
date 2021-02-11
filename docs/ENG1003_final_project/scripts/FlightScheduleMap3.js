mapboxgl.accessToken = "pk.eyJ1IjoidGVhbTE1MGVuZzEwMDMyMDIwIiwiYSI6ImNrYWZoaDE1bDBjdW8yenBudXlydzIzYnMifQ.WAVRhd7rN1W0XAjuMK-5fw";
const DARKSKY_KEY = "pk.eyJ1IjoidGVhbTE1MGVuZzEwMDMyMDIwIiwiYSI6ImNrYWZoaDE1bDBjdW8yenBudXlydzIzYnMifQ.WAVRhd7rN1W0XAjuMK-5fw";
//Retrieve flightLocal
let flightLocal = new Flight();
flightLocal.fromData(JSON.parse(localStorage.getItem(FLIGHT_LOCAL)));

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [145.045258, -37.877219],
    zoom: 2
});
console.log(flightLocal);


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
// same as flight schedule map 1 and 2

function countryzoom()
{
  let countryRef = document.getElementById("country");
  let countryValue = countryRef.value;
  let url = "https://eng1003.monash/api/v1/airports/";
  let data ={
    country: `${countryValue}`,
    callback: `airportCallBack`
  }
  webServiceRequest(url,data);
  airportCallBack(data);
}

let arrivallat = "";
let arrivallong = "";
// same as flight schedule map 1 and 2

function countryAirportMatch()
{
  if (document.getElementById("timedelay").innerHTML == 0)
  {
    return alert('Airport code must from the country selected!');
  }
  else
  {
      let countryValue = document.getElementById("country").value;
      let airportValue = document.getElementById("airport").value;


      let q1 = new WaypointAirport(countryValue,airportValue,arrivallat,arrivallong)
      localStorage.setItem("waystr",JSON.stringify(q1))
      flightLocal.addWaypoint(q1);
      localStorage.setItem(FLIGHT_LOCAL,JSON.stringify(flightLocal))
      let p1 = JSON.parse(localStorage.getItem("dep1strg"));
      let pq1 = new DepartureArrival(p1,q1);
      localStorage.setItem("pq1",pq1);
      window.location.href = "(6)WaypointDetails.html";
  }
}
// same as flight schedule map 1 and 2

function airports(data)
{
	let airportfound = [];
	for (let i = 0 ; i < data.length ; i++)
	{
		if (data[i].airportCode == document.getElementById("airport").value)
		{
			airportfound.push(data[i].airportCode);
      arrivallat = data[i].latitude;
      arrivallong = data[i].longitude;
		}
		else if (data[i].airportCode !== document.getElementById("airport").value)
		{
		}
	}
  document.getElementById("timedelay").innerHTML = airportfound.length
	setTimeout(countryAirportMatch,2000)
}
// same as flight schedule map 1 and 2

function checkCountryAndAirport()
{
	let countryRef = document.getElementById("country");
	let airportRef = document.getElementById("airport");

  let countryValue = countryRef.value;
  let airportValue = airportRef.value;

  let url =  "https://eng1003.monash/api/v1/airports/";
	let data={
		country: `${countryValue}`,
		callback: "airports"
	}
	webServiceRequest(url,data);
	airports(data);
}
