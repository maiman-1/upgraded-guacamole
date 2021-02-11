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
  constructor(flightID) {
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
  get dateTimeDeparture(){
    return this._dateTimeDeparture;
  }
  get departureAirport(){
    return this._departureAirport;
  }
  get arrivalAirport(){
    return this._arrivalAirport;
  }
  get dateTimeArrival(){
    return this._dateTimeArrival;
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
  addWaypoint(waypointAriportClass)
  {
    this._waypointsAirport.push(waypointAriportClass);
  }
  //Method: Convert from localStorage
  fromData(data)
  {
    
  }
}

//Class for list of flights
class FlightList()
{
  constructor()
  {
    this._flights = [];
  }
  //AddFlight Function
  addFlight(flightClass)
  {
    this._flight.push(flightClass);
  }
  //Remove
  removeFlight(index){
		if (index > -1 && !isNaN(index) && index < this._flights.length)
		{
				this._flights.splice(index,1);
		}
	}
  //fromData
  fromData(data)
  {
    let localData = data._flights;
    for (let i=0;i<localData.length;i++)
    {
      let newFlight = new Flight();
      newFlight.fromData(localData[i]);
      this._flights.push(newFlight);
    }
  }
}
//Global FlightList instance
let FlightsStored = new FlightList;
