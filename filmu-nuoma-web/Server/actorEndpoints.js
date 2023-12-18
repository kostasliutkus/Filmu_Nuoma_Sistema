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
    fk_Aktoriusid: DataTypes.INTEGER,
    fk_Filmasid: DataTypes.INTEGER,
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

module.exports = router;