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
const Actor = sequelize.define('aktorius', {
    vardas: DataTypes.STRING,
    pavarde: DataTypes.STRING,
    amzius: DataTypes.INTEGER,
    spec: DataTypes.STRING,
    kaskadininkas: DataTypes.INTEGER,
    pilietybe: DataTypes.STRING,
}, {
    timestamps: false,
  });
const Movie_Actor = sequelize.define('filmas_aktorius', {
    fk_Aktoriusid:{
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
      fk_Filmasid:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
}, {
    timestamps: false,
  });

  router.get('/movies/:id/actors', async (req, res) => {
    try {
      const movieId = req.params.id;
  
      //randami visi aktoriai susije su filmu
      const actorIds = await Movie_Actor.findAll({
        attributes: ['fk_Aktoriusid'],
        where: { fk_Filmasid: movieId },
      });
  
      if (!actorIds || actorIds.length === 0) {
        return res.status(404).json({ error: 'No actors found for the specified movie ID' });
      }
  
      // surenkami aktoriu id is aktoriu
      const actorIdsArray = actorIds.map((entry) => entry.fk_Aktoriusid);
  
      // aktoriai surandami is gautu id
      const actors = await Actor.findAll({
        where: { id: actorIdsArray },
      });

      const actor = actors.find(element => element.id > 0);
  
      res.json(actor);
    } catch (error) {
      console.error('Error fetching actor:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/movie_actors/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const actorsIds = await Movie_Actor.findAll({
          where: { fk_Filmasid: movieId },
        });
        res.json(actorsIds);
    } catch (error) {
        console.error('Error fetching actors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  router.get('/actors', async (req, res) => {
    try {
      
        const actors = await Actor.findAll();
        res.json(actors);
    } catch (error) {
        console.error('Error fetching actors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/actors', async (req, res) => {
  try {
      if (!req.body) {
          return res.status(400).json({ error: 'Request body is missing or empty' });
      }
      const newActor = await Actor.create({
          vardas: req.body.vardas,
          pavarde: req.body.pavarde,
          amzius: req.body.amzius,
          spec: req.body.spec,
          kaskadininkas: req.body.kaskadininkas,
          pilietybe: req.body.pilietybe,
      });
      res.status(201).json(newActor);
  } catch (error) {
      console.error('Error creating actor:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/movies_actors/:movieId/actors', async (req, res) => {
  try {
      const movieId = req.params.movieId;
      const actorIds = req.body.actorIds;
      console.log('AKTOR',actorIds);
      console.log('MOVIE',movieId);
      // Validate if the movieId and actorIds are provided in the request body
      if (!movieId || !actorIds || !Array.isArray(actorIds)) {
          return res.status(400).json({ error: 'Invalid request' });
      }
      
      // Associate each actor with the movie in the actor_movie table
      await Promise.all(actorIds.map(async (actorId) => {
          await Movie_Actor.create({
            fk_Aktoriusid: actorId,
            fk_Filmasid: parseInt(movieId, 10)
          });
      }));

      res.status(200).json({ message: 'Actors associated successfully' });
  } catch (error) {
      console.error('Error associating actors with movie:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.delete('/movie_actor/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    
    const movieactorToDelete = await Movie_Actor.findOne({
      where: {
          fk_Filmasid: movieId
      },
  });
    if (!movieactorToDelete) {
      return res.status(404).json({ error: 'movie actor association not found' });
    }
    await Movie_Actor.destroy({
      where: {
        fk_Filmasid: movieId,
      },
    });
    await movieactorToDelete.destroy();
    res.json({ message: 'movie actor association deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie actor association:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;