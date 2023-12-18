const express = require('express');
const {DataTypes } = require('sequelize');
const router = express.Router();
const sequelize = require('./db');
const Genre = sequelize.define('zanras', {
    name: DataTypes.STRING,
    id_Zanras: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
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
//get all genres
router.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
        console.log(res);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;