flightsStored.fromData(getDataLocalStorage());
let index = localStorage.getItem("Flights_ID");
//console.log(index);
//Call flightLocal
let flightLocal = flightsStored.getFlight(index);
//console.log(flightLocal);

let tbodyStr = "";
//console.log(flightLocal.departureAirport.date);
//Simple loopthrough function

function looopThrough(data)
{
  //if string//number ouput

  let output = ""
  if (typeof data === "string" || typeof data === "number")
  {
    output += data + "<br>";
  }
  //if array loop through and recall for each/
  else if (Array.isArray(data))
  {
    for (let i = 0; i < data.length; i++)
    {
      output += looopThrough(data[i]);
    }
  }
  else if (typeof data === "object")
  {
    for (let key in data)
    {
      output += key + "<br>";
      output += looopThrough(data[key]);
    }
  }
  return output
}

//Flight Number
document.getElementById('fligthID').innerHTML = `${flightLocal.flightID}`;
//DepartureInfo
document.getElementById('departInfo').innerHTML = `${flightLocal.departureAirport.country} (${flightLocal.departureAirport.airport})`;
//Arrival Info
document.getElementById('arrivalInfo').innerHTML = `${flightLocal.arrivalAirport.country} (${flightLocal.arrivalAirport.airport})`;
//Waypoint Loop through each
let waypointsStr= "";
for (let i =0 ;i< flightLocal.waypointsAirport.length; i++)
{
  waypointsStr += `${flightLocal.getWaypoint(i).country} (${flightLocal.getWaypoint(i).airport}) <br>`;
}
document.getElementById('waypoints').innerHTML = waypointsStr;
document.getElementById('dateDeparture').innerHTML = `${flightLocal.departureAirport.date}`;
document.getElementById('timeDeparture').innerHTML = `${flightLocal.departureAirport.time}`;


//Calculate + store time of arrival. Estimate spending one day at waypoint
let dateTimeDeparture = new Date(flightLocal.departureAirport.date + " " + flightLocal.departureAirport.time);
let dateTimeArrival = new Date(flightLocal.departureAirport.date);
//console.log(dateDeparture);
for (let i = 0; i < flightLocal.waypointsAirport.length; i++)
{
  dateTimeArrival.setDate(dateTimeDeparture.getDate() + 1);
  //console.log("ran!");
}
//For last day, add distance/avgspeed
let timeTravel = flightLocal.distance/flightLocal.planeUsed.avgSpeed;
//console.log(flightLocal.departureAirport.long);
dateTimeArrival.setHours(dateTimeDeparture.getHours() + timeTravel + 1);
flightLocal.dateTimeArrival=dateTimeArrival;
//console.log(dateTimeArrival.getDate() - new Date().getDate() <= 7);
localStorage.setItem(FLIGHT_LOCAL,JSON.stringify(flightLocal));
document.getElementById('timeArrival').innerHTML = `${dateTimeArrival.toLocaleDateString()},(${dateTimeArrival.toLocaleTimeString()})`;

//Retrive and store arrival weather info (daily)
const WEATHER_KEY = "ac07b05e8d5052b4527ace3513d74629";
const AQI_WEB_URL = "https://eng1003.monash/api/v1/darksky/";
const USERNAME = "msha0046"



window.addEventListener("load", callFunction);

function callFunction()
{
  if (flightLocal.arrivalWeather !== "")
  {
    document.getElementById("weatherArrival").innerHTML = flightLocal.arrivalWeather;
  }
  else {
    getWeatherData();
  }
}

//console.log("loaded");
//Function: getAQIData ->Make request to server
function getWeatherData()
{
  //console.log("Called!");
	//Use value as input for URL
  //?u=USERNAME&key=KEY&lat=LAT&lng=LNG&callback=functionName
  //Usernaeme, key, listed up. lat,lng optained from flightLocal, time is timeTravel
  let lat = flightLocal.departureAirport.lat;
  let lng = flightLocal.departureAirport.long;

  //console.log(time);
	let webURL = AQI_WEB_URL + "?u=" + encodeURIComponent(USERNAME) +
  "&key=" + encodeURIComponent(WEATHER_KEY) + "&lat=" + encodeURIComponent(lat)
  + "&lng=" + encodeURIComponent(lng) + "&exclude=currently,minutely,hourly" +"&callback=processData";
  //console.log(webURL);

  //Only call if the dateTime is within one week:
  if (dateTimeArrival.getDate() - new Date().getDate() <= 7 && dateTimeArrival - new Date().getDate() >= 0)
  {
    //Call web service by adding script element
  	let script = document.createElement("script");
  	script.src = webURL;
  	document.body.appendChild(script);
  }
  //else
  // set to be announced
  else {
    document.getElementById("weatherArrival").innerHTML = "TO BE ANNOUNCED";
  }
}

//Function:  processData -> Take data processed and output it in output
function  processData(result)
{
  let time = dateTimeArrival.getTime();
  console.log(result);
  //Interested detail = result.daily.data[index]
  let weatherDaily  = result.daily.data;
  let weatherSummary = "";
  let dayIndex = 0;

  for (let i = 0; i < weatherDaily.length-1; i++)
  {
    //Find most suitable index: Where time > this one and less than next one
    if (time > weatherDaily[i].time && time )
    {
      dayIndex = i;
    }
  }
  //console.log("Call");
  //extract weather summary
  weatherSummary = weatherDaily[dayIndex].summary;
  //console.log(weatherSummary);
  //Store weatherSummary in localStorage. flightLocal
  flightLocal.arrivalWeather = weatherSummary;
  console.log(flightLocal);
  localStorage.setItem(FLIGHT_LOCAL,JSON.stringify(flightLocal));
  document.getElementById("weatherArrival").innerHTML = weatherSummary;
}
