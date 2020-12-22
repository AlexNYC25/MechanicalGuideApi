const serverCredentials = require("./serverCredentials.json")
const userName = serverCredentials.userName;
const password = serverCredentials.password;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://"+userName+":"+password+"@cluster0.vrici.mongodb.net/Mechanical_switches?retryWrites=true&w=majority";

//const uri = "mongodb+srv://MechanicalAdmin:Christmas5@cluster0.vrici.mongodb.net/Mechanical_switches?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true  });


async function run(){
    try {
        await client.connect();

       // const database = client.db("Mechanical_switches");
       const query = {  };
    const options = {
      
    };

        const collection = client.db("Mechanical_switches").collection("switches");

        const results = await collection.findOne(query, options);

        console.log(results);
    } finally {
        await client.close();
    }
}

run()

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
