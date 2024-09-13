const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const { connectToDB } = require('./connection');
const cors = require('cors');
const { ObjectId } = require('mongodb');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001' // Replace with the specific origin you want to allow
}));

// Middleware to connect to the MongoDB database for each request
app.use(async (req, res, next) => {
  try {
    const { db, collection } = await connectToDB();
    req.db = db;
    req.col = collection;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Get a specific document by ID
app.get('/api/movies', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  console.log(page, limit, skip);
  try {
    const movies = await req.col
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    res.json({ movies });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// // Fetch movies by name
// app.get('/api/movies/name', async (req, res) => {
//   try {
//     const { name } = req.query;
//     const movies = await req.db.collection('movies').find({ title: new RegExp(name, 'i') }).toArray();
//     res.json(movies);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// // Fetch movies by actor
// app.get('/api/movies/actor', async (req, res) => {
//   try {
//     const { actor } = req.query;
//     const movies = await req.db.collection('movies').find({ cast: actor }).toArray();
//     res.json(movies);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// // Fetch movies by year
// app.get('/api/movies/year', async (req, res) => {
//   try {
//     const { year } = req.query;
//     const movies = await req.db.collection('movies').find({ year: parseInt(year, 10) }).toArray();
//     res.json(movies);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// // Fetch movie by ID
// app.get('/api/movies/id', async (req, res) => {
//   try {
//     const { id } = req.query;
//     const movie = await req.db.collection('movies').findOne({ _id: new ObjectId(id) }).toArray();
//     if (movie) {
//       res.json(movie);
//     } else {
//       res.status(404).send('Movie not found');
//     }
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

// Start the server (only one call is needed)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
