const serverCredentials = require("./serverCredentials.json")
const userName = serverCredentials.userName;
const password = serverCredentials.password;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://"+userName+":"+password+"@cluster0.vrici.mongodb.net/Mechanical_switches?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });


async function run(){
	try {
		// wait for connection to be established
		await client.connect();

		// var holding query to execute
		const query = {  };
		// var holding query options 
		const options = {

		};

		// get collection object 
		const collection = client.db("Mechanical_switches").collection("switches");
		// query collection 
		const results = await collection.findOne(query, options);

		console.log(results);
	} finally {
		// close connection when finished
		await client.close();
	}
}

/*
  
*/
async function getAllSwitches(){
	let dbResults;
	try{
		// wait for connection to be established
		await client.connect();

		// var holding query to execute
		const query = {  };
		// var holding query options 
		const options = {

		};

		// get collection object 
		const collection = client.db("Mechanical_switches").collection("switches");
		// query collection 
		const results = await collection.find({}).toArray();
		dbResults = results;
		//return (results);

	} finally {
		await client.close();
		return dbResults
	}
}

async function getSwitchId(idVal){
	let dbResults;
	try{
		// wait for connection to be established
		await client.connect();

		let objId = new ObjectId(idVal);

		// var holding query to execute
		const query = { _id: objId };
		// var holding query options 
		const options = {

		};

		// get collection object 
		const collection = client.db("Mechanical_switches").collection("switches");
		// query collection 
		const results = await collection.findOne(query, options);
		dbResults = results;

	} finally {
		client.close();
		return dbResults;
	}
}

//run()



module.exports.getAllSwitches = getAllSwitches;
module.exports.getSwitchId = getSwitchId;