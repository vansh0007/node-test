const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://vanshbhatia999:UI83j7dNr2XtU1H1@cluster.rc9gz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

const client = new MongoClient(uri);

app.use(express.json());


app.use(async (req, res, next) => {
    try {
      await client.connect();
      req.db = client.db('airbnb_data');
      req.col = req.db.collection('airbnb');
      next();
    } catch (err) {
      next(err);
    }
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

 
  
  // Get a specific document by ID
  app.get('/api/airbnb', async (req, res) => {
    try {
      const id = req.query.id;
      
      if (!id) {
        return res.status(400).send('ID query parameter is required');
      }
      
      // Convert id to ObjectId
    //   let objectId;
    //   try {
    //     objectId = new ObjectId(id);
    //   } catch (err) {
    //     return res.status(400).send('Invalid ID format');
    //   }
  
      // Query the collection for the document with the given _id
      const document = await req.col.findOne({ _id: id });
  
      if (document) {
        res.json(document);
      } else {
        res.status(404).send('Document not found');
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = app;