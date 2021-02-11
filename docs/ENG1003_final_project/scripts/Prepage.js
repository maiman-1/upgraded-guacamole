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

function allAirplane(data)
{
  let allfleets = new Array([]);
  for ( let i = 0 ; i < data.airplanes.length ; i++ )
  {
  	allfleets.addin(new AllFleets(data.airplanes[i].id,data.airplanes[i].registration,data.airplanes[i].location,data.airplanes[i].range,data.airplanes[i].avgSpeed,data.airplanes[i].type,data.airplanes[i].status,data.airplanes[i].airline));
  }
  localStorage.setItem("fleet",JSON.stringify(allfleets));
}

function buffer()
{
  if ( localStorage.getItem("fleet") == undefined )
  {
    let url = "https://eng1003.monash/api/v1/planes/";
    let data = {
      callback: "allAirplane"
    }
    webServiceRequest(url,data);
    allAirplane(data);
  }
  else
  {
  }
}

function mainpage()
{
  window.location.href = "(0)Mainpage.html";
}
