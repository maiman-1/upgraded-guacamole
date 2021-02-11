mapboxgl.accessToken = "pk.eyJ1IjoibWFpbWFuIiwiYSI6ImNrN2l0bWJsNTBvb2czbWxsdHBib2x0bzEifQ.eAbwAhg_d-Kp4GEPY9kc8g";

//Token to access web service
const TOKEN = "e44bd015357535b0b2d12666f79cddacf52f638f";
//Web service url
const AQI_WEB_URL = "https://api.waqi.info/";


//Variable for storing location
let currentLocation;
let mapBound;
let map;
//Obtained from https://www.tutorialspoint.com/html5/geolocation_getcurrentposition.htm
function getLocation()
{
if(navigator.geolocation)
{
  // timeout at 60000 milliseconds (60 seconds)
  var options =
  {
    timeout:60000
  };
  navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
}
else
  {
    alert("Sorry, browser does not support geolocation!");
  }
}

//showLocation function
function showLocation(data)
{
  //When successfully obtain coordinates
  //console.log(data.coords);
  //Assign to currentLocation variable
  currentLocation = data.coords;
  //console.log(currentLocation);

  //Define map
  map = new  mapboxgl.Map({
    container: 'map',
    center: [ currentLocation.longitude,currentLocation.latitude],
    zoom: 12,
    style: 'mapbox://styles/mapbox/streets-v9'
  });

  //store map boundary
  mapBound = map.getBounds();
  //console.log(mapBound);

  getAQIData();
  map.on('zoom', handleZoom);
}
function errorHandler(errorData)
{
  alert("Error!" + errorData);
}

//Function: getAQIData ->Make request to server
function getAQIData()
{
  //console.log(mapBound._sw);
  //Format: /map/bounds/?token=:token&latlng=:latlng
  //Example: https://api.waqi.info/map/bounds/?latlng=48.639956,1.761273,49.159944,1.761273&token=e44bd015357535b0b2d12666f79cddacf52f638f
	//Retrieve information from cityName ref
	//Use value as input for URL
	let webURL = AQI_WEB_URL +"map/bounds/?token=" + encodeURIComponent(TOKEN) +
  "&latlng=" + encodeURIComponent(mapBound._sw.lat) + "," + encodeURIComponent(mapBound._sw.lng) + "," +
  encodeURIComponent(mapBound._ne.lat) + ","  + encodeURIComponent(mapBound._ne.lng) +
  "&callback=processData";
  //console.log(
  //  `${AQI_WEB_URL}map/bounds/?token=${encodeURIComponent(TOKEN)}&latlng=${encodeURIComponent(mapBound._sw.lat)},${encodeURIComponent(mapBound._sw.lng)},${encodeURIComponent(mapBound._ne.lat)},${encodeURIComponent(mapBound._ne.lng)}`);

	//Call web service by adding script element
	let script = document.createElement("script");
	script.src = webURL;
	document.body.appendChild(script);
}

function processData(result)
{
  //contains lat+lon+station.name+aqi (interested data only)
  let extract = result.data;
  //console.log(result.data);
  //From q4
  if (result.status === "ok")
	{
    for (let i = 0; i < extract.length; i++)
    {
    	let location = [extract[i].lon, extract[i].lat];
      //console.log(location.description.includes("Congestion"));
      let color = "#FFFFFF"
      if (extract[i].aqi >= 0 && extract[i].aqi <= 50)
      {
        color = "#00FF00" //green
      }
      else if (extract[i].aqi >= 51 && extract[i].aqi <= 100)
      {
        color = "#FFFF00"//yellow
      }
      else if (extract[i].aqi >= 101 && extract[i].aqi <= 150)
      {
        color = "#FFA500"//orange
      }
      else if (extract[i].aqi >= 151 && extract[i].aqi <= 200)
      {
        color = "#FF0000";//Red
      }
      else if (extract[i].aqi >= 201 && extract[i].aqi <= 300)
      {
        color = "#6A0DAD";//Purple
      }
      else if (extract[i].aqi >= 301 && extract[i].aqi <= 500)
      {
        color = "#800000";//Purple
      }
      console.log(color);
    	let marker = new mapboxgl.Marker({ "color": color });
    	marker.setLngLat(location);

    	let popup = new mapboxgl.Popup({ offset: 15});
    	popup.setText(extract[i].station.name + " AQI: " + extract[i].aqi);

    	marker.setPopup(popup)

    	// Display the marker.
    	marker.addTo(map);

    	// Display the popup.
    	popup.addTo(map);
    }
  }
  else if (result.status === "error")
	{
    setTimeout(function() { alert("Error! Cause: " + result.data); }, 600000);
	}
}

function handleZoom()
{
  //recalculate mapBound and then retrieve
  //store map boundary
  mapBound = map.getBounds();
  //console.log(mapBound);

  getAQIData();
}
