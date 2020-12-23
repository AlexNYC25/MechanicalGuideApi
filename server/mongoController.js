const serverCredentials = require("./serverCredentials.json")
const userName = serverCredentials.userName;
const password = serverCredentials.password;
const MongoClient = require('mongodb').MongoClient;
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
		const results = await collection.findOne(query, options);
		dbResults = results;
		//return (results);

	} finally {
		await client.close();
		return dbResults
	}
}

//run()

/*
client.connect(err => {
  const collection = client.db("Mechanical_switches").collection("switches");
  // perform actions on the collection object
  console.log("Connected")

	let results = collection.find({}, {})
	//console.log(results);

  client.close();
});

*/


module.exports.getAllSwitches = getAllSwitches;