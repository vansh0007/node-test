// const { MongoClient } = require("mongodb");
// const fs = require("fs").promises;

// const uri = "mongodb+srv://vanshbhatia9:V3h14BR72YsM00In@cluster.rc9gz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

// const client = new MongoClient(uri);
// //V3h14BR72YsM00In
// async function run() {
//   try {
//     // Connect to the MongoDB Atlas cluster
//     await client.connect();
//     const db = client.db("airbnb_data");
//     const col = db.collection("airbnb");

//     // Read the JSON file as a string
//     const data = await fs.readFile("./listingsAndReviews.json", "utf8");

//     // Fix the JSON data: Wrap multiple objects in an array
//     let fixedData = data;

//     // Try to wrap the data into a JSON array
//     try {
//       // If data is not an array, we assume it's a collection of JSON objects
//       if (!data.startsWith('[')) {
//         fixedData = `[${data.replace(/}\s*{/g, '},{')}]`;
//       }

//       // Parse the JSON data
//       const documents = JSON.parse(fixedData);

//       // Check if documents is an array and insert into MongoDB
//       if (Array.isArray(documents)) {
//         const result = await col.insertMany(documents);
//         console.log(`${result.insertedCount} documents were inserted.`);
//       } else {
//         console.log("Parsed data is not an array of documents.");
//       }

//     } catch (parseErr) {
//       console.error("Error parsing JSON data:", parseErr.message);
//     }

//   } catch (err) {
//     console.error("Error:", err.message);
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.dir);
