const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

//cia copy paste pagal savo endpoint.js faila
const movieEndpoints = require('./movieEndpoints');
const orderEndpoints = require('./orderEndpoints');
const directorEndpoints = require('./directorEndpoints');
const reviewEndpoints = require('./reviewEndpoints');
const actorEndpoints = require('./actorEndpoints');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());

//cia copy paste pagal savo endpoint.js faila
app.use('/api', movieEndpoints);
app.use('/api', orderEndpoints);
app.use('/api', directorEndpoints);
app.use('/api', reviewEndpoints);
app.use('/api', actorEndpoints);

const secretKey = 'F8D3C71E8EA4E1A2CBA663272DBBA';
const sequelize = require('./db');

const User = sequelize.define('klientas', {
    vardas: DataTypes.STRING,
    pavarde: DataTypes.STRING,
    telefonas: DataTypes.STRING,
    tipas: DataTypes.STRING,
    el_pastas: DataTypes.STRING,
    slapyvardis: DataTypes.STRING,
    slaptazodis: DataTypes.STRING,
    sukurimo_data: DataTypes.STRING,
    kreditas: DataTypes.INTEGER,
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

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username and password in the database
        const user = await User.findOne({
          where: {
            slapyvardis: username,
            slaptazodis: password,
          },
        });
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user.id, username: user.slapyvardis, role: user.tipas, }, secretKey, { expiresIn: '1h' });
        res.json({ token });
      } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

app.get('/api/user-profile', async (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authorizationHeader.split(' ')[1];
    
    // Verify the JWT token
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: 'Invalid token' });
        }
    
        const userId = decoded.userId;
    
        try {
        // Find the user in the database based on the ID from the token
        const user = await User.findByPk(userId);
    
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Return user profile data
        res.json({
            id: user.id,
            username: user.slapyvardis,
            name: user.vardas,
            lastName: user.pavarde,
            phoneNumber: user.telefonas,
            email: user.el_pastas,
            kreditas: user.kreditas,
        });
        } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });
    });

app.delete('/api/delete-profile', async (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = decoded.userId;

        try {
            // Find the user by ID and delete the profile
            const user = await User.findByPk(userId);
        
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
        
            await user.destroy();
        
            res.status(200).json({ message: 'Profile deleted successfully' });

        } catch (error) {
            console.error('Error deleting profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    });


app.put('/api/update-profile', (req, res) => {
    
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: 'Invalid token' });
        }

        const userId = decoded.userId;

        const updatedUserData = {
            vardas: req.body.name,
            pavarde: req.body.lastName,
            telefonas: req.body.phoneNumber,
            el_pastas: req.body.email,
            slapyvardis: req.body.username,
            kreditas: req.body.kreditas,
          };

        try {
            const user = await User.findByPk(userId);

            if (!user) {
            return res.status(404).json({ error: 'User not found' });
            }
            await user.update(updatedUserData);

            res.sendStatus(200);
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});