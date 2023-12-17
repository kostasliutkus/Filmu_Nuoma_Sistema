const express = require('express');
const {DataTypes } = require('sequelize');
const router = express.Router();
const sequelize = require('./db');

const Director = sequelize.define('rezisierius', {
    vardas: DataTypes.STRING,
    pavarde: DataTypes.STRING,
    populiariausiasias_filmas: DataTypes.STRING,
    amzius: DataTypes.INTEGER,
    pirmo_filmo_data: DataTypes.DATE,
    filmu_kiekis: DataTypes.INTEGER,
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

//get all directors
router.get('/directors', async (req, res) => {
    try {
        const directors = await Director.findAll();
        res.json(directors);
    } catch (error) {
        console.error('Error fetching directors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get by id
router.get('/directors/:id', async (req, res) => {
    const dirId = req.params.id;
    try {
      const director = await Director.findByPk(dirId);
      if (!director) {
        return res.status(404).json({ error: 'Director not found' });
      }
      res.json(director);
    } catch (error) {
      console.error('Error fetching director:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
//create director
router.post('/directors', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing or empty' });
        }
        const newDirector = await Director.create({
            vardas: req.body.vardas,
            pavarde: req.body.pavarde,
            populiariausiasias_filmas: req.body.populiariausiasias_filmas,
            amzius: req.body.amzius,
            pirmo_filmo_data: req.body.pirmo_filmo_data,
            filmu_kiekis: req.body.filmu_kiekis,
        });
        res.status(201).json(newDirector);
    } catch (error) {
        console.error('Error creating director:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// update director
router.put('/directors/:id', async (req, res) => {
    const dirId = req.params.id;
    try {
      const directorToUpdate = await Director.findByPk(dirId);
      if (!directorToUpdate) {
        return res.status(404).json({ error: 'Director not found' });
      }
      //keiciami rezisieriaus parametrai
      directorToUpdate.vardas = req.body.vardas || directorToUpdate.vardas;
      directorToUpdate.pavarde = req.body.pavarde || directorToUpdate.pavarde;
      directorToUpdate.populiariausiasias_filmas = req.body.populiariausiasias_filmas || directorToUpdate.populiariausiasias_filmas;
      directorToUpdate.amzius = req.body.amzius || directorToUpdate.amzius;
      directorToUpdate.pirmo_filmo_data = req.body.pirmo_filmo_data || directorToUpdate.pirmo_filmo_data;
      directorToUpdate.filmu_kiekis = req.body.filmu_kiekis || directorToUpdate.filmu_kiekis;
  
      await directorToUpdate.save();
  
      res.json(directorToUpdate);
    } catch (error) {
      console.error('Error updating Director:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete director
router.delete('/directors/:id', async (req, res) => {
    const dirId = req.params.id;
    try {
      const directorToDelete = await Director.findByPk(dirId);
      if (!directorToDelete) {
        return res.status(404).json({ error: 'Director not found' });
      }
      await directorToDelete.destroy();
      res.json({ message: 'Director deleted successfully' });
    } catch (error) {
      console.error('Error deleting director:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;