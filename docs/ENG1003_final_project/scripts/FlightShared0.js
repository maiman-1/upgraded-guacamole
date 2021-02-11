class DepartureAirport
{
  constructor(country,airport,date,time,lat,long)
  {
    this._country = country;
    this._airport = airport;
    this._date = date;
    this._time = time;
    this._lat = lat;
    this._long = long;
  }

  fromData(dataObject)
  {
    this._country = dataObject._country;
    this._aiprort = dataObject._airport;
    this._date = dataObject._date;
    this._time = dataObject._time;
    this._lat = dataObject._lat;
    this._long = dataObject._long;
  }
}

class ArrivalAirport
{
  constructor(country,airport,lat,long)
  {
    this._country = country;
    this._airport = airport;
    this._lat = lat;
    this._long = long;
  }
  fromData(dataObject)
  {
    this._country = dataObject._country;
    this._aiprort = dataObject._airport;
    this._lat = dataObject._lat;
    this._long = dataObject._long;
  }
}


class DepartureArrival
{
  constructor(departure,arrival)
  {
    this._departure = departure;
    this._arrival = arrival;
  }
}

class WaypointAirport
{
  constructor(country,airport,date,time,lat,long)
  {
    this._country = country;
    this._airport = airport;
    this._date = date;
    this._time = time;
    this._lat = lat;
    this._long = long;
  }

  fromData(dataObject)
  {
    this._country = dataObject._country;
    this._aiprort = dataObject._airport;
    this._date = dataObject._date;
    this._time = dataObject._time;
    this._lat = dataObject._lat;
    this._long = dataObject._long;
  }
}
/*
FLightInfor class:
Contains:
flightID: StringNUmber
dateTimeDeparture: Contains time and date of departure
dateTimeArrivaal: Contains calculated time and date of dateTimeDeparture
waypointsAirport: Array of airports as waypoints
departureAirport: Class with lots of information already
arrivalAirport: Airport of arrival
arrivalWeather
distance
planeUsed
onGoing
*/
class Flight {
  constructor(flightID="") {
    this._flightID = flightID;
    this._departureAirport = departureAirport;
    this._arrivalAirport = "";
    this._arrivalWeather = "";
    this._planeUsed = [];
    this._distance = 0;
    this._dateTimeArrival = 0;
    this._waypointsAirport = [];
    this._onGoing = false;
  }

  //getters (needed for flightID, departureAirport, arrivalAirport, dateTimeDeparture, dateTimeArrival, arrivalWeather)
  get flightID()
  {
    return this._flightID;
  }
  get departureAirport(){
    return this._departureAirport;
  }
  get arrivalAirport(){
    return this._arrivalAirport;
  }
  get arrivalWeather(){
    return this._arrivalWeather;
  }
  get distance(){
    return this._distance;
  }
  get planeUsed(){
    return this._planeUsed;
  }
  get waypointsAirport(){
    return this._waypointsAirport;
  }

  //Setters: arrivalAirport
  set departureAirport(departureAirportClass)
  {
    this._departureAirport = arrivalAirportClass;
  }
  set arrivalAirport(arrivalAirportClass)
  {
    this._arrivalAirport = arrivalAirportClass;
  }

  //Method: Add planeUsed
  addPlane(newPlane){
    this._planeUsed.push(newPlane);
  }
  //Method: Convert from localStorage
  fromData(data)
  {
    this._flightID = data._flightID;
    let departAir = new DepartureAirport();
    this._departureAirport = departAir.fromData(data._departureAirport);
    let arrAir = new ArrivalAirport();
    this._arrivalAirport = arrAir.fromData(data._arrivalAirport);
    this._arrivalWeather = data._arrivalWeather;
    for (let i = 0; i < data._planeUsed.length;i++)
    {
      this._planeUsed.push(data._planeUsed);
    }
    for (let j = 0; j < data._waypointsAirport.length; j++)
    {
      //TO BE ADDED BASED ON WAYPOINTS
      //Waypoints is class similar to arrivalAirport
      let newWaypoint = new WaypointAirport();
      newWaypoint.fromData()
    }
  }
}

//Class for list of flights
class FlightList {
  constructor()
  {
    this._flights = [];
  }

  get count()
  {
    return this._flights.length;
  }
  //AddFlight Function
  addFlight()
  {
    let newFlight = new Flight(this.count);
    this._flight.push(newFlight);
  }
  //Remove
  removeFlight(index){
		if (index > -1 && !isNaN(index) && index < this._flights.length)
		{
				this._flights.splice(index,1);
		}
    getFlight(index)
    {
      return this._flights[index];
    }

	}
  //fromData
  fromData(data)
  {
    let localData = data._flights;
    this._flights = [];
    for (let i=0; i < localData.length; i++)
    {
      let newFlight = new Flight(i);
      newFlight.fromData(localData[i]);
      this._flights.push(newFlight);
    }
  }
}


//Global FlightList instance
let FlightsStored = new FlightList();
//console.log("Working");
//global key const for FlightsStored
const FLIGHTS_KEY = "flights_Stored";
const FLEET_KEY = "fleet_storage";

//Check if localStorage for flights is empty
function checkIfDataExistsLocalStorage(){
	//checks if data exists (if null) or undefined or blank string
	let retrievedData = localStorage.getItem(FLIGHTS_KEY);
	if (retrievedData === null || retrievedData === undefined || retrievedData === "")
	{
		return false;
	}else
	{
		return true;
	}
}

// TODO: Write the function updateLocalStorage
/*
function updatelocalStorage
updatelocalStorage(data)
--INPUT--
- data: data extracted from localStorage
--OUTPUT--
- NONE-

-store new data into the key
*/

function updateLocalStorage(data){
	//Stringify data
	data = JSON.stringify(data);
	//Store item
	localStorage.setItem(FLIGHTS_KEY, data);
}

function getDataLocalStorage(){
	//Key is FLIGHTS_KEY
	//1. getItem retrieves data from key
	//2. Data is parsed to turn into object
	//Step 3 is outside function in next TO-DO
	//3. Data is turned into class instance of lockerList (Using global var)
	return JSON.parse(localStorage.getItem(FLIGHTS_KEY));
}

//Extract fleet Information
function extractFleet()
{
  let fleetsList = JSON.parse(localStorage.getItem(FLEET_KEY));
  return fleetsList;
}

//When running:
if (checkIfDataExistsLocalStorage()){
	let retrieved = getDataLocalStorage();
	FlightsStored.fromData(retrieved);
}
