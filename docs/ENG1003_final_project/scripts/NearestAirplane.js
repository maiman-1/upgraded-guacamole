class Array
{
  constructor(array)
  {
    this._array = array;
  }

  addin(data) //Push new inputss
  {
    return this._array.push(data);
  }

  index(data)
  {
    return this._array[data];
  }

  howlong(data)
  {
    return this._array.length;
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

  fromData(dataObject)
  {
    this._type = dataObject._type;
    this._range = dataObject._range;
    this._airportdis = dataObject._airportdis;
    this._status =dataOvject._status;
    this._airline = dataObject._airline;
    this._id =dataObject._id;
    this._location = dataObject._location;
  }
}

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
// function to claculate distance between airprots
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

let alldis = [];
let allloc = [];

function wait()
{
  let a=1;
}

function planeLocation(data)
{
  // extract object created using user inputs
  let p1data = localStorage.getItem("dep1strg");
  let p1new = JSON.parse(p1data);
  let lat1 = Object.values(p1new)[4];
  let long1 = Object.values(p1new)[5];

  let lat2 = data.latitude;
  let long2 = data.longitude;
  let code = data.airportCode;
  let dis = Math.floor(distance(lat1,long1,lat2,long2));
  // pushing the distance data into alldis
  alldis.push(dis);
  // pushing the airport code data into allcode
  allloc.push(code);
  localStorage.setItem("unfilter1",JSON.stringify(alldis));
  localStorage.setItem("unfilter2",JSON.stringify(allloc));
}

let a1 = new Array([])

function sortingOut()
{
  // distance data
  let back1 = JSON.parse(localStorage.getItem("unfilter1"));
  // airport code data
  let back2 = JSON.parse(localStorage.getItem("unfilter2"));
  back1.splice(0,28);
  back2.splice(0,28);

  let fleetData = JSON.parse(localStorage.getItem("fleet"));
  let fleets = new Array();
  fleets.fromData(fleetData);
  // code to sort and arrange the values into ascending order
  for (let i = 0; i < back1.length - 1; i++)
    {
        // 2. Find index of smallest value between i and last item
        // min is the index of the lowest value we've seen in
        // remaining elements.
        let minIndex = i;
        // For each remaining element beyond i
        for (let j = i + 1; j < back1.length; j++)
        {
            // See if this value it lower than the value  at index min.
            if (back1[j] < back1[minIndex])
            {
                // If it is, make this the new min index.
                minIndex = j;
            }
        }
        // 3. If the index of the smallest value isn't i, swap element positions
        // If the lowest value was not already at index i
        if (minIndex !== i)
        {
            // Swap elements to put the lowest value at index i
            let temp = back1[i];
            back1[i] = back1[minIndex];
            back1[minIndex] = temp;

            let temp2 = back2[i];
            back2[i] = back2[minIndex];
            back2[minIndex] = temp2;
        }
        // Everything up to index i is now sorted, increment i.
    }
    // code that checks planes to see whether their plane range is capable of travelling the distance
    // extracts the first 5 planes that satisfies this condition
    for (let i = 0 ; i < back1.length ; i++)
    {
      for (let j = 0 ; j < fleets.howlong() ; j++)
      {
        if (fleets.index(j).location == back2[i])
        {
          if (fleets.index(j).range > back1[i])
          {
            for (let k = 0 ; k < 5 ; k++)
            {
              if (document.getElementById(`plane${k}`).innerHTML == "")
             {
               document.getElementById(`plane${k}`).innerHTML = fleets.index(j).type;
               document.getElementById(`range${k}`).innerHTML = fleets.index(j).range;
               document.getElementById(`dis${k}`).innerHTML = back1[i];
               document.getElementById(`stat${k}`).innerHTML = fleets.index(j).status;
               document.getElementById(`air${k}`).innerHTML = fleets.index(j).airline;
               document.getElementById(`id${k}`).innerHTML = fleets.index(j).id;
               document.getElementById(`loc${k}`).innerHTML = fleets.index(j).location;
               let type = fleets.index(j).type;
               let range = fleets.index(j).range;
               let airportdis = back1[i];
               let status = fleets.index(j).status;
               let airline = fleets.index(j).airline;
               let id = fleets.index(j).id;
               let location = fleets.index(j).location;
               let p1 = new NearestAirplane(type,range,airportdis,status,airline,id,location)
               a1.addin(p1);
               localStorage.setItem("NearestAirplane",JSON.stringify(a1))
              break
             }
            }
          }
        }
      }
    }


}

function buffer()
{
   let fleetData = JSON.parse(localStorage.getItem("fleet"));
   let fleets = new Array();
   fleets.fromData(fleetData);

   for( let i = 0 ; i < fleets.howlong() ; i++ )
   {
     let planeloc = fleets.index(i).location;
     let planerange = fleets.index(i).range;
     let url = "https://eng1003.monash/api/v1/airports/";
     // access api to retrieve the location of the planes from the data base
     let data = {
       code: `${planeloc}`,
       callback: "planeLocation"
     }
     webServiceRequest(url,data);
     planeLocation(data);
   }
}
// functio nto proceed to the next page 
function toArrivalMap() //Locate the location on the map
{
  window.location.href = "(3b)NearestAirplaneMap.html";
}
