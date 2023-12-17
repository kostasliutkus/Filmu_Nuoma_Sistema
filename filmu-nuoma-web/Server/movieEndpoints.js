const express = require('express');
const {DataTypes } = require('sequelize');
const router = express.Router();
const sequelize = require('./db');
const Movie = sequelize.define('filmas', {
    pavadinimas: DataTypes.STRING,
    isleidimo_data: DataTypes.DATE,
    trukme: DataTypes.STRING,
    amziaus_cenzas: DataTypes.STRING,
    studija: DataTypes.STRING,
    kilmes_salis: DataTypes.STRING,
    Kalba: DataTypes.STRING,
    subtitrai: DataTypes.INTEGER,
    kaina: DataTypes.INTEGER,
    Zanras: DataTypes.INTEGER,
    fk_Rezisieriusid: DataTypes.INTEGER
}, {
    timestamps: false,
  });

sequelize.sync()
.then(() => {
console.log('Database and table synced');
})
.catch((error) => {
console.error('Error syncing database:', error);
});

//get all movies
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get by id
router.get('/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
      const movie = await Movie.findByPk(movieId);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.json(movie);
    } catch (error) {
      console.error('Error fetching movie:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/movie', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing or empty' });
        }
        const newMovie = await Movie.create({
            pavadinimas: req.body.pavadinimas,
            isleidimo_data: req.body.isleidimo_data,
            trukme: req.body.trukme,
            amziaus_cenzas: req.body.amziaus_cenzas,
            studija: req.body.studija,
            kilmes_salis: req.body.kilmes_salis,
            Kalba: req.body.Kalba,
            subtitrai: req.body.subtitrai,
            kaina: req.body.kaina,
            Zanras: req.body.Zanras,
            fk_Rezisieriusid: req.body.fk_Rezisieriusid
        });
        res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// update movie
router.put('/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
      const movieToUpdate = await Movie.findByPk(movieId);
      if (!movieToUpdate) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      //keiciami filmo parametrai
      movieToUpdate.pavadinimas = req.body.pavadinimas || movieToUpdate.pavadinimas;
      movieToUpdate.isleidimo_data = req.body.isleidimo_data || movieToUpdate.isleidimo_data;
      movieToUpdate.trukme = req.body.trukme || movieToUpdate.trukme;
      movieToUpdate.amziaus_cenzas = req.body.amziaus_cenzas || movieToUpdate.amziaus_cenzas;
      movieToUpdate.studija = req.body.studija || movieToUpdate.studija;
      movieToUpdate.kilmes_salis = req.body.kilmes_salis || movieToUpdate.kilmes_salis;
      movieToUpdate.Kalba = req.body.Kalba || movieToUpdate.Kalba;
      //mepakeicia subtitru ir kainos
      movieToUpdate.subtitrai = req.body.subtitrai || movieToUpdate.subtitrai;
      movieToUpdate.kaina = req.body.kaina || movieToUpdate.kaina;

      movieToUpdate.Zanras = req.body.Zanras || movieToUpdate.Zanras;
      movieToUpdate.fk_Rezisieriusid = req.body.fk_Rezisieriusid || movieToUpdate.fk_Rezisieriusid;
  
      await movieToUpdate.save();
  
      res.json(movieToUpdate);
    } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
// delete movie
router.delete('/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
      const movieToDelete = await Movie.findByPk(movieId);
      if (!movieToDelete) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      await movieToDelete.destroy();
      res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  module.exports = router;