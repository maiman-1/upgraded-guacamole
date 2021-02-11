mapboxgl.accessToken = "pk.eyJ1IjoidGVhbTE1MGVuZzEwMDMyMDIwIiwiYSI6ImNrYWZoaDE1bDBjdW8yenBudXlydzIzYnMifQ.WAVRhd7rN1W0XAjuMK-5fw";
const DARKSKY_KEY = "pk.eyJ1IjoidGVhbTE1MGVuZzEwMDMyMDIwIiwiYSI6ImNrYWZoaDE1bDBjdW8yenBudXlydzIzYnMifQ.WAVRhd7rN1W0XAjuMK-5fw";
const AQI_WEB_URL = "https://eng1003.monash/api/v1/planes/";

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [145.045258, -37.877219],
    zoom: 2
});

//Check first if localStorage is empty or not
let a = localStorage.getItem(FLEET_KEY);
//console.log(a);
if (a===null||a===undefined||a==="")
{
  //All fleets extracted and stored in FLEET_KEY
  window.addEventListener("load", getAirplanesData);
}

//console.log("loaded");
//Function: getAQIData ->Make request to server
function getAirplanesData()
{
  //console.log("Called!");
	//Retrieve information from cityName ref
	let cityNameRef = document.getElementById("cityName");
	//Use value as input for URL
  //https://eng1003.monash/api/v1/planes/?callback=processPlaneData
	let webURL = AQI_WEB_URL + "?callback=processData";
  //console.log(webURL);

	//Call web service by adding script element
	let script = document.createElement("script");
	script.src = webURL;
	document.body.appendChild(script);
}

//Function:  processData -> Take data processed and output it in output
function  processData(result)
{
  //Store result in localStorage. key = above
  localStorage.setItem(FLEET_KEY, JSON.stringify(result));
  console.log("Call");
}
