class Array
{
  constructor(array)
  {
    this._array = array;
  }

  addin(data)
  {
    return this._array.push(data);
  }

  index(data)
  {
    return this._array[data];
  }

  howlong()
  {
    return this._array.length
  }

  fromData(dataObject)
  {
    let data = dataObject._array;
    this._array = [];
    for (let i = 0 ; i < data.length ; i++)
    {
      let fleet = new AllFleets();
      fleet.fromData(data[i]);
      this._array.push(fleet);
    }
  }

  fromData2(dataObject)
  {
    let data = dataObject._array;
    this._array = [];
    for (let i = 0 ; i < data.length ;i++)
    {
      let fleet = new NearestAirplane();
      fleet.fromData(data[i]);
      this._array.push(fleet);
    }
  }
}

class AllFleets
{
  constructor(id,registration,location,range,avgSpeed,type,status,airline)
  {
    this._id =id;
    this._registration = registration;
    this._location = location;
    this._range = range;
    this._avgSpeed = avgSpeed;
    this._type = type;
    this._status = status;
    this._airline = airline;
  }

  get id() {return this._id;}
  get registration() {return this._registration;}
  get location() {return this._location;}
  get range() {return this._range;}
  get avgSpeed() {return this._avgSpeed;}
  get type() {return this._type;}
  get status() {return this._status;}
  get airline() {return this._airline;}

  set status(data) {return this._status = data;}

  fromData(dataObject)
  {
    this._id =dataObject._id;
    this._registration = dataObject._registration;
    this._location = dataObject._location;
    this._range = dataObject._range;
    this._avgSpeed = dataObject._avgSpeed;
    this._type = dataObject._type;
    this._status = dataObject._status;
    this._airline = dataObject._airline;
  }
}

class NearestAirplane
{
  constructor(type,range,airportdis,status,airline,id,location)
  {
    this._type = type;
    this._range = range;
    this._airportdis = airportdis;
    this._status = status;
    this._airline = airline;
    this._id = id;
    this._location = location;
  }

  get type() {return this._type;}
  get range() {return this._range;}
  get airportdis() {return this._airportdis;}
  get status() {return this._status;}
  get airline() {return this._airline;}
  get id() {return this._id;}
  get location() {return this._location;}

  fromData(dataObject)
  {
    this._type = dataObject._type;
    this._range = dataObject._range;
    this._airportdis = dataObject._airportdis;
    this._status =dataObject._status;
    this._airline = dataObject._airline;
    this._id =dataObject._id;
    this._location = dataObject._location;
  }
}

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

function load()
{
  // retrieve data of nearest airplanes
  let p1data = JSON.parse(localStorage.getItem("NearestAirplane"));
  let newp1  = new Array([]);
  newp1.fromData2(p1data);
  // retrieve data of user input objects
  let dep = JSON.parse(localStorage.getItem("dep1strg"));
  let arr = JSON.parse(localStorage.getItem("arr1strg"));
  // displaying to user the departure and arrival coutnry nad airport
  document.getElementById("dep").innerHTML += `<br>${Object.values(dep)[0]}<br>`;
  document.getElementById("dep").innerHTML += Object.values(dep)[1];
  document.getElementById("arr").innerHTML += `<br>${Object.values(arr)[0]}<br>`;
  document.getElementById("arr").innerHTML += Object.values(arr)[1];

  for ( let i = 0 ; i < newp1.howlong() ; i++)
  {
    // assigning each variable with the info of the plane - range lat long distance etc
    let range = newp1.index(i).range;
    let deplat = Object.values(dep)[4];
    let deplong = Object.values(dep)[5];
    let arrlat = Object.values(arr)[2];
    let arrlong = Object.values(arr)[3];
    let d = distance(Number(deplat),Number(deplong),Number(arrlat),Number(arrlong));
    if (range > d)
    {
      for (let j = 0 ; j < 10 ; j++)
      {
        // function will only run if is a string (string means that the vvariable is emptty )
        if (document.getElementById(`plane${j}`).innerHTML == "")
        {
          // displaying to the user the plane details and allowing them to select
          document.getElementById(`plane${j}`).innerHTML = newp1.index(i).type;
          document.getElementById(`dis${j}`).innerHTML = newp1.index(i).range;
          document.getElementById(`airdis${j}`).innerHTML = newp1.index(i).airportdis;
          document.getElementById(`stat${j}`).innerHTML = newp1.index(i).status;
          document.getElementById(`air${j}`).innerHTML = newp1.index(i).airline;
          document.getElementById(`id${j}`).innerHTML = newp1.index(i).id;
          document.getElementById(`loc${j}`).innerHTML = newp1.index(i).location;
          break
        }
      }
    }
  }
}
