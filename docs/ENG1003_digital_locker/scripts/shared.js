/**
 * shared.js
 * This file contains shared code that runs on both view.html and index.html
 */
// TODO: Write code to implement the LockerList class



// Constants used as KEYS for LocalStorage
const LOCKER_INDEX_KEY = "lockerIndex";
const LOCKER_DATA_KEY = "lockerData";

// TODO: Write code to implement the Locker class
/*
LOCKER CLASS
--Properties--
- id:String=""
- label:String=""
- pin:String=""
- color:String="3399ff"
- contents: String=""
- locked : Boolean=false;
--Getters--
- ALL
--Setters--
- ALL
--Methods--
-fromData(data)
* Convert data from localStorage
*/
class Locker {
	constructor(id="")
	{
		//validate input is string
		if (typeof id === "string")
		{
			this._id = id;
		}
		else {
			this._id = "";
		}

		this._label="";
		this._pin ="";
		this._color="3399ff";
		this._contents="";
		this._locked = false;
	}

	//Getters
	get id(){return this._id;}
	get label(){return this._label;}
	get pin(){return this._pin;}
	get color(){return this._color;}
	get contents(){return this._contents;}
	get locked(){return this._locked;}

	//Setters
	set id(newId)
	{
		if (typeof newId === "string")
		{
			this._id=newId;
		}
	}
	set label(newValue)
	{
		if (typeof newValue === "string")
		{
			this._label=newValue;
		}
	}
	set pin(newValue)
	{
		if (typeof newValue === "string")
		{
			this._pin=newValue;
		}
	}
	set color(newValue)
	{
		if (typeof newValue === "string")
		{
			this._color=newValue;
		}
	}
	set contents(newValue)
	{
		if (typeof newValue === "string")
		{
			this._contents=newValue;
		}
	}
	set locked(newValue)
	{
		if (typeof newValue === "boolean")
		{
			this._locked=newValue;
		}
	}

	//methods
	fromData(data){
		//Set attributes
		this._id = data._id;
		this._label = data._label;
		this._pin = data._pin;
		this._color = data._color;
		this._contents = data._contents;
		this._locked = data._locked;
	}
}
/*
//LockerList Class
--Properties--
- lockers:Array=[]
--Getters--
- lockers():Array
- count():Number
--Setters--
- NONE
--Methods--
- addLocker(id)
- getLocker(index):Locker
- removeLocker(index)*
- fromData(data)
*- From zero
*/
class LockerList{
	constructor(){
		this._lockers = [];
	}
	//Getters
	get lockers(){return this._lockers;}
	get count(){return this._lockers.length;}

	//Methods
	addLocker(){
		let charStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let id_char = Math.floor(this.count/10);
		let id = charStr[id_char] + (this.count+1).toString().substr(-1);
		//console.log((this._lockers.length-1));
		let newLocker = new Locker(id);
		this._lockers.push(newLocker);
	}
	getLocker(index){
		return this._lockers[index];
	}
	removeLocker(index){
		if (index > -1 && !isNaN(index) && index < this._lockers.length)
		{
				this._lockers.splice(index,1);
		}
	}
	fromData(data){
		//Stored data in array
		let localData = data._lockers;
		this._lockers = [];
		//console.log(localData);

		//Loop through array stored
		for (let i = 0; i < localData.length; i++)
		{
			//In each array is a class of locker
			let localLocker = new Locker();
			localLocker.fromData(localData[i]);
			this._lockers.push(localLocker);
			//console.log(localLocker instanceof Locker);
		}
		//console.log(this._lockers);
	}
}

// Global LockerList instance variable
let lockers = new LockerList();

/*
let charStr = "abcdefghijklmnopqrstuvwxyz";
let id_char = Math.floor(5/10);
let id = charStr[id_char] + (5-1).toString().substr(-1);
console.log(id);
*/
// TODO: Write the function checkIfDataExistsLocalStorage
/*
function checkIfDataExistsLocalStorage
let result = checkIfDataExistsLocalStorage(key)
--Inputs--
- key:String
--outputs--
- result:Boolean

-Checks if data stored in key LOCKER_DATA_KEY null, exists, null, undefined or blank
*/
function checkIfDataExistsLocalStorage(){
	//checks if data exists (if null) or undefined or blank string
	let retrievedData = localStorage.getItem(LOCKER_DATA_KEY);
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
	localStorage.setItem(LOCKER_DATA_KEY, data);
}

// TODO: Write the function getDataLocalStorage
/*
function getDataLocalStorage
let data = getDataLocalStorage()
--INPUT--
- NONE
--OUTPUT--
- data as class instance

-get data stored from LOCKER_DATA_KEY
*/

function getDataLocalStorage(){
	//Key is LOCKER_DATA_KEY
	//1. getItem retrieves data from key
	//2. Data is parsed to turn into object
	//Step 3 is outside function in next TO-DO
	//3. Data is turned into class instance of lockerList (Using global var)
	return JSON.parse(localStorage.getItem(LOCKER_DATA_KEY));
}


// TODO: Write the code that will run on load here

//console.log(checkIfDataExistsLocalStorage());
// Check if data exists
if (checkIfDataExistsLocalStorage()){
	let retrieved = getDataLocalStorage();
	lockers.fromData(retrieved);
	//For debugging
	//console.log(lockers instanceof LockerList);
	//console.log(lockers);
}

//console.log(checkIfDataExistsLocalStorage());
