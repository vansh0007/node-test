const { MongoClient } = require('mongodb');

// Define the URI and create the MongoDB client
const uri = "mongodb+srv://vanshbhatia9:V3h14BR72YsM00In@cluster.onwa0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
const client = new MongoClient(uri);

// Export a function to connect to the database and return the connection
async function connectToDB() {
  try {
    await client.connect();
    const db = client.db('sample_mflix');
    const collection = db.collection('embedded_movies');
    return { db, collection };
  } catch (err) {
    console.error('Failed to connect to the database', err);
    throw err;
  }
}

module.exports = { connectToDB };
