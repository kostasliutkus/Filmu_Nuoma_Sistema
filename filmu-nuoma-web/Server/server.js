const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('vezliukai', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

const User = sequelize.define('klientas', {
    vardas: DataTypes.STRING,
    pavarde: DataTypes.STRING,
    telefonas: DataTypes.STRING,
    el_pastas: DataTypes.STRING,
    slapyvardis: DataTypes.STRING,
    slaptazodis: DataTypes.STRING,
    sukurimo_data: DataTypes.STRING,
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

app.post('/api/register', async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});